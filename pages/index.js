import { useSession } from "next-auth/react";
import Image from "next/image";

// The home page.
export default function Home() {
  const { data: session } = useSession();

  return (
    <>
      {/* Displays a message if a session does not exist. */}
      {!session && (
        <div className="flex justify-center items-start my-4 -mb-4">
          <div className="chat chat-end">
            <div className="chat-bubble text-white font-semibold w-96 text-center">
              An account is needed to use this website.
              <br />
              Please sign in with your Discord!
            </div>
          </div>
          <Image
            src="/homepage/TalkingZuro.png"
            alt="Talking Zuro"
            width={150}
            height={75}
            className="rounded-full  mx-2"
          />
        </div>
      )}
      <div className="text-4xl text-center p-6 flex flex-col justify-center items-center">
        <div className="my-6">
          <p className="text-yellow-500 font-bold">XIV Savage Loot Tracker</p>
        </div>
        <div className="text-2xl mb-6">
          <p>Track all your raid drops in one location</p>
        </div>
        <div>
          <img
            src="/homepage/Homepage.png"
            alt="Tracker Image"
            className="mx-auto rounded-xl shadow-xl shadow-zinc-900"
          />
        </div>
      </div>
    </>
  );
}
