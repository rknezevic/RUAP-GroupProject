import React from "react";
import ReactDOM from "react-dom/client";
import "./index.css";
import reportWebVitals from "./reportWebVitals";
import { createBrowserRouter, RouterProvider } from "react-router-dom";
import LoginPage from "./pages/LoginPage";
import RegisterPage from "./pages/RegisterPage";
import { HomePage } from "./pages/HomePage";
import { TestPage } from "./pages/TestPage";
import { HistoryPage } from "./pages/HistoryPage";
import RequireAuthPage from "./pages/RequireAuthPage";

const router = createBrowserRouter([
  {
    path: "/",
    element: <HomePage></HomePage>,
  },
  {
    path: "/login",
    element: <LoginPage />,
  },
  {
    path: "/register",
    element: <RegisterPage />,
  },
  {
    path: "/test",
    element: <RequireAuthPage page={<TestPage></TestPage>}></RequireAuthPage>,
  },
  {
    path: "/history",
    element: (
      <RequireAuthPage page={<HistoryPage></HistoryPage>}></RequireAuthPage>
    ),
  },
]);

const root = ReactDOM.createRoot(document.getElementById("root"));
root.render(
  <React.StrictMode>
    <RouterProvider router={router} />
  </React.StrictMode>
);

reportWebVitals();
