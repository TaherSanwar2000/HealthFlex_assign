# React Native Timer App

## 📌 Overview
A React Native app that allows users to create, manage, and interact with multiple customizable timers. The app features categories, progress visualization, and bulk actions while maintaining a clean UI/UX with minimal third-party dependencies.

## 🚀 Features Implemented

### 1️⃣ Add Timer
- Users can create a new timer with the following fields:
  - **Name**: Define a custom name (e.g., "Workout Timer").
  - **Duration**: Set timer duration in seconds.
  - **Category**: Assign a category (e.g., "Workout," "Study," "Break").
- Timers are **persisted locally** using AsyncStorage.

### 2️⃣ Timer List with Grouping
- Timers are displayed **grouped by category**.
- Categories can be **expanded/collapsed**.
- Each timer displays:
  - Name
  - Remaining time
  - Status (Running, Paused, Completed)

### 3️⃣ Timer Management
- Each timer supports:
  - **Start**: Begins countdown.
  - **Pause**: Pauses countdown.
  - **Reset**: Resets to original duration.
- Timers automatically mark as **"Completed"** when reaching zero.
- Timers continue running **even if the app is closed**.

### 4️⃣ Progress Visualization
- A **progress bar** or **percentage indicator** visualizes the remaining time for each timer.

### 5️⃣ Bulk Actions
- Users can perform **category-wide actions**:
  - Start all timers in a category.
  - Pause all timers in a category.
  - Reset all timers in a category.

### 6️⃣ Timer History
- Completed timers are **logged** with:
  - Timer name
  - Completion time
- A **"History" screen** displays the log.


## 📱 Tech Stack
- **React Native** (Core Framework)
- **AsyncStorage** (Local Data Persistence)
- **Expo** (Development & Testing)


## 📌 Future Enhancements
- Add **sound/vibration** notifications.
- Implement **cloud storage** for syncing timers across devices.
- Improve **UI animations** for better user experience.

---

✅ **Current Progress:** Core features implemented with smooth UI/UX and local persistence.
📢 **Feedback & Contributions Welcome!** 🚀

