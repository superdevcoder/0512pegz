import Document, { Html, Head, Main, NextScript } from 'next/document'

class MyDocument extends Document {
    static async getInitialProps(ctx) {
        const initialProps = await Document.getInitialProps(ctx)
        return { ...initialProps }
    }

    render() {
        return (
            // eslint-disable-next-line react/jsx-filename-extension
            <Html>
                <Head>
                    <script
                        type="module"
                        src="https://unpkg.com/@google/model-viewer/dist/model-viewer.min.js"
                    />
                    <script
                        nomodule
                        src="https://unpkg.com/@google/model-viewer/dist/model-viewer-legacy.js"
                    />
                </Head>
                <body>
                    <Main />
                    <NextScript />
                </body>
            </Html>
        );
    }
}

export default MyDocument;
