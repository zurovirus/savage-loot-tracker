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
      <div className="flex justify-evenly border border-x-transparent border-y-white-950 transition delay-150 ease-in-out bg-stone-950 hover:bg-stone-900  text-white">
        <Link
          className="flex items-center btn-sm text-gray-400 transition delay-100 ease-in-out hover:bg-gray-700 rounded-md "
          href="/"
        >
          Home
        </Link>
        <Link
          className="flex items-center btn-sm text-gray-400 transition delay-100 ease-in-out hover:bg-gray-700 rounded-md "
          href="/groups"
        >
          My Raid Group
        </Link>
        <label
          className="dropdown dropdown-hover  text-gray-400 transition delay-100 ease-in-out my-auto rounded-md"
          href="/tiers"
        >
          Track Current Tier
          <ul className="dropdown-content z-[1] menu -ml-1 shadow rounded-md bg-stone-900 w-72">
            {data.map(({ fights }) =>
              fights.map(({ name: fight, id }) => (
                <li key={id} onClick={handleClick}>
                  <Link
                    className="p-2 -mx-2 text-gray-400 hover:text-gray-400 hover:bg-gray-700 border-none rounded-none"
                    href={`/raids/${id}`}
                  >
                    {fight}
                  </Link>
                </li>
              ))
            )}
          </ul>
        </label>
        <label
          tabIndex={0}
          className="dropdown dropdown-hover text-gray-400 my-auto rounded-md"
          href="/tiers"
        >
          Raids
          <ul
            tabIndex={0}
            className="dropdown-content z-[1] menu -ml-1 shadow rounded-md bg-stone-900 w-56"
          >
            {data.map(({ id, name }) => (
              <li key={id} onClick={handleClick}>
                <Link
                  className="p-2 -mx-2 text-gray-400 hover:text-gray-400 hover:bg-gray-700 border-none rounded-none"
                  href="/tiers"
                >
                  {name}
                </Link>
              </li>
            ))}
          </ul>
        </label>
      </div>
    </>
  );
}
