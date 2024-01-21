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
<<<<<<< HEAD
import { AboutUsPage } from "./pages/AboutUsPage";
import { TestDetails } from "./pages/TestDetails";
=======
import RequireAuthPage from "./pages/RequireAuthPage";
>>>>>>> 6f4b312408f2eb68c203069ac971d1c3a9ea1a4a

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
  {
    path: "/test-details/:id",
    element: <TestDetails/>
  }
]);

const root = ReactDOM.createRoot(document.getElementById("root"));
root.render(
  <React.StrictMode>
    <RouterProvider router={router} />
  </React.StrictMode>
);

reportWebVitals();
