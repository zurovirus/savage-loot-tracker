import { useRouter } from "next/router";
import { useState, useEffect, useRef } from "react";
import MembersComboBox from "@/components/memberComboBox";

export default function RaidDetailsPage() {
  const [loots, setLoots] = useState([]);
  const [weapons, setWeapons] = useState([]);
  const [droppedWeapon, setDroppedWeapon] = useState();
  const [isLoading, setIsLoading] = useState(true);
  const router = useRouter();
  const { id } = router.query;
  const weaponRef = useRef(null);

  useEffect(() => {
    if (router.isReady) {
      if (!id) return null;
      setWeapons([]);
      getLoot();
    }
  }, [router.isReady]);

  const handleComboBoxChange = () => {
    setDroppedWeapon(
      weapons.find((item) => item.id == weaponRef.current.value)
    );
    console.log(droppedWeapon);
  };
  async function getLoot() {
    const response = await fetch(`/api/loot`, {
      method: "GET",
      headers: {
        "Content-Type": "application/json",
      },
    });

    const lootData = await response.json();
    const filteredWeapons = lootData.filter((item) => item.id > 20);
    const filteredLoot = lootData.filter((item) =>
      item.fights.some(
        (fight) => fight.id == id && item.typeId != 1 && item.typeId != 18
      )
    );

    setWeapons(filteredWeapons);
    setLoots(filteredLoot);
    setIsLoading(false);
  }

  return (
    <div className="h-screen">
      {isLoading && (
        <>
          <div className="h-screen">
            <div className="flex justify-center">
              <p className="text-2xl mx-2">Loading Tracker...</p>
            </div>
          </div>
        </>
      )}
      <h1 className=" text-center text-2xl">
        {!isLoading && loots[0].fights[0].name}
      </h1>
      {loots &&
        loots.map(({ name, id, image }) => (
          <>
            <div className="flex justify-around">
              <div className="flex w-80 p-2 my-2">
                <img src={`https://xivapi.com${image}`} />
                <p className="mx-2">{name}</p>
              </div>
              <MembersComboBox />
            </div>
          </>
        ))}
      {!isLoading && weapons && loots[0].fights[0].floor === 4 && (
        <>
          {droppedWeapon && (
            <div className="flex justify-around">
              <div className="flex w-80 p-2 my-2">
                <img src={`https://xivapi.com${droppedWeapon.image}`} />
                <p className="mx-2">{droppedWeapon.name}</p>
              </div>
              <MembersComboBox />
            </div>
          )}
          <div className="text-center">
            <select
              ref={weaponRef}
              className="select select-bordered rounded-md select-lg my-2 bg-white"
              onChange={handleComboBoxChange}
            >
              <option hidden value="">
                Select a weapon
              </option>
              {weapons.map(({ name, id }) => (
                <option value={id}>{name}</option>
              ))}
            </select>
          </div>
        </>
      )}
    </div>
  );
}
