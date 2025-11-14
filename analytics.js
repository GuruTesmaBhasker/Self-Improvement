// analytics.js - Custom analytics for productivity tracking
import { db, todayId, getDay } from "./database.js";

// ---- Helper Functions ----

// Get sleep data for the last 7 days
async function getLast7DaysSleepData() {
  const results = [];
  const today = new Date();
  
  for (let i = 6; i >= 0; i--) {
    const d = new Date();
    d.setDate(today.getDate() - i);
    const key = todayId(d);
    
    try {
      const dayData = await getDay(key);
      const sleepMinutes = dayData?.sleep?.minutes || 0;
      const sleepHours = sleepMinutes > 0 ? (sleepMinutes / 60).toFixed(1) : 0;
      
      results.push({
        date: key,
        minutes: sleepMinutes,
        hours: parseFloat(sleepHours),
        label: d.toLocaleDateString('en-US', { weekday: 'short', month: 'short', day: 'numeric' })
      });
    } catch (error) {
      console.error(`Error fetching sleep data for ${key}:`, error);
      results.push({
        date: key,
        minutes: 0,
        hours: 0,
        label: d.toLocaleDateString('en-US', { weekday: 'short', month: 'short', day: 'numeric' })
      });
    }
  }
  
  return results;
}

// Get today's productivity breakdown
async function getTodayProductivityBreakdown() {
  try {
    const todayData = await getDay();
    if (!todayData || !todayData.activities) {
      return { productive: 0, neutral: 0, waste: 0 };
    }
    
    const totals = { productive: 0, neutral: 0, waste: 0 };
    
    todayData.activities.forEach(activity => {
      const minutes = activity.minutes || 0;
      const category = (activity.category || "neutral").toLowerCase();
      
      if (category === "productive") totals.productive += minutes;
      else if (category === "waste") totals.waste += minutes;
      else totals.neutral += minutes;
    });
    
    return totals;
  } catch (error) {
    console.error("Error fetching today's productivity data:", error);
    return { productive: 0, neutral: 0, waste: 0 };
  }
}

// Get last 7 days productivity trends
async function getLast7DaysProductivityTrends() {
  const results = [];
  const today = new Date();
  
  for (let i = 6; i >= 0; i--) {
    const d = new Date();
    d.setDate(today.getDate() - i);
    const key = todayId(d);
    
    try {
      const dayData = await getDay(key);
      let totals = { productive: 0, neutral: 0, waste: 0 };
      
      if (dayData && dayData.activities) {
        dayData.activities.forEach(activity => {
          const minutes = activity.minutes || 0;
          const category = (activity.category || "neutral").toLowerCase();
          
          if (category === "productive") totals.productive += minutes;
          else if (category === "waste") totals.waste += minutes;
          else totals.neutral += minutes;
        });
      }
      
      results.push({
        date: key,
        label: d.toLocaleDateString('en-US', { weekday: 'short', month: 'short', day: 'numeric' }),
        ...totals
      });
    } catch (error) {
      console.error(`Error fetching productivity data for ${key}:`, error);
      results.push({
        date: key,
        label: d.toLocaleDateString('en-US', { weekday: 'short', month: 'short', day: 'numeric' }),
        productive: 0,
        neutral: 0,
        waste: 0
      });
    }
  }
  
  return results;
}

// ---- Chart Variables ----
let sleepBarChart = null;
let dailyProductivityChart = null;
let productivityTrendsChart = null;
let todayActivityChart = null;

// ---- Main Render Function ----
export async function renderAnalytics() {
  console.log("🎯 Starting custom analytics render...");
  
  try {
    // Wait for DOM to be ready
    if (document.readyState !== 'complete') {
      await new Promise(resolve => setTimeout(resolve, 500));
    }
    
    // Render all charts
    await renderSleepBarChart();
    await renderDailyProductivityChart();
    await renderProductivityTrendsChart();
    await renderTodayActivityChart();
    
    console.log("✅ All analytics charts rendered successfully!");
    
  } catch (error) {
    console.error("💥 Analytics render error:", error);
  }
}

// ---- Individual Chart Renderers ----

// 1. Sleep Bar Chart for Last 7 Days
async function renderSleepBarChart() {
  const sleepData = await getLast7DaysSleepData();
  const canvas = document.getElementById("sleepBarChart");
  
  if (!canvas) {
    console.warn("Sleep bar chart canvas not found");
    return;
  }
  
  if (sleepBarChart) {
    sleepBarChart.destroy();
  }
  
  const ctx = canvas.getContext("2d");
  sleepBarChart = new Chart(ctx, {
    type: "bar",
    data: {
      labels: sleepData.map(d => d.label),
      datasets: [{
        label: "Sleep Hours",
        data: sleepData.map(d => d.hours),
        backgroundColor: "rgba(33, 150, 243, 0.7)",
        borderColor: "#2196f3",
        borderWidth: 2,
        borderRadius: 8,
      }]
    },
    options: {
      responsive: true,
      maintainAspectRatio: false,
      plugins: {
        legend: {
          labels: { color: "#cccccc" }
        },
        tooltip: {
          callbacks: {
            label: (ctx) => `${ctx.formattedValue} hours`
          }
        }
      },
      scales: {
        y: {
          beginAtZero: true,
          title: { display: true, text: "Hours", color: "#cccccc" },
          ticks: { color: "#888" },
          grid: { color: "rgba(255, 255, 255, 0.1)" }
        },
        x: {
          ticks: { color: "#888" },
          grid: { color: "rgba(255, 255, 255, 0.1)" }
        }
      }
    }
  });
}

