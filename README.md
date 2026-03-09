# Splitly Frontend Documentation

## 1. Introduction

Splitly is a group expense splitting application that allows users to create groups, invite members, track shared expenses, record payments, and view balances between users. The frontend provides the user interface for authentication, group management, expense tracking, payments, and balance visualization. It is built with React.js and Chakra UI, and communicates with the backend via REST APIs.

## 2. System Overview

The frontend interacts with:

- The backend REST API for all data operations
- The authentication system for login/signup and session management
- Browser storage (localStorage/sessionStorage) for storing authentication tokens
- UI components and state management for rendering and updating the interface

**General Data Flow:**
User actions → UI components → API service layer → Backend API → Response → State update → UI update

## 3. Architecture

The frontend architecture includes:

- **Pages:** Route-based views (e.g., Login, Dashboard, Groups, Group Details)
- **Components:** Reusable UI elements (e.g., Navbar, GroupCard, PaymentList)
- **Hooks:** Custom hooks for state, effects, and API calls
- **API Services:** Abstractions for backend communication (e.g., auth, groups, expenses)
- **Routing:** Managed with React Router, including protected routes and authentication guards
- **State Handling:** Managed with React hooks, context, and query clients

**Authentication:**

- Login/signup flows interact with the backend and store tokens in browser storage
- Protected routes use authentication guards to restrict access

**API Calls:**

- API service layer handles requests, attaches authentication headers, and manages errors

**UI State:**

- State is updated via hooks/context and reflected in UI components

## 4. Tech Stack

| Technology    | Purpose                              |
| ------------- | ------------------------------------ |
| React.js      | UI development                       |
| Vite          | Fast build & development environment |
| Chakra UI     | Component library & styling          |
| React Router  | Client-side routing                  |
| Axios / Fetch | API requests                         |
| React Icons   | Iconography                          |
| Context API   | Global state management              |
| Custom Hooks  | Local and shared logic               |

## 5. Project Structure

Example folder tree:

```
src/
  components/      # Reusable UI components
  pages/           # Route-based views
  features/        # Domain-specific modules (auth, groups, expenses)
  hooks/           # Custom React hooks
  services/        # API service functions
  utils/           # Shared utility functions
  layouts/         # Layout components (AppHeader, Footer, etc.)
  assets/          # Static assets (images, icons)
  routes/          # Routing configuration and guards
  App.jsx          # Root app component
  main.jsx         # Entry point
```

- **components/**: Common widgets and UI elements
- **pages/**: Main screens for each route
- **features/**: Business logic grouped by domain
- **hooks/**: Custom hooks for state and effects
- **services/**: API abstraction and data fetching
- **utils/**: Helper functions and constants
- **layouts/**: Layout and structural components
- **assets/**: Images and static files
- **routes/**: Route definitions and guards
- **App.jsx**: Root app component
- **main.jsx**: Application entry point

## 6. Installation & Setup

### Prerequisites

- Node.js (>=14.x recommended)
- npm or yarn

### Clone Repository

```bash
git clone <repository-url>
cd splitly-frontend
```

### Install Dependencies

```bash
npm install
```

### Environment Variables

Create a `.env` file in the project root:

```
VITE_API_BASE_URL=http://localhost:5000/api
```

- `VITE_API_BASE_URL`: Base URL for backend API requests

### Running the Development Server

```bash
npm run dev
```

The app will be available at [http://localhost:5173](http://localhost:5173) by default.

## 7. Routing

Routing is managed with React Router. Main routes include:

- `/` : Landing Page
- `/login` : Login
- `/signup` : Signup
- `/dashboard` : User dashboard
- `/groups` : Group list and management
- `/groups/:id` : Group details, expenses, members
- `/groups/:id/add-expense` : Add expense to group
- `/payments` : Payments and balances

**Protected Routes:**

- Routes requiring authentication use guards (e.g., ProtectedRoute) to restrict access

## 8. UI Components

Reusable UI components include:

- **Navbar**: Top navigation bar
- **Sidebar**: Side navigation (if present)
- **GroupCard**: Displays group info
- **PaymentList**: Lists payments
- **ExpenseItem**: Shows individual expense
- **Toast notifications**: Feedback for actions/errors

Chakra UI is used for styling, layout, and responsive design.

## 9. API Integration

The frontend communicates with the backend via a dedicated API service layer:

- Requests are structured with Axios or Fetch
- Authentication headers (e.g., Bearer token) are attached automatically
- Errors are caught and handled with toast notifications

**Example API request:**

```js
import axios from "axios";

const api = axios.create({
  baseURL: process.env.VITE_API_BASE_URL,
});

export const getGroups = async (token) => {
  return api.get("/groups", {
    headers: { Authorization: `Bearer ${token}` },
  });
};
```

## 10. State Management

State is managed using:

- **Authentication state**: Stored in context and browser storage
- **Group data**: Managed via hooks and query clients
- **Payments**: Fetched and cached
- **Loading and error states**: Managed via hooks/context

## 11. Error Handling & Notifications

- Errors and success messages are shown using toast notifications
- Loading indicators are used for async operations
- Fallback UI is provided for empty/error states

## 12. Development Guidelines

- Use functional components and hooks
- Follow consistent naming conventions (camelCase for variables, PascalCase for components)
- Organize code by feature and component
- Write clear, descriptive commit messages
- Keep components small and reusable

## 13. Performance Considerations

- Use lazy loading for routes and heavy components
- Apply memoization (React.memo, useMemo, useCallback) where needed
- Optimize state updates and avoid unnecessary re-renders

## 14. Future Improvements

- Enhanced mobile responsiveness
- Dark mode improvements
- Real-time updates (e.g., WebSockets)
- Improved analytics dashboard

## 15. License

This project is licensed under the MIT License. See the LICENSE file for details.
