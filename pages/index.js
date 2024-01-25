import { useSession } from "next-auth/react";

export default function Home() {
  const { data: session } = useSession();

  console.log(session);
  return (
    <>
      {!session && (
        <p className="text-red-700">
          An account is needed to use this website, please sign in with your
          discord to get started.
        </p>
      )}
      <div className="text-4xl text-center p-6 flex flex-col justify-center items-center">
        <div className="my-6">
          <p className="text-yellow-500 font-bold">XIV Savage Loot Tracker</p>
        </div>
        <div className="text-2xl mb-6">
          <p>Track your raid drops in one location</p>
        </div>
        <div>
          <img
            src="/homepage/Homepage.png"
            alt="Tracker Image"
            className="mx-auto rounded-xl"
          />
        </div>
      </div>
    </>
  );
}
