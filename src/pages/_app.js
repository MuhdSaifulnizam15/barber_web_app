import "../styles/globals.css";

import { ThemeProvider } from "next-themes";
import { Inter } from "@next/font/google";

const interVariable = Inter();

function MyApp({ Component, pageProps }) {
  return (
    <ThemeProvider attribute="class">
      <main className={interVariable.className}>
        <Component {...pageProps} />
      </main>
    </ThemeProvider>
  );
}

export default MyApp;
