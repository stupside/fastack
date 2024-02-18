import { PropsWithChildren } from "react";

import "./globals.css";
import type { Metadata, NextPage, Viewport } from "next";

import { FocusableInitialization } from "@fastack/react-spatial";

import Body from "@/react/components/Body";

export const metadata: Metadata = {
  title: "Fastack",
  description: "Fastack Frontend",
};

export const viewport: Viewport = {
  initialScale: 1.0,
  colorScheme: "dark",
  width: "device-width",
};

const Layout: NextPage<PropsWithChildren> = ({ children }) => {
  return (
    <html lang="en">
      <Body>
        <FocusableInitialization config={{}}>
          {children}
        </FocusableInitialization>
      </Body>
    </html>
  );
};

export default Layout;
