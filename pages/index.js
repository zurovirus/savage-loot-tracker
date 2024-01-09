import { useSession } from "next-auth/react";

export default function Home() {
  const { data: session } = useSession();

  console.log(session);
  return (
    <>
      <p>Welcome to the FFXIV Savage Loot Tracker!</p>
      {!session && (
        <p>
          An account is needed to use this website, please sign in with your
          discord to get started.
        </p>
      )}
    </>
  );
}
