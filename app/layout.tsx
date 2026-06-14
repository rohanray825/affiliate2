import type {Metadata} from "next";
import "./globals.css";

export const metadata: Metadata = {
  title: {default: "All App Rewards - Latest Referral Apps", template: "%s | All App Rewards"},
  description: "Discover the latest referral apps, reward offers, and mobile promotions.",
  icons: {icon: "/icon.svg", shortcut: "/icon.svg", apple: "/reward-logo.svg"},
};

export default function RootLayout({children}: Readonly<{children: React.ReactNode}>) {
  return <html lang="en"><body>{children}</body></html>;
}
