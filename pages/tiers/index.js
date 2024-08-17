import Link from "next/link";
import useFetch from "../../hooks/useFetch";

// Displays the all the raids in the game from patch 6.4 onwards.
export default function Tier() {
  const { data: tiers, isLoading } = useFetch("/api/tiers");

  if (isLoading) {
    return (
      <div className="flex justify-center min-h-screen ">
        <p className="loading loading-spinner loading-lg " />
      </div>
    );
  }

  return (
    <>
      <h1 className="text-center text-3xl p-4">All Raids</h1>
      {tiers.map(({ id, name, fights }) => (
        <div key={id} className="6">
          <p className="text-xl font-bold mb-4">{name}</p>
          <div className="flex">
            {fights.map(({ id, name }) => (
              <div key={id} className="mx-auto pb-5">
                <Link
                  href={`/raids/${id}`}
                  className="text-left p-2 rounded hover:bg-zinc-700"
                >
                  {name}
                </Link>
              </div>
            ))}
          </div>
        </div>
      ))}
    </>
  );
}
