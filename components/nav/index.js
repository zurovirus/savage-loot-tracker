import Link from "next/link";
import useFetch from "@/hooks/useFetch";
import Login from "./login";
import { useSession } from "next-auth/react";

// The Nav component, responsible for rendering the navigation bar
export default function Nav() {
  // Fetching data for tiers from an API and getting session data for authentication
  const { data } = useFetch("/api/tiers");
  const { data: session } = useSession();

  // Function to remove focus from the currently focused element
  const handleClick = () => {
    const elem = document.activeElement;
    if (elem) {
      elem.blur();
    }
  };

  // JSX for rendering the navigation bar
  return (
    <>
      <div className="flex justify-between p-3 items-center transition delay-150 ease-in-out bg-stone-950 hover:bg-stone-900 text-lg ">
        <div className="flex items-center ">
          {/* Link to the homepage with styled text */}
          <Link href="/" className="text-2xl font-bold text-yellow-500 mx-6">
            XIV Savage Loot Tracker
          </Link>
          {/* Visual divider */}
          <div className="divider lg:divider-horizontal divider-neutral" />
          {/* Link to the homepage */}
          <Link
            className="py-2 px-4 mx-2 text-gray-400 transition delay-100 ease-in-out hover:bg-gray-700 rounded-md"
            href="/"
          >
            Home
          </Link>
          {/* Conditionally rendered link to the user's raid group if they are logged in */}
          {session && (
            <Link
              className="py-2 px-4 text-gray-400 transition delay-100 ease-in-out hover:bg-gray-700 rounded-md"
              href="/groups"
            >
              My Raid Group
            </Link>
          )}
          {/* Dropdown menu for tracking the current tier, dynamically populated with fetched data */}
          <label
            tabIndex={0}
            className="dropdown dropdown-hover py-2 px-4 mx-2 text-gray-400 transition delay-100 ease-in-out my-auto rounded-md"
            href="/tiers"
          >
            Track Current Tier
            <ul className="dropdown-content menu shadow rounded-md bg-stone-900 w-72 relative z-50">
              {data.map(({ fights }) =>
                fights.map(
                  ({ name: fight, id }) =>
                    id > 4 && (
                      <li key={id} onClick={handleClick}>
                        <Link
                          className="p-2 text-gray-400 hover:bg-gray-700 border-none rounded-md focus:outline-none focus:ring-white focus:ring-1"
                          href={`/raids/${id}`}
                        >
                          <p className="text-gray-400">{fight}</p>
                        </Link>
                      </li>
                    )
                )
              )}
            </ul>
          </label>
          {/* Another dropdown for raids, also populated with data */}
          {/* <label
            tabIndex={0}
            className="py-2 px-4 mx-1 dropdown dropdown-hover text-gray-400 my-auto rounded-md"
            href="/tiers"
          > */}
          <Link
            className="py-2 px-4 mx-2 text-gray-400 transition delay-100 ease-in-out hover:bg-gray-700 rounded-md"
            href="/tiers"
          >
            Raids
          </Link>
          {/* <ul
              tabIndex={0}
              className="dropdown-content z-10 menu shadow rounded-md bg-stone-900 w-56"
            >
              {data.map(({ id, name }) => (
                <li key={id} onClick={handleClick}>
                  <Link
                    className="p-2 text-gray-400 hover:bg-gray-700 border-none rounded-md focus:outline-none focus:ring-white focus:ring-1"
                    href="/tiers"
                  >
                    <p className="text-gray-400">{name}</p>
                  </Link>
                </li>
              ))}
            </ul> */}
          {/* </label> */}
        </div>
        {/* Container for login/logout components, conditionally rendered based on session state */}
        <div className="flex mx-8 text-white">
          <Login />
        </div>
      </div>
    </>
  );
}
