# Task Management - Frontend

This document covers the frontend implementation for the Task Management application.

## Overview

The frontend is developed using **ReactJS** and provides a modern and responsive user interface for managing personal tasks. It integrates with the backend API to handle task-related actions.

## Main Features

- **React Hooks**: Utilizes hooks such as `useParams`, `useEffect`, `useState`, `useContext`, and `useNavigate` to manage application state and navigation.
  - **`useParams`**: Extracts parameters from the URL, like task ID.
  - **`useEffect`**: Performs side effects, such as fetching data from the API.
  - **`useState`**: Manages state within components.
  - **`useContext`**: Shares state and functionality across components.
  - **`useNavigate`**: Handles navigation between pages.
- **User Interface**: Uses **Tailwind CSS** for creating a responsive and modern UI. Tailwind provides utility-first CSS classes for designing visually appealing interfaces.
- **Task Management**: Integrates with backend APIs for task operations including viewing, creating, editing, and deleting tasks.

## User Interface Features

- **Registration and Login**: Forms for user registration and login.
- **Task List**: Displays user’s tasks with options for editing and deleting.
- **Create and Manage Tasks**: Interfaces for task creation, editing, and deletion.

## Features

- **Registration and Login**: Allows account creation and login.
- **Task List**: Shows all tasks created by the user.
- **Create New Task**: Add new tasks to the list.
- **Edit Task**: Modify tasks created by the user.
- **Delete Task**: Remove tasks created by the user.
- **Access Control**: Ensures users can only manage their own tasks.
