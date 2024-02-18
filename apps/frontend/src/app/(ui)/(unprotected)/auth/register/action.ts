"use server";

import { redirect, RedirectType } from "next/navigation";

import { register } from "@/tools/auth";

export const handleForm = async (prevState: unknown, formData: FormData) => {
  void prevState;

  await new Promise((resolve) => setTimeout(resolve, 1000));

  const name = formData.get("name")?.toString();
  const email = formData.get("email")?.toString();
  const password = formData.get("password")?.toString();

  if (!name || !email || !password) {
    return "Missing name, email or password";
  }

  try {
    await register({
      name,
      email,
      password,
    });
  } catch (e) {
    if (e instanceof Error) return e.message;
  }

  redirect("/auth/login", RedirectType.replace);
};
