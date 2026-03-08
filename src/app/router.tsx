import { BrowserRouter, Routes, Route, Navigate } from "react-router-dom";
import AppHeader from "../components/layout/AppHeader";
import { LoginPage } from "@/features/auth/pages";
import { SignupPage } from "@/features/auth/pages";
import { GroupListPage } from "@/features/groups/pages";
import { GroupDetailsPage } from "@/features/groups/pages";
import { JournalPage } from "@/features/journal/pages";
import ProtectedRoute from "./ProtectedRoute";
import PublicOnlyRoute from "./PublicOnlyRoute";
import VerifyEmail from "@/features/auth/pages/VerifyPage";
import LandingPage from "../pages/LandingPage";
import Footer from "@/components/layout/Footer";
export function AppRouter() {
  return (
    <BrowserRouter>
      <AppHeader />
      <Routes>
        {/* Public Routes */}
        <Route
          path="/login"
          element={
            <PublicOnlyRoute>
              <LoginPage />
            </PublicOnlyRoute>
          }
        />
        <Route
          path="/signup"
          element={
            <PublicOnlyRoute>
              <SignupPage />
            </PublicOnlyRoute>
          }
        />
        <Route
          path="/verify-email"
          element={
            <PublicOnlyRoute>
              <VerifyEmail />
            </PublicOnlyRoute>
          }
        />

        {/* Protected Routes */}
        <Route
          path="/dashboard"
          element={
            <ProtectedRoute>
              <GroupListPage />
            </ProtectedRoute>
          }
        />
        <Route
          path="/group/:groupId"
          element={
            <ProtectedRoute>
              <div className="flex flex-col w-full">
                <GroupDetailsPage />
              </div>
            </ProtectedRoute>
          }
        />
        <Route
          path="/group/:groupId/journal/:memberId"
          element={
            <ProtectedRoute>
              <JournalPage />
            </ProtectedRoute>
          }
        />

        {/* Public Landing Page */}
        <Route
          path="/"
          element={
            <PublicOnlyRoute>
              <LandingPage />
            </PublicOnlyRoute>
          }
        />

        {/* 404 Fallback */}
        <Route
          path="*"
          element={
            <Navigate
              to="/dashboard"
              replace
            />
          }
        />
      </Routes>
      <Footer />
    </BrowserRouter>
  );
}
