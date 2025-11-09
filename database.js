// database.js  (type="module")
import { initializeApp } from "https://www.gstatic.com/firebasejs/10.7.2/firebase-app.js";
import {
  getAuth, onAuthStateChanged, // you use email/password auth
} from "https://www.gstatic.com/firebasejs/10.7.2/firebase-auth.js";
import {
  getFirestore, doc, setDoc, getDoc, addDoc, collection,
  updateDoc, serverTimestamp, Timestamp
} from "https://www.gstatic.com/firebasejs/10.7.2/firebase-firestore.js";

/* 🔧 Your Firebase config */
const firebaseConfig = {
  apiKey: "AIzaSyCYyTIYCX5bvN7r0BcJvLOKEON1nUaFnQk",
  authDomain: "self-improvement-7c7f6.firebaseapp.com",
  projectId: "self-improvement-7c7f6",
  storageBucket: "self-improvement-7c7f6.firebasestorage.app",
  messagingSenderId: "494829137683",
  appId: "1:494829137683:web:1e9e6f4a910b02b70774e6",
  measurementId: "G-43X839WMSM"
};

const app = initializeApp(firebaseConfig);
export const auth = getAuth(app);
export const db = getFirestore(app);

/* ----- Helpers ----- */
// Local calendar date (YYYY-MM-DD) based on your device timezone (India).
export function todayId(date = new Date()) {
  // ensures local date, not UTC
  const y = date.getFullYear();
  const m = String(date.getMonth()+1).padStart(2,"0");
  const d = String(date.getDate()).padStart(2,"0");
  return `${y}-${m}-${d}`;
}
function asTimestamp(input) {
  // supports <input type="time"> (HH:MM) and <input type="datetime-local">
  if (!input) return null;
  // if only time is given, attach today's date
  if (/^\d{2}:\d{2}$/.test(input)) {
    const [h, mm] = input.split(":");
    const t = new Date();
    t.setHours(Number(h), Number(mm), 0, 0);
    return Timestamp.fromDate(t);
  }
  // datetime-local -> YYYY-MM-DDTHH:MM
  return Timestamp.fromDate(new Date(input));
}
function minutesBetween(tsStart, tsEnd) {
  if (!tsStart || !tsEnd) return 0;
  const ms = tsEnd.toMillis() - tsStart.toMillis();
  return Math.max(0, Math.round(ms / 60000));
}

/* ----- Auth ready ----- */
export function onUserReady(cb) {
  onAuthStateChanged(auth, (user) => cb(user || null));
}

/* ----- Ensure a daily doc exists ----- */
export async function ensureDaily(dateKey = todayId()) {
  const ref = doc(db, "daily", dateKey);
  const snap = await getDoc(ref);
  if (!snap.exists()) {
    await setDoc(ref, {
      createdAt: serverTimestamp(),
      date: dateKey,
      // optional summaries you can compute later
      completion: 0,
      focus: null,
      notes: "",
      totals: { routineMinutes: 0 },
      tasks: [],  // your top-3 if you store them
    });
  }
  return ref;
}

/* ----- Sleep data ----- */
export async function saveSleepData({ sleptAt, wakeUpAt, dateKey = todayId() }) {
  const ref = await ensureDaily(dateKey);
  const startTS = asTimestamp(sleptAt);
  const endTS   = asTimestamp(wakeUpAt);
  const mins = minutesBetween(startTS, endTS);

  await updateDoc(ref, {
    sleep: {
      sleptAt: startTS,
      wakeUpAt: endTS,
      minutes: mins,
      savedAt: serverTimestamp()
    }
  });
}

/* ----- Morning routine activities (time blocks) ----- */
// Stored under: /daily/{dateKey}/activities/{autoId}
export async function addRoutineActivity({ start, end, label, dateKey = todayId() }) {
  const ref = await ensureDaily(dateKey);
  const startTS = asTimestamp(start);
  const endTS   = asTimestamp(end);
  const mins = minutesBetween(startTS, endTS);

  await addDoc(collection(ref, "activities"), {
    label: (label || "").trim() || "Activity",
    start: startTS,
    end: endTS,
    minutes: mins,
    createdAt: serverTimestamp()
  });

  // bump daily total minutes (simple re-save; you can compute server-side later)
  const snap = await getDoc(ref);
  const prev = snap.exists() && snap.data().totals?.routineMinutes || 0;
  await updateDoc(ref, { "totals.routineMinutes": prev + mins });
}

/* ----- Save Top-3 + avoidance ----- */
export async function saveMorningPlan({ task1, task2, task3, avoidance, dateKey = todayId() }) {
  const ref = await ensureDaily(dateKey);
  await updateDoc(ref, {
    tasks: [
      { text: task1 || "", done: false },
      { text: task2 || "", done: false },
      { text: task3 || "", done: false },
    ],
    avoidance: avoidance || "",
    morningSavedAt: serverTimestamp()
  });
}

/* ----- Update task completion (evening checkboxes) ----- */
export async function updateTaskCompletion({ index, done, dateKey = todayId() }) {
  const ref = await ensureDaily(dateKey);
  const snap = await getDoc(ref);
  const data = snap.data() || {};
  const tasks = Array.isArray(data.tasks) ? data.tasks : [];

  if (!(index in tasks)) return;

  tasks[index].done = !!done;
  const doneCount = tasks.filter(t => t.done).length;
  const pct = tasks.length ? Math.round((doneCount / tasks.length) * 100) : 0;

  await updateDoc(ref, {
    tasks,
    completion: pct,
    lastUpdated: serverTimestamp()
  });
}

/* ----- Save evening reflection ----- */
export async function saveEveningReflection({ focused, improvement, dateKey = todayId() }) {
  const ref = await ensureDaily(dateKey);
  await updateDoc(ref, {
    reflection: {
      focused: focused ?? null, // "yes" | "no"
      improvement: improvement || "",
      savedAt: serverTimestamp()
    }
  });
}

/* ----- Fetch activities for a given day (to render charts) ----- */
export async function getDay(dateKey = todayId()) {
  const ref = doc(db, "daily", dateKey);
  const snap = await getDoc(ref);
  return snap.exists() ? { id: dateKey, ...snap.data() } : null;
}
