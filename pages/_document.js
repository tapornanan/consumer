import Document, { Html, Head, Main, NextScript } from "next/document";

class MyDocument extends Document {
  static async getInitialProps(ctx) {
    const initialProps = await Document.getInitialProps(ctx);
    return { ...initialProps };
  }

  render() {
    return (
      <Html>
        <Head />
        <body>
          <script src="http://localhost:3000/_next/static/chunks/remoteEntry.js" data-webpack="host" />
          <Main />
          <NextScript />
        </body>
      </Html>
    );
  }
}

export default MyDocument;