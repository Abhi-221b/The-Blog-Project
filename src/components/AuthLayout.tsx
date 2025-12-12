import { useState, useEffect } from "react";
import { useNavigate } from "react-router";
import { useAppSelector } from "../store/hooks";

export interface AuthLayoutProps {
  children: React.ReactNode;
  secure: boolean;
}

export default function AuthLayout({
  children,
  secure = true,
}: AuthLayoutProps) {
  const navigate = useNavigate();
  const [isLoading, setIsLoading] = useState(true);
  const isLoggedIn = useAppSelector((state) => state.loginStatus.isLoggedIn);

  useEffect(() => {
    if (secure && isLoggedIn !== secure) {
      navigate("/login");
    } else if (!secure && isLoggedIn !== secure) {
      navigate("/");
    }
    setIsLoading(false);
  }, []);

  return isLoading ? (
    <h1 className="text-center text-green-600 text-9xl"></h1>
  ) : (
    <div>{children}</div>
  );
}
