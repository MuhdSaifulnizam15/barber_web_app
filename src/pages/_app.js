import "../styles/globals.css";

import { ThemeProvider } from "next-themes";
import { Provider } from 'react-redux';
import { Inter } from "@next/font/google";

import { store } from "src/store";

const interVariable = Inter();

function MyApp({ Component, pageProps }) {
  return (
    <Provider store={store}>
      <ThemeProvider attribute="class">
        <main className={interVariable.className}>
          <Component {...pageProps} />
        </main>
      </ThemeProvider>
    </Provider>
  );
}

export default MyApp;
