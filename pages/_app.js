import "@/styles/globals.css";
import Nav from "@/components/nav";
import Banner from "@/components/banner";

export default function App({ Component, pageProps }) {
  return (
    <>
      <Banner />
      <Nav />
      <div className="flex justify-center bg-stone-800 text-white">
        <div className="max-w-7xl w-full max-h-full">
          <div className="min-h-screen">
            <Component {...pageProps} />
          </div>
        </div>
      </div>
    </>
  );
}
