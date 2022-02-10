import NextNProgress from "nextjs-progressbar";

function MyApp({ Component, pageProps }) {
  return (
    <>
      <NextNProgress
        color={'red'}
        startPosition={0.5}
        stopDelayMs={200}
        height={5}
      />
      <Component {...pageProps} />
    </>
  );
}

export default MyApp
