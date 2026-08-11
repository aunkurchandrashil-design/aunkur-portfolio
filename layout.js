import "./globals.css";

export const metadata = {
  title: "Aunkur Chandra Shil | SEO & Digital Marketing Specialist",
  description:
    "Portfolio of Aunkur Chandra Shil — SEO & Digital Marketing Specialist based in Dhaka, Bangladesh.",
};

export default function RootLayout({ children }) {
  return (
    <html lang="en">
      <body>{children}</body>
    </html>
  );
}
