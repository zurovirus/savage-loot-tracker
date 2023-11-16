import "@/styles/globals.css";

export default function App({ Component, pageProps }) {
  return (
    <div className="flex justify-center">
      <div className="max-w-7xl w-full">
        <Component {...pageProps} />
      </div>
    </div>
  );
}
