import Link from "next/link";
import useFetch from "@/hooks/useFetch";

export default function Nav() {
  const { data } = useFetch("/api/tiers");

  const handleClick = () => {
    const elem = document.activeElement;
    if (elem) {
      elem?.blur();
    }
  };

  return (
    <>
      <div className="flex justify-between p-4 items-center transition delay-150 ease-in-out bg-stone-950 hover:bg-stone-900 text-lg ">
        <div className="flex items-center ">
          <p className="text-2xl font-bold text-yellow-500 mx-6">
            XIV Savage Loot Tracker
          </p>
          <div className="divider lg:divider-horizontal divider-neutral" />
          <Link
            className="py-2 px-4 mx-2 text-gray-400 transition delay-100 ease-in-out hover:bg-gray-700 rounded-md focus:outline-none focus:ring focus:ring-yellow-400"
            href="/"
          >
            Home
          </Link>
          <Link
            className="py-2 px-4 text-gray-400 transition delay-100 ease-in-out hover:bg-gray-700 rounded-md focus:outline-none focus:ring focus:ring-yellow-400"
            href="/groups"
          >
            My Raid Group
          </Link>
          <label
            tabIndex={0}
            className="dropdown dropdown-hover py-2 px-4 mx-2 text-gray-400 transition delay-100 ease-in-out my-auto rounded-md focus:outline-none focus:ring focus:ring-yellow-400"
            href="/tiers"
          >
            Track Current Tier
            <ul className="dropdown-content menu shadow rounded-md bg-stone-900 w-72 z-10">
              {data.map(({ fights }) =>
                fights.map(({ name: fight, id }) => (
                  <li key={id} onClick={handleClick}>
                    <Link
                      className="p-2 -mx-2 text-gray-400  hover:bg-gray-700 border-none rounded-none focus:outline-none focus:ring focus:ring-yellow-400"
                      href={`/raids/${id}`}
                    >
                      <p className="text-gray-400 ">{fight}</p>
                    </Link>
                  </li>
                ))
              )}
            </ul>
          </label>
          <label
            tabIndex={0}
            className="py-2 px-4  mx-1 dropdown dropdown-hover text-gray-400 my-auto rounded-md focus:outline-none focus:ring focus:ring-yellow-400"
            href="/tiers"
          >
            Raids
            <ul
              tabIndex={0}
              className="dropdown-content z-10 menu shadow rounded-md bg-stone-900 w-56"
            >
              {data.map(({ id, name }) => (
                <li key={id} onClick={handleClick}>
                  <Link
                    className="p-2 -mx-2 text-gray-400  hover:bg-gray-700 border-none rounded-none focus:outline-none focus:ring focus:ring-yellow-400"
                    href="/tiers"
                  >
                    <p className="text-gray-400">{name}</p>
                  </Link>
                </li>
              ))}
            </ul>
          </label>
        </div>
        <div className="flex mx-8 text-white">
          <Link
            className="mx-4 bg-yellow-700 rounded-lg font-semibold p-2 px-4 hover:bg-yellow-800 hover:text-gray-200 focus:outline-none focus:ring focus:ring-yellow-400"
            href="/"
          >
            Log In
          </Link>
          <Link
            className="mx-2 bg-blue-700 rounded-lg font-semibold p-2 px-4 hover:bg-blue-800 hover:text-gray-100 focus:outline-none focus:ring focus:ring-yellow-400"
            href="/"
          >
            Sign Up
          </Link>
        </div>
      </div>
    </>
  );
}
