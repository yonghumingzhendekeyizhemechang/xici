import type { Metadata } from "next";
import "./globals.css";
import { ClassicShell } from "@/components/classic-shell";

export const metadata: Metadata = {
  title: "西祠堂巷",
  description: "一个中文旧网复兴实验。可以开版，可以回帖，可以认门，也可以慢慢等人回来。"
};

export default function RootLayout({ children }: Readonly<{ children: React.ReactNode }>) {
  return (
    <html lang="zh-CN" data-theme="xici-classic">
      <body>
        <ClassicShell>{children}</ClassicShell>
      </body>
    </html>
  );
}