// 2. Today's Activity Breakdown (Pie Chart)
async function renderTodayActivityChart() {
  const todayData = await getTodayProductivityBreakdown();
  const canvas = document.getElementById("activityCircle");
  
  if (!canvas) {
    console.warn("Today activity chart canvas not found");
    return;
  }
  
  if (todayActivityChart) {
    todayActivityChart.destroy();
  }
  
  const ctx = canvas.getContext("2d");
  todayActivityChart = new Chart(ctx, {
    type: "doughnut",
    data: {
      labels: ["Productive", "Neutral", "Waste"],
      datasets: [{
        data: [todayData.productive, todayData.neutral, todayData.waste],
        backgroundColor: ["#4caf50", "#9e9e9e", "#f44336"],
        borderColor: "#1a1a1a",
        borderWidth: 3
      }]
    },
    options: {
      responsive: true,
      maintainAspectRatio: false,
      plugins: {
        legend: {
          position: "bottom",
          labels: { color: "#cccccc" }
        },
        tooltip: {
          callbacks: {
            label: (ctx) => {
              const mins = ctx.raw || 0;
              const hours = (mins / 60).toFixed(1);
              return `${ctx.label}: ${mins}min (${hours}h)`;
            }
          }
        }
      }
    }
  });
}

// 3. Daily Productivity Chart (Today's detailed breakdown)
async function renderDailyProductivityChart() {
  const todayData = await getTodayProductivityBreakdown();
  const canvas = document.getElementById("dailyProductivityChart");
  
  if (!canvas) {
    console.warn("Daily productivity chart canvas not found");
    return;
  }
  
  if (dailyProductivityChart) {
    dailyProductivityChart.destroy();
  }
  
  const total = todayData.productive + todayData.neutral + todayData.waste;
  const productivePercent = total > 0 ? ((todayData.productive / total) * 100).toFixed(1) : 0;
  const neutralPercent = total > 0 ? ((todayData.neutral / total) * 100).toFixed(1) : 0;
  const wastePercent = total > 0 ? ((todayData.waste / total) * 100).toFixed(1) : 0;
  
  const ctx = canvas.getContext("2d");
  dailyProductivityChart = new Chart(ctx, {
    type: "pie",
    data: {
      labels: [
        `Productive (${productivePercent}%)`,
        `Neutral (${neutralPercent}%)`,
        `Waste (${wastePercent}%)`
      ],
      datasets: [{
        data: [todayData.productive, todayData.neutral, todayData.waste],
        backgroundColor: ["#4caf50", "#9e9e9e", "#f44336"],
        borderColor: "#1a1a1a",
        borderWidth: 2
      }]
    },
    options: {
      responsive: true,
      maintainAspectRatio: false,
      plugins: {
        legend: {
          position: "bottom",
          labels: { color: "#cccccc" }
        },
        tooltip: {
          callbacks: {
            label: (ctx) => {
              const mins = ctx.raw || 0;
              const hours = (mins / 60).toFixed(1);
              return `${mins}min (${hours}h)`;
            }
          }
        }
      }
    }
  });
}

// 4. 7-Day Productivity Trends (Stacked Bar Chart)
async function renderProductivityTrendsChart() {
  const trendsData = await getLast7DaysProductivityTrends();
  const canvas = document.getElementById("productivityTrendsChart");
  
  if (!canvas) {
    console.warn("Productivity trends chart canvas not found");
    return;
  }
  
  if (productivityTrendsChart) {
    productivityTrendsChart.destroy();
  }
  
  const ctx = canvas.getContext("2d");
  productivityTrendsChart = new Chart(ctx, {
    type: "bar",
    data: {
      labels: trendsData.map(d => d.label),
      datasets: [
        {
          label: "Productive",
          data: trendsData.map(d => d.productive),
          backgroundColor: "#4caf50",
          stack: "stack1"
        },
        {
          label: "Neutral",
          data: trendsData.map(d => d.neutral),
          backgroundColor: "#9e9e9e",
          stack: "stack1"
        },
        {
          label: "Waste",
          data: trendsData.map(d => d.waste),
          backgroundColor: "#f44336",
          stack: "stack1"
        }
      ]
    },
    options: {
      responsive: true,
      maintainAspectRatio: false,
      plugins: {
        legend: {
          position: "top",
          labels: { color: "#cccccc" }
        },
        tooltip: {
          callbacks: {
            label: (ctx) => `${ctx.dataset.label}: ${ctx.formattedValue}min`
          }
        }
      },
      scales: {
        x: {
          stacked: true,
          ticks: { color: "#888" },
          grid: { color: "rgba(255, 255, 255, 0.1)" }
        },
        y: {
          stacked: true,
          title: { display: true, text: "Minutes", color: "#cccccc" },
          ticks: { color: "#888" },
          grid: { color: "rgba(255, 255, 255, 0.1)" }
        }
      }
    }
  });
}