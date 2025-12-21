# TaskFlow — React Native Task Manager (Expo)

A simple Task Manager app built with React Native and Expo. It allows users to add tasks, mark them complete, and delete them. The app focuses on clean UI, local state management, and straightforward interactions.

## Features
- Add Task: Create a new task with a title and choose a category.
- Mark Complete: Toggle completion by tapping the status icon.
- Delete Task: Remove a task from the list.
- Task List: See all tasks (complete and incomplete) in a clean list.
- Helpful UI: Visual feedback (icons, colors, line-through for completed, empty state).

## Getting Started
1. Install dependencies:
   - npm install
2. Run the app:
   - npx expo start
3. Open in your preferred target: Android emulator, iOS simulator, or Expo Go.

## Usage
- Add: Tap the “+” button, enter a title, select a category, then “Add Task”.
- Complete: Tap the circle icon to toggle a task as complete/incomplete.
- Delete: Tap the trash icon to remove a task.

## Tech / Libraries
- Expo + React Native: App runtime and tooling.
- expo-router: File-based routing.
- nativewind: Utility-first styling for React Native.
- lucide-react-native: Icon set.
- react-native-safe-area-context: Safe area handling.
- react-native-reanimated (animations)
- expo-haptics (haptic feedback)

## Project Notes
- State Management: Local component state in the main screen manages task data, passed down via props.
- Components: AddTaskModal, TaskItem, Header, Sidebar, FilterModal.

## Future Adjustments
- SQLite Persistence:
  - Integrate expo-sqlite to persist tasks (id, title, category, completed) locally.
  - Load tasks from the database on app start and keep state in sync on add/complete/delete.
- Due Dates with Notifications:
  - Extend Task type with a dueDate field.
  - Use expo-notifications to schedule local notifications that remind users at the selected due date/time.
  - Add UI to pick date/time and manage scheduled notifications.
