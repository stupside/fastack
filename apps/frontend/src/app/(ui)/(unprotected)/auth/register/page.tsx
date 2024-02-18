"use client";

import { NextPage } from "next";
import Link from "next/link";

import { useActionState } from "react";

import { handleForm } from "./action";

const Page: NextPage = () => {
  const [error, dispatch, isPending] = useActionState(handleForm, null);

  return (
    <>
      <form action={dispatch}>
        <input type="text" name="name" placeholder="Name" />
        <input type="email" name="email" placeholder="Email" />
        <input type="password" name="password" placeholder="Password" />
        <button type="submit" disabled={isPending}>
          {isPending ? "Loading..." : "Register"}
        </button>
        {error && <p>{error}</p>}
      </form>
      <Link href="/auth/login">Login</Link>
    </>
  );
};

export default Page;
