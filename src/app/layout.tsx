import type { Metadata } from "next";
import { Providers } from "./providers";
import Layout from "@/components/Layout";

export const metadata: Metadata = {
  title: "Balanceè Rewards Summary",
  description:
    "Track your cashback earnings and manage rewards on the Balanceè platform.",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en">
      <body>
        <Providers>
          <Layout>{children}</Layout>
        </Providers>
      </body>
    </html>
  );
}
