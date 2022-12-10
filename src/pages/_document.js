import { Html, Head, Main, NextScript } from "next/document";
import Fonts from "../components/common/Google/Fonts";

export default function Document() {
  return (
    <Html>
      <Head>
        <meta charSet="utf-8" />
        <link rel="icon" type="image/svg+xml" href="favicon.svg" />
        <Fonts />
      </Head>
      <body>
        <Main />
        <NextScript />
      </body>
    </Html>
  );
}
