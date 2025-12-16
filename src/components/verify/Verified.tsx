import { useEffect } from "react";
import { useNavigate } from "react-router";
import appAuth from "../../appwrite/auth";

export default function Verified() {
  const navigate = useNavigate();

  useEffect(() => {
    const urlParams = new URLSearchParams(window.location.search);
    const secret = urlParams.get("secret");
    const userId = urlParams.get("userId");

    if (!userId || !secret) {
      navigate("/login");
      return;
    }

    appAuth.account
      .createSession({ userId, secret })
      .then(() => navigate("/", { replace: true }))
      .catch(() => navigate("/login", { replace: true }));
  }, []);

  return <h1> Loading... </h1>;
}
