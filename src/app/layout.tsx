import type { ReactNode } from "react";

// The real layout lives in app/[locale]/layout.tsx, which sets the page language.
export default function RootLayout({ children }: { children: ReactNode }) {
  return children;
}
