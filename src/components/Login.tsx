import { useForm } from "react-hook-form";
import Input from "./formFeild/Input";
import type { SubmitHandler } from "react-hook-form";
import { z } from "zod";
import { zodResolver } from "@hookform/resolvers/zod";
import appAuth from "../appwrite/auth";
import { useAppDispatch } from "../store/hooks";
import { checkLogin } from "../store/loginSlice";
import { useNavigate } from "react-router";

const formUserData = z.object({
  email: z.email(),
  password: z
    .string()
    .min(8, "Must be minimum 6 letter")
    .regex(/[A-Z]/, "Must contain an uppercase letter")
    .regex(/[a-z]/, "Must contain a lowercase letter")
    .regex(/[0-9]/, "Must contain a number")
    .regex(/[^A-Za-z0-9]/, "Must contain a special character"),
});

type formData = z.infer<typeof formUserData>;

export default function Login() {
  const dispatch = useAppDispatch();
  const navigate = useNavigate();

  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm<formData>({
    resolver: zodResolver(formUserData),
  });

  const onSubmit: SubmitHandler<formData> = async (data) => {
    try {
      const session = await appAuth.login(data);
      if (session) {
        const userData = await appAuth.getCurrentUser();
        if (userData) {
          dispatch(checkLogin(userData));
          navigate("/", { replace: true });
        }
      }
    } catch (error) {
      throw error;
    }
  };

  return (
    <>
      <div className="block p-4 md:p-6 max-w-3xl mx-auto  backdrop-blur-xs">
        <form onSubmit={handleSubmit(onSubmit)}>
          <Input
            label="Your Email:"
            type="text"
            className="useremail"
            placeholder="Enter Your Email:"
            {...register("email")}
          />
          {errors.email && (
            <div className="text-red-500 mb-5">{errors.email?.message}</div>
          )}
          <Input
            label="Your password:"
            type="password"
            className="userpassword"
            {...register("password")}
          />
          {errors.password && (
            <div className="text-red-500 mb-5">{errors.password?.message}</div>
          )}
          <button type="submit">Login</button>
        </form>
      </div>
    </>
  );
}
