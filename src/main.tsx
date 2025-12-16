import { StrictMode } from "react";
import { createRoot } from "react-dom/client";
import "./index.css";
import App from "./App.tsx";
import { createBrowserRouter, RouterProvider } from "react-router";
import { Provider } from "react-redux";
import { store } from "./store/store.ts";
import Home from "./pages/Home.tsx";
import AboutUs from "./pages/AboutUs.tsx";
import ContactPage from "./pages/ContactPage.tsx";
import SignupPage from "./pages/SignupPage.tsx";
import LoginPage from "./pages/LoginPage.tsx";
import AuthLayout from "./components/AuthLayout.tsx";
import { Verified, EmailVerify } from "./components/index.ts";

const routes = createBrowserRouter([
  {
    path: "/",
    element: <App />,
    children: [
      { index: true, element: <Home /> },
      {
        path: "/about",
        element: (
          <AuthLayout>
            <AboutUs />
          </AuthLayout>
        ),
      },
      {
        path: "/verify",
        element: <Verified />,
      },
      {
        path: "/verify-email",
        element: <EmailVerify />,
      },
      {
        path: "/signup",
        element: (
          <AuthLayout authentication={false}>
            <SignupPage />
          </AuthLayout>
        ),
      },
      {
        path: "/login",
        element: (
          <AuthLayout authentication={false}>
            <LoginPage />
          </AuthLayout>
        ),
      },
      {
        path: "/contact",
        element: <ContactPage />,
      },
    ],
  },
]);

createRoot(document.getElementById("root")!).render(
  <StrictMode>
    <Provider store={store}>
      <RouterProvider router={routes} />
    </Provider>
  </StrictMode>
);
