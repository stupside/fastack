"use server";

import { NextPage } from "next";
import { redirect, RedirectType } from "next/navigation";

import { PropsWithChildren } from "react";

import { authentified } from "@/tools/auth";

const Layout: NextPage<PropsWithChildren> = async ({ children }) => {
  const ok = await authentified();

  if (ok) {
    return <>{children}</>;
  }

  redirect("/auth/login", RedirectType.replace);
};

export default Layout;
