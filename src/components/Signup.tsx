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
  name: z.string().min(1, "Username is required"),
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

export default function Signup() {
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
      const currentUserData = await appAuth.createAccount(data);
      if (currentUserData) {
        const userData = await appAuth.getCurrentUser();
        if (userData) {
          dispatch(checkLogin(userData));
          const token = await appAuth.generateMagicUrl(
            userData.$id,
            userData.email
          );
          if (token) {
            console.log("hello visitor sending you to verify email");
            navigate("/verify-email");
          }
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
            label="Your Name:"
            type="text"
            className="username"
            placeholder="Enter Your Name:"
            {...register("name")}
          />
          {errors.name && (
            <div className="text-red-500 mb-5">{errors.name?.message}</div>
          )}
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
          <button type="submit">Submit</button>
        </form>
      </div>
    </>
  );
}
