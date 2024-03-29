import "@/styles/globals.css";
import Nav from "@/components/nav";
import Banner from "@/components/banner";
import { SessionProvider } from "next-auth/react";

// The application
export default function App({
  Component,
  pageProps: { session, ...pageProps },
}) {
  return (
    <SessionProvider session={session}>
      {/* <Banner /> */}
      <Nav />
      <div className="flex justify-center bg-stone-800 text-white">
        <div className="max-w-7xl w-full max-h-full min-h-screen">
          <Component {...pageProps} />
        </div>
      </div>
    </SessionProvider>
  );
}
