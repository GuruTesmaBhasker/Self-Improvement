// Task Bank System
const taskBank = {
    skillBuilding: [
        // Existing
        "Learn one new concept in Python",
        "Complete one SQL query challenge", 
        "Study one new data analysis concept (Pandas / Excel)",
        "Build a small mini-project (even tiny progress)",
        "Watch a tutorial and take notes (not passive scrolling)",
        "Read documentation for 15 minutes",
        "Update your GitHub with today's progress",
        "Learn a new programming concept or framework",
        "Practice coding for 30 minutes",
        "Complete one online course module",
        "Learn a new tool or software feature",
        // New
        "Revise one Statistics concept (mean/median/variance/distributions).",
        "Practice one Python problem (syntax, loops, OOP, data analysis).",
        "Practice NumPy or Pandas for 20 minutes.",
        "Build a mini chart in Excel using sample data.",
        "Clean a dataset using Excel or Pandas.",
        "Write a small script in Python that solves a simple problem.",
        "Solve one SQL query (if applicable).",
        "Review your previous project code and improve formatting.",
        "Write a short comment explaining what a Python function does.",
        "Read documentation for 10 minutes (Pandas / Python official docs).",
        "Convert a Python logic into C language for syntactic clarity.",
        "Review one concept in DAX or Power Query (if applicable)."
    ],
    careerFuture: [
        // Existing
        "Update one section of your resume",
        "Research one job role you are interested in",
        "Check 5 job listings and note required skills",
        "Write one paragraph to shape your career goals",
        "Improve your LinkedIn profile",
        "Reach out and connect with one professional on LinkedIn",
        "Apply to one internship / job (even if you think you're not ready)",
        "Research a company you'd like to work for",
        "Update your portfolio with recent work",
        "Write a cover letter template",
        "Practice interview questions for 20 minutes",
        // New
        "Update your résumé (just one bullet).",
        "Improve one section of your portfolio project.",
        "Write one line for your LinkedIn bio that highlights skills.",
        "Apply to one internship or job (quality > quantity).",
        "Research the skills needed for your target role (Data Analyst / etc.).",
        "Add today’s progress to GitHub (even a tiny update).",
        "Save 3 job postings and list common required skills."
    ],
    selfImprovement: [
        // Existing
        "Write 3 things you learned today",
        "Journal: 'What direction feels right for me?'",
        "List one habit to stop",
        "Make a no-phone deep work session for 60 minutes",
        "Delete 10 unnecessary files / photos to reduce digital clutter",
        "Reflect on this week's achievements",
        "Write down 3 things you're grateful for",
        "Identify one limiting belief and challenge it",
        "Practice mindfulness for 10 minutes",
        "Set one boundary for better work-life balance",
        // New
        "Write down one bad habit to avoid today.",
        "Learn one new English word and use it.",
        "Talk to someone who is smarter than you or has ambition.",
        "Watch 1 video related to career or skill (not entertainment).",
        "Write a 30-second gratitude note to someone. "
    ],
    planningProductivity: [
        // Existing
        "Plan tomorrow's Top 3 tasks",
        "Review your progress this week (what improved?)",
        "Organize your notes (Notion / Google Docs)",
        "Break a big goal into 3 small steps",
        "Declutter workspace for 10 minutes",
        "Create a weekly schedule template",
        "Review and update your to-do system",
        "Organize your digital files and folders",
        "Clean up your email inbox",
        "Plan your learning goals for next week",
        // New
        "Plan Top 3 goals for today.",
        "Stay off social media for the first 30 minutes after waking.",
        "Read 10 pages of a book (non-fiction / career / business).",
        "Journal: “What did I learn today?”",
        "Practice deep work for 60 minutes with zero distractions.",
        "Ask yourself: “Is this urgent or important?”",
        "Clean workspace for 5 minutes (clarity = productivity).",
        "Track daily spending (rich → measure money).",
        "Set a weekly learning target.",
        "Reflect: “If I repeat today for 1 year, where will I be?”"
    ],
    knowledgeAwareness: [
        // Existing
        "Read 10 pages (career / business / tech content)",
        "Watch 1 meaningful podcast clip and write takeaway",
        "Learn a new concept from an online article",
        "Write a summary of what you learned today",
        "Research industry trends in your field",
        "Read about a successful person in your industry",
        "Learn about a new technology or tool",
        "Study a case study relevant to your goals",
        "Research a topic you're curious about",
        "Watch a TED talk and write key insights"
        // (No new for this category, as most are covered above)
    ],
    networking: [
        // Existing
        "Reach out and connect with one professional on LinkedIn",
        "Message a mentor or someone you admire",
        "Comment meaningfully on 3 professional posts",
        "Share one piece of valuable content on social media",
        "Send a thank-you message to someone who helped you",
        "Join one professional community or forum",
        "Attend one virtual networking event or webinar",
        "Reconnect with an old colleague or classmate",
        "Help someone else with advice or resources",
        "Introduce two people who should know each other"
        // (No new for this category, as most are covered above)
    ]
};

// Things to avoid suggestions
const avoidanceSuggestions = [
    "Mindless social media scrolling",
    "Procrastinating on important tasks",
    "Negative self-talk or limiting beliefs",
    "Skipping meals or proper breaks",
    "Staying up too late",
    "Checking phone first thing in the morning",
    "Multitasking during deep work",
    "Saying yes to everything",
    "Comparing myself to others online",
    "Making excuses instead of taking action",
    "Perfectionism that prevents starting",
    "Complaining without proposing solutions",
    "Consuming content without applying it",
    "Working without clear priorities",
    "Avoiding difficult conversations"
];

// Task category structure for balanced daily selection
const taskCategories = [
    { category: 'skillBuilding', label: 'Learn one skill' },
    { category: 'careerFuture', label: 'Apply or research one opportunity' },
    { category: 'selfImprovement', label: 'Reflect one improvement' },
    { category: 'planningProductivity', label: 'Organize or remove one thing' },
    { category: 'knowledgeAwareness', label: 'Create one output' },
    { category: 'networking', label: 'Reconnect or message one person' }
];

// Daily Motivator App - JavaScript Functionality
class DailyMotivator {
    constructor() {
        this.init();
        this.bindEvents();
        this.loadData();
        this.updateProgress();
    }

    init() {
        this.updateCurrentDate();
        this.showCurrentSection();
        this.generateDailyTasks();
        this.loadData(); // Load saved data
        this.updateCircularChart(); // Initialize the circular chart
    }

    updateCurrentDate() {
        const now = new Date();
        const options = { 
            weekday: 'long', 
            year: 'numeric', 
            month: 'long', 
            day: 'numeric' 
        };
        document.getElementById('currentDate').textContent = now.toLocaleDateString('en-US', options);
    }

    showCurrentSection() {
        const now = new Date();
        const hour = now.getHours();
        
        // Show morning section before 6 PM, evening section after
        if (hour < 18) {
            this.showMorningFocus();
        } else {
            this.showEveningFocus();
        }
    }

