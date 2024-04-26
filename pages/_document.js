import { Html, Head, Main, NextScript } from "next/document";

export default function Document() {
  return (
    <Html lang="en">
      <Head/>
      <body className="bg-[url('../pages/Assets/scenery.jpeg')] bg-cover flex items-center justify-center">
        <Main />
        <NextScript />
      </body>
    </Html>
  );
}
