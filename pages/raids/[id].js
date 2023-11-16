import { useRouter } from "next/router";
import { useState, useEffect } from "react";

export default function RaidDetailsPage() {
  const [loots, setLoots] = useState([]);
  const [weapons, setWeapons] = useState([]);
  const [isLoading, setIsLoading] = useState(true);
  const router = useRouter();
  const { id } = router.query;

  useEffect(() => {
    if (router.isReady) {
      const { media } = router.query;
      if (!id) return null;
      getLoot();
    }
  }, [router.isReady]);

  async function getLoot() {
    const response = await fetch(`/api/loot`, {
      method: "GET",
      headers: {
        "Content-Type": "application/json",
      },
    });
    const lootData = await response.json();
    const filteredWeapons = lootData.filter((item) => item.id > 20);
    filteredWeapons && setWeapons(filteredWeapons);
    const filteredLoot = lootData.filter((item) =>
      item.fights.some(
        (fight) => fight.id == id && item.typeId != 1 && item.typeId != 18
      )
    );

    setLoots(filteredLoot);
    setIsLoading(false);
  }

  if (isLoading) {
    return (
      <>
        <div className="h-screen">
          <div className="flex justify-center p-4">
            <p className="text-2xl mx-2 my-5">Loading Raid Details...</p>
          </div>
        </div>
      </>
    );
  }
  return (
    <div className="h-screen">
      <h1 className=" text-center text-2xl">Raid Details</h1>
      {loots.map(({ name, id }) => (
        <>
          <p>{name}</p>
          <label className="">Select a raid member</label>
          <select className="select select-bordered select-lg my-2 bg-white">
            <option value="0">Zuro</option>
            <option value="1">Berry</option>
            <option value="2">Huey</option>
          </select>
        </>
      ))}
      {weapons && (
        <div>
          <label className="">Weapon Drop: </label>
          <select className="select select-bordered select-lg my-2 bg-white">
            {weapons.map(({ name, id }) => (
              <option value={id}>{name}</option>
            ))}
          </select>
          <br></br>
          <label className="">Select a raid member</label>
          <select className="select select-bordered select-lg my-2 bg-white">
            <option value="0">Zuro</option>
            <option value="1">Berry</option>
            <option value="2">Huey</option>
          </select>
        </div>
      )}
    </div>
  );
}
