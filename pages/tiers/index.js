import { useState, useEffect } from "react";
import Link from "next/link";

export default function Tier() {
  const [tiers, setTiers] = useState([]);
  const [isLoading, setIsLoading] = useState(true);

  useEffect(() => {
    async function getTier() {
      const response = await fetch("/api/tiers", {
        method: "GET",
        headers: {
          "Content-Type": "application/json",
        },
      });
      const tierData = await response.json();
      setTiers(tierData);
      setIsLoading(false);
    }

    getTier();
  }, []);

  console.log(tiers);
  if (isLoading) {
    return (
      <>
        <div className="h-screen">
          <div className="flex justify-center p-4">
            <p className="text-2xl mx-2 my-5">Loading Raid Tiers...</p>
          </div>
        </div>
      </>
    );
  }

  return (
    <>
      <h1 className="text-center text-2xl">Raid Tiers</h1>
      <div className="h-screen">
        {tiers.map(({ id, name, fights }) => (
          <div key={id} className="mb-4">
            <p className="text-lg font-bold mb-2">{name}</p>
            <div className="grid grid-cols-2 gap-4">
              {fights.map(({ id, name }) => (
                <Link
                  key={id}
                  href="/raids/[slug]"
                  as={`/raids/${id}`}
                  className="p-2 border rounded hover:bg-gray-100"
                >
                  {name}
                </Link>
              ))}
            </div>
          </div>
        ))}
      </div>
    </>
  );
}
