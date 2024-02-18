"use server";

import { redirect, RedirectType } from "next/navigation";

import { login } from "@/tools/auth";

export const handleForm = async (prevState: unknown, formData: FormData) => {
  void prevState;

  await new Promise((resolve) => setTimeout(resolve, 1000));

  const email = formData.get("email")?.toString();
  const password = formData.get("password")?.toString();

  if (!email || !password) {
    return "Missing email or password";
  }

  try {
    await login({
      email,
      password,
    });
  } catch (e) {
    if (e instanceof Error) return e.message;
  }

  redirect("/me", RedirectType.replace);
};