    showMorningFocus() {
        const morningSection = document.getElementById('morningSection');
        const eveningSection = document.getElementById('eveningSection');
        
        morningSection.style.order = '1';
        eveningSection.style.order = '2';
        morningSection.classList.add('fade-in');
    }

    showEveningFocus() {
        const morningSection = document.getElementById('morningSection');
        const eveningSection = document.getElementById('eveningSection');
        
        eveningSection.style.order = '1';
        morningSection.style.order = '2';
        eveningSection.classList.add('fade-in');
        
        // Load morning tasks into evening reflection
        this.loadTasksForReflection();
    }

    bindEvents() {
        document.getElementById('saveMorning').addEventListener('click', () => this.saveMorningPlan());
        document.getElementById('saveEvening').addEventListener('click', () => this.saveEveningReflection());
        document.getElementById('regenerateTasks').addEventListener('click', () => this.regenerateTasksForToday());
        
        // Sleep tracking events
        document.getElementById('saveSleepData').addEventListener('click', () => this.saveSleepData());
        document.getElementById('sleptAt').addEventListener('change', () => {
            this.calculateSleepDuration();
            this.autoSaveSleepData();
        });
        document.getElementById('wakeUpAt').addEventListener('change', () => {
            this.calculateSleepDuration();
            this.autoSaveSleepData();
        });
        
        // Date picker events
        document.getElementById('loadDateData').addEventListener('click', () => this.loadDataForDate());
        document.getElementById('datePicker').addEventListener('change', () => this.loadDataForDate());
        
        // Set today's date in the date picker
        const today = new Date().toISOString().split('T')[0];
        document.getElementById('datePicker').value = today;
        
        // Morning routine events
        document.getElementById('addRoutineEntry').addEventListener('click', () => this.addRoutineEntry());
        document.getElementById('saveMorningRoutine').addEventListener('click', () => this.saveMorningRoutine());
        
        // No routine checkboxes
        
        // Auto-save on input change
        const inputs = document.querySelectorAll('input[type="text"]');
        inputs.forEach(input => {
            input.addEventListener('input', () => this.autoSave());
            input.addEventListener('focus', (e) => this.animateInputFocus(e.target));
        });

        // Real-time circular chart updates for routine inputs
        const routineInputs = document.querySelectorAll('.routine-start, .routine-end, .routine-activity');
        routineInputs.forEach(input => {
            input.addEventListener('input', () => {
                clearTimeout(this.circularUpdateTimeout);
                this.circularUpdateTimeout = setTimeout(() => {
                    this.updateCircularChartRealTime();
                }, 300); // Update circular chart after 300ms of no typing
            });
        });

        // Initial update of circular chart with any existing values
        this.updateCircularChartRealTime();

        // Auto-save on checkbox/radio change
        const checkboxes = document.querySelectorAll('input[type="checkbox"], input[type="radio"]');
        checkboxes.forEach(checkbox => {
            checkbox.addEventListener('change', () => this.autoSave());
        });

        // Add click animation to buttons
        const buttons = document.querySelectorAll('.btn');
        buttons.forEach(button => {
            button.addEventListener('click', (e) => this.animateButtonClick(e.target));
        });
    }

    getTodayKey() {
        return new Date().toISOString().split('T')[0]; // YYYY-MM-DD format
    }

    saveMorningPlan() {
        const todayKey = this.getTodayKey();
        
        const morningData = {
            tasks: [
                document.getElementById('task1').value.trim(),
                document.getElementById('task2').value.trim(),
                document.getElementById('task3').value.trim()
            ],
            avoidance: document.getElementById('avoidance').value.trim(),
            timestamp: new Date().toISOString()
        };

        // Get existing data or create new
        let dailyData = JSON.parse(localStorage.getItem(todayKey)) || {};
        dailyData.morning = morningData;
        
        localStorage.setItem(todayKey, JSON.stringify(dailyData));
        this.showNotification('Morning plan saved! 🌅');
        
        // Update task labels for evening reflection
        this.loadTasksForReflection();
        this.updateEveningRoutineSummary();
    }

    saveEveningReflection() {
        const todayKey = this.getTodayKey();
        const eveningData = {
            tasksCompleted: [
                document.getElementById('task1Complete').checked,
                document.getElementById('task2Complete').checked,
                document.getElementById('task3Complete').checked
            ],
            stayedFocused: document.querySelector('input[name="focused"]:checked')?.value || null,
            improvement: document.getElementById('improvement').value.trim(),
            timestamp: new Date().toISOString()
        };

        // Get existing data or create new
        let dailyData = JSON.parse(localStorage.getItem(todayKey)) || {};
        dailyData.evening = eveningData;
        
        localStorage.setItem(todayKey, JSON.stringify(dailyData));
        this.showNotification('Evening reflection saved! 🌙');
        
        // Update progress
        this.updateProgress();
    }

    autoSave() {
        // Debounce auto-save
        clearTimeout(this.autoSaveTimeout);
        this.autoSaveTimeout = setTimeout(() => {
            const todayKey = this.getTodayKey();
            let dailyData = JSON.parse(localStorage.getItem(todayKey)) || {};
            
            // Save current state without notification
            const morningData = {
                tasks: [
                    document.getElementById('task1').value.trim(),
                    document.getElementById('task2').value.trim(),
                    document.getElementById('task3').value.trim()
                ],
                avoidance: document.getElementById('avoidance').value.trim(),
                timestamp: new Date().toISOString()
            };
            
            const eveningData = {
                tasksCompleted: [
                    document.getElementById('task1Complete').checked,
                    document.getElementById('task2Complete').checked,
                    document.getElementById('task3Complete').checked
                ],
                stayedFocused: document.querySelector('input[name="focused"]:checked')?.value || null,
                improvement: document.getElementById('improvement').value.trim(),
                timestamp: new Date().toISOString()
            };
            
            dailyData.morning = morningData;
            dailyData.evening = eveningData;
            
            localStorage.setItem(todayKey, JSON.stringify(dailyData));
            
            // Update routine progress
            this.updateRoutineProgress();
            this.updateEveningRoutineSummary();
        }, 1000);
    }

    updateCircularChartRealTime() {
        // Update circular chart based on current input values (without saving)
        const entries = document.querySelectorAll('.routine-entry');
        const currentActivities = [];
        
        entries.forEach(entry => {
            const start = entry.querySelector('.routine-start')?.value;
            const end = entry.querySelector('.routine-end')?.value;
            const activity = entry.querySelector('.routine-activity').value.trim();
            
            if (activity && start && end) {
                let duration = 0;
                try {
                    const sMin = this.timeToMinutes(start);
                    const eMin = this.timeToMinutes(end);
                    duration = Math.max(0, eMin - sMin);
                } catch (err) {
                    duration = 0;
                }
                currentActivities.push({ start, end, activity, duration });
            }
        });
        
        // Debug log
        console.log('Current activities for chart:', currentActivities);
        
        // Update circular chart with current activities
        this.generateCircularChart(currentActivities);
    }

