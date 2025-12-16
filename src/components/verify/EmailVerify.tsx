import { useState, useEffect } from "react";
import { useNavigate } from "react-router";
import appAuth from "../../appwrite/auth";
import { useAppSelector, useAppDispatch } from "../../store/hooks";
import { checkLogin, logout } from "../../store/loginSlice";
import Button from "../button/Button";

export function EmailVerify() {
  const navigate = useNavigate();
  const dispatch = useAppDispatch();

  const userData = useAppSelector((state) => state.loginStatus.userData);
  const [verificationTry, setverificationTry] = useState(0);

  const [emailVerified, setEmailVerified] = useState(
    userData?.emailVerification
  );

  useEffect(() => {
    if (emailVerified) {
      navigate("/", { replace: true });
      return;
    }

    if (verificationTry >= 4) {
      appAuth.logout();
      dispatch(logout());
      navigate("/", { replace: true });
      return;
    }

    const intervalId = setInterval(async function () {
      try {
        const newUserData = await appAuth.getCurrentUser();
        if (newUserData?.emailVerification) {
          dispatch(checkLogin(newUserData));
          setEmailVerified(true);
          clearInterval(intervalId);
        } else {
          setverificationTry((prev) => prev + 1);
        }
      } catch (error) {
        console.error("Verification check failed", error);
        clearInterval(intervalId);
      }
    }, 60000);

    return () => clearInterval(intervalId);
  }, [emailVerified, verificationTry, navigate, dispatch]);

  return (
    <div className="flex flex-wrap p-4 min-h-[480px] text-center items-center justify-center md:p-6 max-w-3xl my-12 mx-auto backdrop-blur-xs box-style">
      <p className="mb-2">
        A verification email has been sent to your registered email address.
      </p>
      <p className="mb-2">
        Please verify your email by clicking the link in the message to complete
        your registration.
      </p>
      <Button
        onClick={() => {
          if (userData?.$id && userData?.email) {
            appAuth.generateMagicUrl(userData.$id, userData.email);
          } else {
            return null;
          }
        }}
      >
        Re-Send Email verification Mail
      </Button>
    </div>
  );
}

export default EmailVerify;
