import type { Metadata } from "next";
import { Inter } from "next/font/google";

const inter = Inter({ subsets: ["latin"] })

export const metadata: Metadata = {
  title: "Portal de Carreiras",
  description: "Portal de carreiras personalizado",
};

export default function TenantLayout({
  children,
}: {
  children: React.ReactNode
}) {
  return (
    <div className={inter.className}>
      {children}
    </div>
  );
}