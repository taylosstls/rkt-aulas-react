import { Html, Head, Main, NextScript } from 'next/document'
import { getCssText } from '../../stitches.config'

export default function Document() {
  return (
    <Html lang="pt-br">
      <Head>
        <style
          id="stitches"
          dangerouslySetInnerHTML={{ __html: getCssText() }}
        />
        <link rel="shortcut icon" href="/favicon.svg" type="image/svg" />
      </Head>
      <body>
        <Main />
        <NextScript />
      </body>
    </Html>
  )
}
