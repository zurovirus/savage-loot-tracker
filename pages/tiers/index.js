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
          <div key={id} className="grid-flow-col">
            <p>{name}</p>
            {fights.map(({ id, name }) => (
              <Link href="/raids/[slug]" as={`/raids/${id}`} className="mx-3">
                {name}
              </Link>
            ))}
          </div>
        ))}
      </div>
    </>
  );
}
