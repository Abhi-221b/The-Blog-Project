import { useState, useEffect } from "react";
import { useNavigate } from "react-router";
import { useAppSelector } from "../store/hooks";

export interface AuthLayoutProps {
  children: React.ReactNode;
  authentication?: boolean;
}

export default function AuthLayout({
  children,
  authentication = true,
}: AuthLayoutProps) {
  const navigate = useNavigate();
  const [isLoading, setIsLoading] = useState(true);
  const { isLoggedIn, userData } = useAppSelector((state) => state.loginStatus);

  useEffect(() => {
    if (authentication && isLoggedIn === false) {
      navigate("/login", { replace: true });
    }

    if (authentication && isLoggedIn === true && !userData?.emailVerification) {
      navigate("/verify-email", { replace: true });
    }

    // 🚫 public-only route & logged in
    if (!authentication && isLoggedIn === true) {
      navigate("/", { replace: true });
    }

    setIsLoading(false);
  }, [isLoggedIn, navigate, authentication]);

  return isLoading ? (
    <h1 className="text-center text-green-600 text-9xl"></h1>
  ) : (
    <div>{children}</div>
  );
}
