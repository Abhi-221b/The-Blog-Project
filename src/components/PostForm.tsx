import { useForm } from "react-hook-form";
import Input from "./formFeild/Input";
import Select from "./formFeild/Select";
import RichText from "./formFeild/RichText";
import z from "zod";
import { zodResolver } from "@hookform/resolvers/zod";
import type {
  MindBlog,
  updateData,
  PostTag,
  PostStatus,
} from "../appwrite/postServices";

export default function PostForm(postData: MindBlog) {
  const {
    register,
    handleSubmit,
    control,
    formState: { errors },
  } = useForm<MindBlog>({
    resolver: zodResolver(formUserData),
  });

  if (postData) {
  }

  return <></>;
}