    // Circular Chart Methods
    updateCircularChart() {
        const selectedDate = document.getElementById('datePicker')?.value;
        const dateKey = selectedDate || this.getTodayKey();
        const allData = this.getAllData();
        const todayActivities = allData[dateKey]?.morningRoutine || [];
        
        this.generateCircularChart(todayActivities);
    }

    loadData() {
        const todayKey = this.getTodayKey();
        const dailyData = JSON.parse(localStorage.getItem(todayKey));
        
        if (dailyData) {
            // Load morning data
            if (dailyData.morning) {
                const morning = dailyData.morning;
                document.getElementById('task1').value = morning.tasks[0] || '';
                document.getElementById('task2').value = morning.tasks[1] || '';
                document.getElementById('task3').value = morning.tasks[2] || '';
                document.getElementById('avoidance').value = morning.avoidance || '';
            }
            // Load evening data
            if (dailyData.evening) {
                const evening = dailyData.evening;
                document.getElementById('task1Complete').checked = evening.tasksCompleted[0] || false;
                document.getElementById('task2Complete').checked = evening.tasksCompleted[1] || false;
                document.getElementById('task3Complete').checked = evening.tasksCompleted[2] || false;
                if (evening.stayedFocused) {
                    document.querySelector(`input[name="focused"][value="${evening.stayedFocused}"]`).checked = true;
                }
                document.getElementById('improvement').value = evening.improvement || '';
            }
        }
        
        // Load sleep data from aggregated storage
        const allData = this.getAllData();
        if (allData[todayKey] && allData[todayKey].sleepData) {
            const sleepData = allData[todayKey].sleepData;
            document.getElementById('sleptAt').value = sleepData.sleptAt || '';
            document.getElementById('wakeUpAt').value = sleepData.wakeUpAt || '';
            this.calculateSleepDuration();
        }
        
        // Load morning routine data from aggregated storage
        if (allData[todayKey] && allData[todayKey].morningRoutine) {
            this.loadMorningRoutineEntries(allData[todayKey].morningRoutine);
        }
        
        this.loadTasksForReflection();
        this.updateCircularChart(); // Update circular chart when data is loaded
    }

    loadMorningRoutineEntries(routineData) {
        // Clear existing entries first
        const container = document.getElementById('routineEntries');
        container.innerHTML = '';
        
        // Add entries from saved data
        routineData.forEach((entry, index) => {
            const entryDiv = document.createElement('div');
            entryDiv.className = 'routine-entry';
            entryDiv.innerHTML = `
                <input type="time" class="routine-start" placeholder="Start" value="${entry.start || ''}">
                <input type="time" class="routine-end" placeholder="End" value="${entry.end || ''}">
                <input type="text" class="routine-activity" placeholder="What did you do? (e.g., Wake up, Exercise, Breakfast)" maxlength="100" value="${entry.activity || ''}">
                <button type="button" class="btn-remove-entry" onclick="removeRoutineEntry(this)">×</button>
            `;
            container.appendChild(entryDiv);
        });
        
        // Add one empty entry for new additions
        this.addRoutineEntry();
        
        // Set up event listeners for the loaded entries
        this.setupRoutineEventListeners();
    }

    setupRoutineEventListeners() {
        // Re-setup event listeners for real-time updates
        const routineInputs = document.querySelectorAll('.routine-start, .routine-end, .routine-activity');
        routineInputs.forEach(input => {
            // Remove existing listeners to avoid duplicates
            input.removeEventListener('input', this.circularUpdateHandler);
            
            // Add new listener
            this.circularUpdateHandler = () => {
                clearTimeout(this.circularUpdateTimeout);
                this.circularUpdateTimeout = setTimeout(() => {
                    this.updateCircularChartRealTime();
                }, 300);
            };
            input.addEventListener('input', this.circularUpdateHandler);
        });
    }

    loadDataForDate() {
        const selectedDate = document.getElementById('datePicker').value;
        if (!selectedDate) {
            this.showNotification('Please select a date!', 'error');
            return;
        }
        
        const dateKey = selectedDate;
        const allData = this.getAllData();
        const dateData = allData[dateKey];
        
        if (!dateData) {
            this.showNotification(`No data found for ${selectedDate}`, 'info');
            this.clearAllInputs();
            return;
        }
        
        // Load sleep data
        if (dateData.sleepData) {
            document.getElementById('sleptAt').value = dateData.sleepData.sleptAt || '';
            document.getElementById('wakeUpAt').value = dateData.sleepData.wakeUpAt || '';
            this.calculateSleepDuration();
        } else {
            document.getElementById('sleptAt').value = '';
            document.getElementById('wakeUpAt').value = '';
            document.getElementById('sleepDurationText').textContent = '--';
        }
        
        // Load morning routine data
        if (dateData.morningRoutine) {
            this.loadMorningRoutineEntries(dateData.morningRoutine);
        } else {
            // Clear routine entries
            const container = document.getElementById('routineEntries');
            container.innerHTML = '';
            this.addRoutineEntry();
            this.setupRoutineEventListeners();
        }
        
        // Update the circular chart
        this.updateCircularChart();
        
        this.showNotification(`Data loaded for ${selectedDate}! 📅`);
    }

    clearAllInputs() {
        // Clear sleep inputs
        document.getElementById('sleptAt').value = '';
        document.getElementById('wakeUpAt').value = '';
        document.getElementById('sleepDurationText').textContent = '--';
        
        // Clear routine entries
        const container = document.getElementById('routineEntries');
        container.innerHTML = '';
        this.addRoutineEntry();
        this.setupRoutineEventListeners();
        
        // Update circular chart
        this.generateCircularChart([]);
    }

    generateDailyTasks() {
        const todayKey = this.getTodayKey();
        const dailyData = JSON.parse(localStorage.getItem(todayKey));
        
        // Check if tasks are already generated for today
        if (dailyData && dailyData.generatedTasks) {
            this.populateTaskInputs(dailyData.generatedTasks);
            return;
        }
        
        // Generate new tasks for today
        const selectedTasks = this.selectRandomTasks();
        
        // Save generated tasks
        let updatedData = dailyData || {};
        updatedData.generatedTasks = selectedTasks;
        localStorage.setItem(todayKey, JSON.stringify(updatedData));
        
        // Populate the task inputs
        this.populateTaskInputs(selectedTasks);
        
        // Also generate avoidance suggestion
        this.generateAvoidanceSuggestion();
    }

    selectRandomTasks() {
        // Create a seed based on today's date for consistent randomness
        const today = new Date();
        const seed = today.getFullYear() * 10000 + (today.getMonth() + 1) * 100 + today.getDate();
        
        // Shuffle function with seed
        const seededRandom = (seed) => {
            const x = Math.sin(seed) * 10000;
            return x - Math.floor(x);
        };
        
        const selectedTasks = [];
        let currentSeed = seed;
        
        // Select 3 tasks from different categories for variety
        const shuffledCategories = [...taskCategories].sort(() => seededRandom(currentSeed++) - 0.5);
        
        for (let i = 0; i < 3; i++) {
            const category = shuffledCategories[i % shuffledCategories.length];
            const categoryTasks = taskBank[category.category];
            const randomIndex = Math.floor(seededRandom(currentSeed++) * categoryTasks.length);
            const selectedTask = categoryTasks[randomIndex];
            
            selectedTasks.push({
                task: selectedTask,
                category: category.label,
                emoji: this.getCategoryEmoji(category.category)
            });
        }
        
        return selectedTasks;
    }

