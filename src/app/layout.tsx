export const metadata = { title: "Next + D1 + Drizzle + GraphQL" };

export default function RootLayout({ children }: { children: React.ReactNode }) {
  return (
    <html lang="en">
      <body style={{ fontFamily: "system-ui", maxWidth: 520, margin: "3rem auto", padding: "0 1rem" }}>
        {children}
      </body>
    </html>
  );
}
