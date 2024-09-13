import { ThemeProvider } from "@/components/theme-provider";
import { Inter } from "next/font/google";
// import "nextra-theme-docs/style.css";
import "../styles/globals.css";
// If loading a variable font, you don't need to specify the font weight
const inter = Inter({ subsets: ["latin"] });

export default function MyApp({ Component, pageProps }) {
  return (
    <ThemeProvider
      attribute="class"
      defaultTheme="dark"
      enableSystem
      disableTransitionOnChange
    >
      <main>
        <style jsx global>{`
          html {
            font-family: ${inter.style.fontFamily};
          }
        `}</style>
        <Component {...pageProps} />
      </main>
    </ThemeProvider>
  );
}