    getCategoryEmoji(category) {
        const emojiMap = {
            skillBuilding: '🎓',
            careerFuture: '🚀',
            selfImprovement: '💭',
            planningProductivity: '📋',
            knowledgeAwareness: '📚',
            networking: '🤝'
        };
        return emojiMap[category] || '✨';
    }

    populateTaskInputs(tasks) {
        if (tasks && tasks.length >= 3) {
            document.getElementById('task1').placeholder = `1. ${tasks[0].emoji} ${tasks[0].task}`;
            document.getElementById('task2').placeholder = `2. ${tasks[1].emoji} ${tasks[1].task}`;
            document.getElementById('task3').placeholder = `3. ${tasks[2].emoji} ${tasks[2].task}`;
        }
    }

    regenerateTasksForToday() {
        // Generate new tasks regardless of what's saved
        const selectedTasks = this.selectRandomTasks();
        
        // Update storage
        const todayKey = this.getTodayKey();
        let dailyData = JSON.parse(localStorage.getItem(todayKey)) || {};
        dailyData.generatedTasks = selectedTasks;
        localStorage.setItem(todayKey, JSON.stringify(dailyData));
        
        // Update UI
        this.populateTaskInputs(selectedTasks);
        
        // Also update avoidance suggestion
        this.generateAvoidanceSuggestion();
        
        // Clear any existing task values
        document.getElementById('task1').value = '';
        document.getElementById('task2').value = '';
        document.getElementById('task3').value = '';
        
        // Show notification
        this.showNotification('🎲 New tasks generated! Fresh challenges await!');
    }

    generateAvoidanceSuggestion() {
        const todayKey = this.getTodayKey();
        const dailyData = JSON.parse(localStorage.getItem(todayKey));
        
        // Check if avoidance suggestion is already generated for today
        if (dailyData && dailyData.avoidanceSuggestion && document.getElementById('avoidance').value === '') {
            document.getElementById('avoidance').placeholder = dailyData.avoidanceSuggestion;
            return;
        }
        
        // Generate new avoidance suggestion
        const today = new Date();
        const seed = today.getFullYear() * 10000 + (today.getMonth() + 1) * 100 + today.getDate() + 999;
        const randomIndex = Math.floor((Math.sin(seed) * 10000 - Math.floor(Math.sin(seed) * 10000)) * avoidanceSuggestions.length);
        const suggestion = avoidanceSuggestions[randomIndex];
        
        // Save suggestion
        let updatedData = dailyData || {};
        updatedData.avoidanceSuggestion = suggestion;
        localStorage.setItem(todayKey, JSON.stringify(updatedData));
        
        // Update placeholder
        document.getElementById('avoidance').placeholder = suggestion;
    }

    loadTasksForReflection() {
        const todayKey = this.getTodayKey();
        const dailyData = JSON.parse(localStorage.getItem(todayKey));
        
        if (dailyData && dailyData.morning && dailyData.morning.tasks) {
            const tasks = dailyData.morning.tasks;
            document.getElementById('task1Label').textContent = tasks[0] || 'Task 1';
            document.getElementById('task2Label').textContent = tasks[1] || 'Task 2';
            document.getElementById('task3Label').textContent = tasks[2] || 'Task 3';
        }
    }

    updateProgress() {
        const allData = this.getAllStoredData();
        const totalDays = allData.length;
        if (totalDays === 0) {
            document.getElementById('totalDays').textContent = '0';
            document.getElementById('completionRate').textContent = '0%';
            document.getElementById('focusRate').textContent = '0%';
            return;
        }
        // Calculate completion rate
        let totalTasks = 0;
        let completedTasks = 0;
        let focusedDays = 0;
        let daysWithFocusData = 0;
        allData.forEach(dayData => {
            if (dayData.morning && dayData.morning.tasks) {
                dayData.morning.tasks.forEach(task => {
                    if (task.trim()) totalTasks++;
                });
            }
            if (dayData.evening) {
                if (dayData.evening.tasksCompleted) {
                    dayData.evening.tasksCompleted.forEach((completed, index) => {
                        if (dayData.morning && dayData.morning.tasks[index] && dayData.morning.tasks[index].trim()) {
                            if (completed) completedTasks++;
                        }
                    });
                }
                if (dayData.evening.stayedFocused !== null) {
                    daysWithFocusData++;
                    if (dayData.evening.stayedFocused === 'yes') {
                        focusedDays++;
                    }
                }
            }
        });
        const completionRate = totalTasks > 0 ? Math.round((completedTasks / totalTasks) * 100) : 0;
        const focusRate = daysWithFocusData > 0 ? Math.round((focusedDays / daysWithFocusData) * 100) : 0;
        document.getElementById('totalDays').textContent = totalDays;
        document.getElementById('completionRate').textContent = `${completionRate}%`;
        document.getElementById('focusRate').textContent = `${focusRate}%`;
    }

    // Routine logic removed

    // Animation methods
    animateCheckbox(checkbox) {
        const item = checkbox.closest('.routine-item');
        if (checkbox.checked) {
            item.style.animation = 'completedPulse 0.6s ease-out';
            this.createConfetti(item);
        } else {
            item.style.animation = 'none';
        }
        setTimeout(() => {
            item.style.animation = '';
        }, 600);
    }

    animateInputFocus(input) {
        input.style.animation = 'inputSlideIn 0.6s ease-out';
        setTimeout(() => {
            input.style.animation = '';
        }, 600);
    }

    animateButtonClick(button) {
        button.style.animation = 'buttonPress 0.2s ease-out';
        setTimeout(() => {
            button.style.animation = '';
        }, 200);
    }

    createConfetti(element) {
        const confetti = document.createElement('div');
        confetti.style.position = 'absolute';
        confetti.style.top = '50%';
        confetti.style.right = '20px';
        confetti.style.transform = 'translateY(-50%)';
        confetti.style.fontSize = '1.5rem';
        confetti.style.animation = 'sparkle 1s ease-out';
        confetti.textContent = '🎉';
        confetti.style.pointerEvents = 'none';
        confetti.style.zIndex = '10';
        
        element.style.position = 'relative';
        element.appendChild(confetti);
        
        setTimeout(() => {
            if (confetti.parentNode) {
                confetti.parentNode.removeChild(confetti);
            }
        }, 1000);
    }

