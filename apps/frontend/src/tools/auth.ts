"use server";

import { cookies, headers } from "next/headers";

import { makeReq } from "./api";

const COOKIES_SESSION_TOKEN_KEY = "SESSION_TOKEN";

const save = async (token: string) => {
  const cks = await cookies();

  cks.set(COOKIES_SESSION_TOKEN_KEY, token, {
    path: "/",
    sameSite: "strict",
    secure: false,
    httpOnly: true,
  });
};

const destroy = async () => {
  const cks = await cookies();

  cks.delete(COOKIES_SESSION_TOKEN_KEY);
};

export const authentified = async () => {
  const cks = await cookies();

  return cks.has(COOKIES_SESSION_TOKEN_KEY);
};

export const login = async (params: { email: string; password: string }) => {
  const hdrs = await headers();

  const ip =
    hdrs.get("x-real-ip") ??
    hdrs.get("x-forwarded-for") ??
    hdrs.get("remote-addr");

  const agent = hdrs.get("user-agent");

  const ipv4 = ip?.replace("::ffff:", "");

  const { data } = await makeReq((c) =>
    c.POST("/auth/login", {
      body: {
        email: params.email,
        password: params.password,
        device: {
          ip: ipv4,
          agent,
        },
      },
      cache: "no-cache",
    }),
  );

  if (!data) {
    throw new Error("Failed to login");
  }

  await save(data.token);
};

export const register = async (params: {
  name: string;
  email: string;
  password: string;
}) => {
  const { data } = await makeReq((c) =>
    c.POST("/auth/register", {
      body: {
        name: params.name,
        email: params.email,
        password: params.password,
      },
      cache: "no-cache",
    }),
  );

  if (!data) {
    throw new Error("Failed to register");
  }

  await destroy();
};

export const getToken = async () => {
  const cks = await cookies();

  return cks.get(COOKIES_SESSION_TOKEN_KEY)?.value;
};
