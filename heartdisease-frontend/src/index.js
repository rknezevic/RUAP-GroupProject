import React from "react";
import ReactDOM from "react-dom/client";
import "./index.css";
//import * as firebase from 'firebase/app';
import reportWebVitals from "./reportWebVitals";
import { createBrowserRouter, RouterProvider } from "react-router-dom";
//import HomePage from "./pages/HomePage";
import LoginPage from "./pages/LoginPage";
import RegisterPage from "./pages/RegisterPage";
import { HomePage } from "./pages/HomePage";
import { TestPage } from "./pages/TestPage";
import { HistoryPage } from "./pages/HistoryPage";
import { AboutUsPage } from "./pages/AboutUsPage";

const router = createBrowserRouter([
  {
    path: "/",
    element: <HomePage />,
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
    element: <TestPage />,
  },
  {
    path: "/history",
    element: <HistoryPage />,
  },
  {
    path: "/about-us",
    element: <AboutUsPage />,
  },
]);

const root = ReactDOM.createRoot(document.getElementById("root"));
root.render(
  <React.StrictMode>
    <RouterProvider router={router} />
  </React.StrictMode>
);
// If you want to start measuring performance in your app, pass a function
// to log results (for example: reportWebVitals(console.log))
// or send to an analytics endpoint. Learn more: https://bit.ly/CRA-vitals
reportWebVitals();