    // Enhanced notification with emojis
    showNotification(message) {
        // Remove existing notifications
        const existingNotifications = document.querySelectorAll('.saved-notification');
        existingNotifications.forEach(notification => notification.remove());
        
        // Add emoji based on message type
        let emoji = '✅';
        if (message.includes('Morning')) emoji = '🌅';
        if (message.includes('Evening')) emoji = '🌙';
        
        // Create new notification
        const notification = document.createElement('div');
        notification.className = 'saved-notification';
        notification.textContent = `${emoji} ${message}`;
        
        // Add to the appropriate section
        const morningSection = document.getElementById('morningSection');
        const eveningSection = document.getElementById('eveningSection');
        const activeSection = message.includes('Morning') ? morningSection : eveningSection;
        
        if (activeSection) {
            activeSection.appendChild(notification);
            
            // Remove after 3 seconds
            setTimeout(() => {
                notification.remove();
            }, 3000);
        }
    }

    // Morning Routine Methods
    addRoutineEntry() {
        const container = document.getElementById('routineEntries');
        const newEntry = document.createElement('div');
        newEntry.className = 'routine-entry';
        newEntry.innerHTML = `
            <input type="time" class="routine-start" placeholder="Start">
            <input type="time" class="routine-end" placeholder="End">
            <input type="text" class="routine-activity" placeholder="What did you do? (e.g., Wake up, Exercise, Breakfast)" maxlength="100">
            <button type="button" class="btn-remove-entry" onclick="removeRoutineEntry(this)">×</button>
        `;
        container.appendChild(newEntry);
        
        // Add event listeners to new inputs
        const newInputs = newEntry.querySelectorAll('input');
        newInputs.forEach(input => {
            input.addEventListener('input', () => this.autoSave());
            input.addEventListener('focus', (e) => this.animateInputFocus(e.target));
            
            // Add real-time timeline update for routine inputs
            if (input.classList.contains('routine-start') || 
                input.classList.contains('routine-end') || 
                input.classList.contains('routine-activity')) {
                input.addEventListener('input', () => {
                    clearTimeout(this.timelineUpdateTimeout);
                    this.timelineUpdateTimeout = setTimeout(() => {
                        this.updateTimelineRealTime();
                    }, 300);
                });
            }
        });
    }

    saveMorningRoutine() {
        const entries = document.querySelectorAll('.routine-entry');
        const routineData = [];
        
        entries.forEach(entry => {
            const start = entry.querySelector('.routine-start')?.value;
            const end = entry.querySelector('.routine-end')?.value;
            const activity = entry.querySelector('.routine-activity').value.trim();

            // Only save if activity and at least one time is provided
            if (activity && (start || end)) {
                // If only one time provided, treat as instant (duration 0)
                const s = start || end;
                const e = end || start || start;
                let duration = 0;
                try {
                    const sMin = this.timeToMinutes(s);
                    const eMin = this.timeToMinutes(e);
                    duration = Math.max(0, eMin - sMin);
                } catch (err) {
                    duration = 0;
                }

                routineData.push({ start: s, end: e, activity, duration });
                console.log('Saved routine entry:', { start: s, end: e, activity, duration }); // Debug log
            }
        });
        
        if (routineData.length > 0) {
            const today = this.getTodayKey();
            const allData = this.getAllData();
            
            if (!allData[today]) {
                allData[today] = {};
            }
            
            allData[today].morningRoutine = routineData;
            localStorage.setItem('dailyMotivatorData', JSON.stringify(allData));
            
            console.log('Saved routine data for', today, ':', routineData); // Debug log
            console.log('Full allData after save:', allData); // Debug log
            
            this.showNotification('Morning routine saved! 🌅');
            this.updateRoutineAnalysis();
            this.updateTimeline(); // Update timeline in real-time
        } else {
            this.showNotification('Please add at least one activity with time!', 'error');
        }
    }

    // Sleep Tracking Methods
    calculateSleepDuration() {
        const sleptAt = document.getElementById('sleptAt').value;
        const wakeUpAt = document.getElementById('wakeUpAt').value;
        
        if (sleptAt && wakeUpAt) {
            const sleptTime = new Date(sleptAt);
            const wakeTime = new Date(wakeUpAt);
            
            // Calculate duration in milliseconds
            let duration = wakeTime - sleptTime;
            
            // If wake time is before sleep time, assume it's the next day
            if (duration < 0) {
                duration += 24 * 60 * 60 * 1000; // Add 24 hours
            }
            
            // Convert to hours and minutes
            const hours = Math.floor(duration / (1000 * 60 * 60));
            const minutes = Math.floor((duration % (1000 * 60 * 60)) / (1000 * 60));
            
            const durationText = `${hours}h ${minutes}m`;
            document.getElementById('sleepDurationText').textContent = durationText;
            
            // Color code based on sleep quality
            const durationElement = document.getElementById('sleepDuration');
            if (hours >= 7 && hours <= 9) {
                durationElement.style.background = 'rgba(0, 184, 148, 0.2)';
                durationElement.style.borderLeft = '4px solid #00b894';
            } else if (hours < 6 || hours > 10) {
                durationElement.style.background = 'rgba(231, 76, 60, 0.2)';
                durationElement.style.borderLeft = '4px solid #e74c3c';
            } else {
                durationElement.style.background = 'rgba(255, 193, 7, 0.2)';
                durationElement.style.borderLeft = '4px solid #ffc107';
            }
        } else {
            document.getElementById('sleepDurationText').textContent = '--';
            document.getElementById('sleepDuration').style.background = 'rgba(102, 126, 234, 0.1)';
            document.getElementById('sleepDuration').style.borderLeft = 'none';
        }
    }

    saveSleepData() {
        const sleptAt = document.getElementById('sleptAt').value;
        const wakeUpAt = document.getElementById('wakeUpAt').value;
        
        if (!sleptAt || !wakeUpAt) {
            this.showNotification('Please enter both sleep and wake up times!', 'error');
            return;
        }
        
        const today = this.getTodayKey();
        const allData = this.getAllData();
        
        if (!allData[today]) {
            allData[today] = {};
        }
        
        // Calculate duration
        const sleptTime = new Date(sleptAt);
        const wakeTime = new Date(wakeUpAt);
        let duration = wakeTime - sleptTime;
        if (duration < 0) {
            duration += 24 * 60 * 60 * 1000;
        }
        const hours = duration / (1000 * 60 * 60);
        
        allData[today].sleepData = {
            sleptAt,
            wakeUpAt,
            duration: hours,
            timestamp: new Date().toISOString()
        };
        
        localStorage.setItem('dailyMotivatorData', JSON.stringify(allData));
        this.showNotification('Sleep data saved! 😴');
        this.updateRoutineAnalysis();
    }

    autoSaveSleepData() {
        const sleptAt = document.getElementById('sleptAt').value;
        const wakeUpAt = document.getElementById('wakeUpAt').value;
        
        if (sleptAt && wakeUpAt) {
            // Use setTimeout to debounce auto-save
            clearTimeout(this.sleepSaveTimeout);
            this.sleepSaveTimeout = setTimeout(() => {
                this.saveSleepData();
            }, 1000);
        }
    }

