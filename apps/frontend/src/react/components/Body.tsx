"use server";

import { Inter } from "next/font/google";

import { FC, PropsWithChildren } from "react";

const inter = Inter({ subsets: ["latin"] });

const Body: FC<PropsWithChildren> = ({ children }) => {
  return (
    <body
      className={`${inter.className} h-screen max-w-screen text-white bg-zinc-800`}
    >
      <div className=" container mx-auto m-12">{children}</div>
    </body>
  );
};

export default Body;
