"use client"
import useForm from "@/hooks/useForm";
import Image from "next/image";
import Form from "../components/form";
import { createuser } from "@/lib/_server/auth";
import { useActionState } from "react";

export default function Home() {
  const [state, action] = useActionState(createuser as any, { email: "", password: "", name: "" })
  console.log(state)

  return (
    <div className="bg-background  h-screen">
      <form action={action} className="*:block">
        <input type="text" name="name" />
        <input type="password" placeholder="Password" name="password" />
        <input type="email" placeholder="Your Email" name="email" />
        <button name="submit">Createusr</button>
      </form>
    </div>
  );
}