    updateRoutineAnalysis() {
        const allData = this.getAllData();
        const routineData = [];

        // Collect all routine data from past days
        Object.values(allData).forEach(dayData => {
            if (dayData.morningRoutine) {
                routineData.push(...dayData.morningRoutine);
            }
        });
        
        if (routineData.length === 0) {
            return;
        }
        
        try {
            this.generateRoutineChart(routineData);
        } catch (error) {
            console.log('Chart generation failed:', error);
        }
        this.updateRoutineStats(routineData);
        this.generateInsights(routineData);
        this.updateCircularChart(); // Update circular chart
    }

    // Circular Chart Methods
    updateCircularChart() {
        const today = this.getTodayKey();
        const allData = this.getAllData();
        const todayActivities = allData[today]?.morningRoutine || [];
        
        this.generateCircularChart(todayActivities);
    }

    generateCircularChart(activities) {
        const canvas = document.getElementById('activityCircle');
        if (!canvas) return;
        
        const ctx = canvas.getContext('2d');
        const centerX = canvas.width / 2;
        const centerY = canvas.height / 2;
        const radius = 120;
        
        // Clear canvas
        ctx.clearRect(0, 0, canvas.width, canvas.height);
        
        if (activities.length === 0) {
            // Draw empty circle
            ctx.beginPath();
            ctx.arc(centerX, centerY, radius, 0, 2 * Math.PI);
            ctx.fillStyle = '#f0f0f0';
            ctx.fill();
            ctx.strokeStyle = '#ddd';
            ctx.lineWidth = 2;
            ctx.stroke();
            
            ctx.fillStyle = '#666';
            ctx.font = '16px Inter';
            ctx.textAlign = 'center';
            ctx.fillText('No activities', centerX, centerY);
            return;
        }
        
        // Calculate total duration
        const totalDuration = activities.reduce((sum, activity) => sum + (activity.duration || 0), 0);
        
        if (totalDuration === 0) return;
        
        // Color mapping
        const colors = {
            'good': '#00b894',
            'bad': '#e74c3c', 
            'neutral': '#74b9ff'
        };
        
        let currentAngle = -Math.PI / 2; // Start at top
        const segments = [];
        
        // Draw segments
        activities.forEach((activity, index) => {
            const duration = activity.duration || 0;
            const percentage = duration / totalDuration;
            const segmentAngle = percentage * 2 * Math.PI;
            const classification = this.classifyActivityGoodBad(activity.activity);
            const color = colors[classification] || colors.neutral;
            
            // Draw segment
            ctx.beginPath();
            ctx.moveTo(centerX, centerY);
            ctx.arc(centerX, centerY, radius, currentAngle, currentAngle + segmentAngle);
            ctx.closePath();
            ctx.fillStyle = color;
            ctx.fill();
            ctx.strokeStyle = 'white';
            ctx.lineWidth = 3;
            ctx.stroke();
            
            // Store segment info for click detection
            segments.push({
                activity,
                startAngle: currentAngle,
                endAngle: currentAngle + segmentAngle,
                color,
                classification
            });
            
            currentAngle += segmentAngle;
        });
        
        // Add click handler
        canvas.onclick = (event) => {
            const rect = canvas.getBoundingClientRect();
            const x = event.clientX - rect.left;
            const y = event.clientY - rect.top;
            
            const dx = x - centerX;
            const dy = y - centerY;
            const distance = Math.sqrt(dx * dx + dy * dy);
            
            if (distance <= radius) {
                let angle = Math.atan2(dy, dx) + Math.PI / 2;
                if (angle < 0) angle += 2 * Math.PI;
                
                const clickedSegment = segments.find(segment => 
                    angle >= segment.startAngle && angle <= segment.endAngle
                );
                
                if (clickedSegment) {
                    const activity = clickedSegment.activity;
                    const classificationText = clickedSegment.classification === 'good' ? 'Good Activity ✅' : 
                                             clickedSegment.classification === 'bad' ? 'Distraction ❌' : 
                                             'Neutral Activity ⚪';
                    
                    alert(`${activity.activity}\n${activity.start} - ${activity.end}\n${activity.duration} minutes\n${classificationText}`);
                }
            }
        };
        
        // Update legend
        this.updateCircleLegend(activities);
    }

    updateCircleLegend(activities) {
        const legend = document.getElementById('circleLegend');
        legend.innerHTML = '';
        
        const colors = {
            'good': '#00b894',
            'bad': '#e74c3c', 
            'neutral': '#74b9ff'
        };
        
        activities.forEach(activity => {
            const classification = this.classifyActivityGoodBad(activity.activity);
            const color = colors[classification] || colors.neutral;
            
            const legendItem = document.createElement('div');
            legendItem.className = 'legend-item';
            legendItem.innerHTML = `
                <div class="legend-color" style="background-color: ${color}"></div>
                <div class="legend-text">${activity.activity} (${activity.duration}m)</div>
            `;
            
            legendItem.addEventListener('click', () => {
                const classificationText = classification === 'good' ? 'Good Activity ✅' : 
                                         classification === 'bad' ? 'Distraction ❌' : 
                                         'Neutral Activity ⚪';
                
                alert(`${activity.activity}\n${activity.start} - ${activity.end}\n${activity.duration} minutes\n${classificationText}`);
            });
            
            legend.appendChild(legendItem);
        });
    }

    generateRoutineChart(routineData) {
        const ctx = document.getElementById('routineChart').getContext('2d');
        // Sum durations per category
        const activityDurations = {};
        routineData.forEach(entry => {
            const activity = entry.activity.toLowerCase();
            const key = this.categorizeActivity(activity);
            const dur = Number(entry.duration) || 0;
            activityDurations[key] = (activityDurations[key] || 0) + dur;
        });
        
        // Destroy existing chart if it exists
        if (this.routineChart) {
            this.routineChart.destroy();
        }
        
        this.routineChart = new Chart(ctx, {
            type: 'doughnut',
            data: {
                labels: Object.keys(activityDurations),
                datasets: [{
                    data: Object.values(activityDurations),
                    backgroundColor: [
                        '#667eea',
                        '#764ba2',
                        '#f093fb',
                        '#f5576c',
                        '#4facfe',
                        '#00f2fe',
                        '#74b9ff',
                        '#00b894'
                    ],
                    borderWidth: 2,
                    borderColor: '#fff'
                }]
            },
            options: {
                responsive: true,
                maintainAspectRatio: false,
                plugins: {
                    legend: {
                        position: 'bottom',
                        labels: {
                            padding: 20,
                            usePointStyle: true
                        }
                    },
                    title: {
                        display: true,
                        text: 'Morning Activities (minutes) by Category',
                        font: {
                            size: 16,
                            weight: 'bold'
                        }
                    }
                }
            }
        });
    }

    // Classify activity as 'good' or 'bad' based on keywords
    classifyActivityGoodBad(activity) {
        const a = activity.toLowerCase();
        const badKeywords = ['game', 'gaming', 'netflix', 'tiktok', 'youtube', 'social', 'reddit', 'scroll', 'binge', 'play', 'steam', 'instagram', 'snapchat'];
        const goodKeywords = ['study', 'learn', 'exercise', 'workout', 'read', 'meditate', 'journal', 'practice', 'walk', 'run', 'yoga', 'coding', 'code', 'breakfast', 'work', 'plan', 'prepare', 'sleep', 'wake', 'shower', 'brush'];

        if (badKeywords.some(k => a.includes(k))) return 'bad';
        if (goodKeywords.some(k => a.includes(k))) return 'good';
        return 'neutral';
    }

