import { signIn, signOut, useSession } from "next-auth/react";

// Handles the user login
export default function Login() {
  const { data: session } = useSession();

  // If a session exists, Sign out button is displayed with the user's name and image.
  if (session) {
    return (
      <div className="flex items-center">
        <img
          src={session.user.image}
          alt={session.user.name}
          className="rounded-full max-w-10 max-h-10 mx-2"
        />
        <p>{session.user.name}</p>
        <button
          onClick={() => signOut()}
          className="mx-4 bg-gray-700 rounded-lg font-semibold p-2 px-4 hover:bg-gray-800 hover:text-gray-200"
        >
          Sign out
        </button>
      </div>
    );
  }

  // If no session exists, return a sign in button.
  return (
    <>
      <button
        onClick={() => signIn("discord")}
        className="flex items-center mx-4 bg-[#5865F2] rounded-lg font-semibold p-2 px-4 hover:bg-[#4651c2] hover:text-gray-200"
      >
        <img
          src={`/discordIcon/discord-mark-white.png`}
          alt="discord"
          className="w-8 h-6 mr-4"
        />
        <p>Sign in with Discord</p>
      </button>
    </>
  );
}
