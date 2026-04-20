import "./globals.css";
import ThemeProvider from "./ThemeProvider";

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html lang="en">
      <body className="bg-transparent">
        <ThemeProvider>{children}</ThemeProvider>
      </body>
    </html>
  );
}