    categorizeActivity(activity) {
        const categories = {
            'Sleep/Wake': ['wake', 'sleep', 'bed', 'alarm'],
            'Exercise': ['exercise', 'workout', 'run', 'gym', 'yoga', 'walk', 'jog'],
            'Hygiene': ['shower', 'brush', 'bath', 'wash', 'hygiene', 'teeth'],
            'Food': ['breakfast', 'eat', 'coffee', 'tea', 'drink', 'meal'],
            'Learning': ['study', 'read', 'learn', 'book', 'course', 'practice'],
            'Work': ['work', 'office', 'meeting', 'email', 'task', 'project'],
            'Planning': ['plan', 'schedule', 'organize', 'prepare', 'goal'],
            'Other': []
        };
        
        for (const [category, keywords] of Object.entries(categories)) {
            if (keywords.some(keyword => activity.includes(keyword))) {
                return category;
            }
        }
        
        return 'Other';
    }

    updateRoutineStats(routineData) {
        // Calculate average wake time
        const wakeTimes = routineData.filter(entry => 
            entry.activity.toLowerCase().includes('wake') ||
            entry.activity.toLowerCase().includes('alarm')
        ).map(entry => entry.start || entry.end).filter(Boolean);
        
        if (wakeTimes.length > 0) {
            const avgWakeTime = this.calculateAverageTime(wakeTimes);
            document.getElementById('avgWakeTime').textContent = avgWakeTime;
        }
        
        // Calculate routine length (time from first start to last end)
        const allData = this.getAllData();
        const routineLengths = [];

        Object.values(allData).forEach(dayData => {
            if (dayData.morningRoutine && dayData.morningRoutine.length > 0) {
                const starts = dayData.morningRoutine.map(entry => entry.start).filter(Boolean).map(t => this.timeToMinutes(t));
                const ends = dayData.morningRoutine.map(entry => entry.end).filter(Boolean).map(t => this.timeToMinutes(t));
                if (starts.length && ends.length) {
                    const start = Math.min(...starts);
                    const end = Math.max(...ends);
                    routineLengths.push(end - start);
                }
            }
        });
        
        if (routineLengths.length > 0) {
            const avgLength = routineLengths.reduce((a, b) => a + b, 0) / routineLengths.length;
            document.getElementById('routineLength').textContent = Math.round(avgLength) + ' min';
        }
        
        // Most common activity
        const activityCounts = {};
        routineData.forEach(entry => {
            const key = this.categorizeActivity(entry.activity.toLowerCase());
            activityCounts[key] = (activityCounts[key] || 0) + 1;
        });
        
        const mostCommon = Object.keys(activityCounts).reduce((a, b) => 
            activityCounts[a] > activityCounts[b] ? a : b
        );
        
        document.getElementById('mostCommonActivity').textContent = mostCommon;
    }

    generateInsights(routineData) {
        const insights = [];
        const allData = this.getAllData();
        const daysTracked = Object.keys(allData).filter(key => allData[key].morningRoutine).length;

        console.log('Generating insights with routine data:', routineData); // Debug log
        console.log('Days tracked:', daysTracked); // Debug log

        insights.push(`You've tracked ${daysTracked} days of morning routines!`);

        // Wake time consistency (use start times)
        const wakeTimes = routineData.filter(entry =>
            entry.activity.toLowerCase().includes('wake')
        ).map(entry => entry.start).filter(Boolean).map(t => this.timeToMinutes(t));

        if (wakeTimes.length > 1) {
            const variance = this.calculateVariance(wakeTimes);
            if (variance < 30) {
                insights.push('🎯 Great consistency with wake times!');
            } else {
                insights.push('⏰ Try to wake up at a more consistent time.');
            }
        }

        // Duration patterns and good/bad analysis
        let totalGood = 0, totalBad = 0, totalNeutral = 0;
        const activityDurationMap = {};

        routineData.forEach(entry => {
            const dur = Number(entry.duration) || 0;
            const act = entry.activity;
            const cat = this.categorizeActivity(act.toLowerCase());
            activityDurationMap[act] = (activityDurationMap[act] || 0) + dur;

            const cls = this.classifyActivityGoodBad(act);
            console.log(`Activity: ${act}, Duration: ${dur}, Category: ${cat}, Classification: ${cls}`); // Debug log
            if (cls === 'good') totalGood += dur;
            else if (cls === 'bad') totalBad += dur;
            else totalNeutral += dur;
        });

        const totalTrackedMinutes = totalGood + totalBad + totalNeutral || 1;
        const goodPct = Math.round((totalGood / totalTrackedMinutes) * 100);
        const badPct = Math.round((totalBad / totalTrackedMinutes) * 100);

        insights.push(`� Good activities: ${goodPct}% of tracked time (${totalGood} min)`);
        insights.push(`👎 Distracting activities: ${badPct}% of tracked time (${totalBad} min)`);

        // Top 3 activities by time
        const topActivities = Object.entries(activityDurationMap).sort((a, b) => b[1] - a[1]).slice(0, 3);
        if (topActivities.length) {
            insights.push('� Top activities by time:');
            topActivities.forEach(([act, mins]) => {
                insights.push(`- ${act} — ${mins} min`);
            });
        }

        // Sleep Analysis
        const sleepData = Object.values(allData).filter(day => day.sleepData).map(day => day.sleepData);
        if (sleepData.length > 0) {
            const avgSleep = sleepData.reduce((sum, sleep) => sum + sleep.duration, 0) / sleepData.length;
            const avgHours = Math.floor(avgSleep);
            const avgMins = Math.round((avgSleep - avgHours) * 60);
            
            insights.push(`😴 Average sleep: ${avgHours}h ${avgMins}m (${sleepData.length} days tracked)`);
            
            if (avgSleep >= 7 && avgSleep <= 9) {
                insights.push('✅ Great sleep schedule! Keep it up!');
            } else if (avgSleep < 7) {
                insights.push('⚠️ You might need more sleep for better health');
            } else {
                insights.push('🛌 You might be sleeping too much - try waking up earlier');
            }
            
            // Sleep consistency
            if (sleepData.length > 1) {
                const sleepVariance = this.calculateVariance(sleepData.map(s => s.duration));
                if (sleepVariance < 0.5) {
                    insights.push('🎯 Very consistent sleep schedule!');
                } else if (sleepVariance > 2) {
                    insights.push('📊 Try to maintain more consistent sleep hours');
                }
            }
        }

        // Show all activities tracked today
        const today = this.getTodayKey();
        const todayActivities = allData[today]?.morningRoutine || [];
        if (todayActivities.length > 0) {
            insights.push('📝 Today\'s activities:');
            todayActivities.forEach(entry => {
                const startTime = entry.start || 'N/A';
                const endTime = entry.end || 'N/A';
                const duration = entry.duration || 0;
                const classification = this.classifyActivityGoodBad(entry.activity);
                const emoji = classification === 'good' ? '✅' : classification === 'bad' ? '❌' : '⚪';
                insights.push(`- ${emoji} ${entry.activity} (${startTime} - ${endTime}, ${duration}min)`);
            });
        }

        // Update insights display
        const insightsList = document.getElementById('insightsList');
        insightsList.innerHTML = insights.map(insight => `<li>${insight}</li>`).join('');
    }

    calculateAverageTime(times) {
        const minutes = times.map(time => this.timeToMinutes(time));
        const avgMinutes = minutes.reduce((a, b) => a + b, 0) / minutes.length;
        return this.minutesToTime(Math.round(avgMinutes));
    }

    timeToMinutes(time) {
        const [hours, minutes] = time.split(':').map(Number);
        return hours * 60 + minutes;
    }

    minutesToTime(minutes) {
        const hours = Math.floor(minutes / 60);
        const mins = minutes % 60;
        return `${hours.toString().padStart(2, '0')}:${mins.toString().padStart(2, '0')}`;
    }

    calculateVariance(numbers) {
        const mean = numbers.reduce((a, b) => a + b, 0) / numbers.length;
        const squaredDiffs = numbers.map(x => Math.pow(x - mean, 2));
        return squaredDiffs.reduce((a, b) => a + b, 0) / numbers.length;
    }

    getAllStoredData() {
        const allData = [];
        for (let i = 0; i < localStorage.length; i++) {
            const key = localStorage.key(i);
            if (key && key.match(/^\d{4}-\d{2}-\d{2}$/)) { // Date format check
                try {
                    const data = JSON.parse(localStorage.getItem(key));
                    if (data && (data.morning || data.evening)) {
                        allData.push(data);
                    }
                } catch (e) {
                    console.warn(`Invalid data for key ${key}:`, e);
                }
            }
        }
        return allData;
    }

    // Return an object keyed by date containing all stored data from both
    // per-day keys (YYYY-MM-DD) and the legacy/aggregate 'dailyMotivatorData' key.
    getAllData() {
        const combined = {};

        // 1) Per-day keys
        for (let i = 0; i < localStorage.length; i++) {
            const key = localStorage.key(i);
            if (key && key.match(/^\d{4}-\d{2}-\d{2}$/)) {
                try {
                    const data = JSON.parse(localStorage.getItem(key));
                    if (data) combined[key] = data;
                } catch (e) {
                    // ignore invalid
                }
            }
        }

        // 2) Legacy aggregated storage (used by saveMorningRoutine)
        try {
            const agg = JSON.parse(localStorage.getItem('dailyMotivatorData')) || {};
            Object.keys(agg).forEach(k => {
                combined[k] = Object.assign({}, combined[k] || {}, agg[k]);
            });
        } catch (e) {
            // ignore
        }

        return combined;
    }

    // Utility method to clear all data (for testing purposes)
    clearAllData() {
        if (confirm('Are you sure you want to clear all your data? This cannot be undone.')) {
            const keys = [];
            for (let i = 0; i < localStorage.length; i++) {
                const key = localStorage.key(i);
                if (key && key.match(/^\d{4}-\d{2}-\d{2}$/)) {
                    keys.push(key);
                }
            }
            keys.forEach(key => localStorage.removeItem(key));
            location.reload();
        }
    }
}

// Initialize the app when DOM is loaded
document.addEventListener('DOMContentLoaded', () => {
    window.dailyMotivator = new DailyMotivator();
});

// Add keyboard shortcuts
document.addEventListener('keydown', (e) => {
    // Ctrl/Cmd + S to save
    if ((e.ctrlKey || e.metaKey) && e.key === 's') {
        e.preventDefault();
        const hour = new Date().getHours();
        if (hour < 18) {
            window.dailyMotivator.saveMorningPlan();
        } else {
            window.dailyMotivator.saveEveningReflection();
        }
    }
});

// Global function for removing routine entries
function removeRoutineEntry(button) {
    const entry = button.closest('.routine-entry');
    const container = document.getElementById('routineEntries');
    
    // Keep at least one entry
    if (container.children.length > 1) {
        entry.remove();
    }
}

// Initialize the app
document.addEventListener('DOMContentLoaded', () => {
    window.dailyMotivator = new DailyMotivator();
    
    // Load existing routine data if available
    const today = window.dailyMotivator.getTodayKey();
    const allData = window.dailyMotivator.getAllData();
    
    if (allData[today] && allData[today].morningRoutine) {
        const container = document.getElementById('routineEntries');
        container.innerHTML = ''; // Clear default entry
        
        allData[today].morningRoutine.forEach(entry => {
            const newEntry = document.createElement('div');
            newEntry.className = 'routine-entry';
            newEntry.innerHTML = `
                <input type="time" class="routine-start" value="${entry.start || ''}">
                <input type="time" class="routine-end" value="${entry.end || ''}">
                <input type="text" class="routine-activity" value="${entry.activity}" maxlength="100">
                <button type="button" class="btn-remove-entry" onclick="removeRoutineEntry(this)">×</button>
            `;
            container.appendChild(newEntry);
            // Attach listeners so edits auto-save and animate
            const newInputs = newEntry.querySelectorAll('input');
            newInputs.forEach(input => {
                input.addEventListener('input', () => window.dailyMotivator.autoSave());
                input.addEventListener('focus', (e) => window.dailyMotivator.animateInputFocus(e.target));
            });
        });
    }
    
    // Update routine analysis on load
    window.dailyMotivator.updateRoutineAnalysis();
});

// Add some motivational quotes that change daily
const motivationalQuotes = [
    "The only way to do great work is to love what you do. - Steve Jobs",
    "Success is not final, failure is not fatal: it is the courage to continue that counts. - Winston Churchill",
    "The future belongs to those who believe in the beauty of their dreams. - Eleanor Roosevelt",
    "It is during our darkest moments that we must focus to see the light. - Aristotle",
    "The only impossible journey is the one you never begin. - Tony Robbins",
    "In the middle of difficulty lies opportunity. - Albert Einstein",
    "Believe you can and you're halfway there. - Theodore Roosevelt"
];

// Add quote to footer on load with typing effect
document.addEventListener('DOMContentLoaded', () => {
    const quoteIndex = new Date().getDate() % motivationalQuotes.length;
    const footerP = document.querySelector('footer p');
    const quote = motivationalQuotes[quoteIndex];
    
    // Clear footer and add typing effect
    footerP.innerHTML = '';
    let i = 0;
    const typeWriter = () => {
        if (i < quote.length) {
            footerP.innerHTML += quote.charAt(i);
            i++;
            setTimeout(typeWriter, 50);
        } else {
            footerP.innerHTML += ' 💪';
        }
    };
    
    setTimeout(typeWriter, 2000); // Start typing after 2 seconds
});