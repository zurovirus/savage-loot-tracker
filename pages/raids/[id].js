import { useRouter } from "next/router";
import { useState, useEffect, useRef } from "react";
import MembersComboBox from "@/components/memberComboBox";
import useFetch from "../useFetch";

export default function RaidDetailsPage() {
  const [loots, setLoots] = useState([]);
  const [weapons, setWeapons] = useState([]);
  const [droppedWeapon, setDroppedWeapon] = useState();
  const [floorName, setFloorName] = useState("");
  const [floorId, setFloorId] = useState();

  const weaponRef = useRef(null);

  const { data, isLoading, id } = useFetch("/api/loot");

  useEffect(() => {
    if (!isLoading && data.length > 0) {
      const filteredWeapons = data.filter((item) => item.id > 20);
      const filteredLoot = data.filter((item) =>
        item.fights.some(
          (fight) => fight.id == id && item.typeId != 1 && item.typeId != 18
        )
      );
      setWeapons(filteredWeapons);
      setLoots(filteredLoot);
    }
  }, [isLoading, data, id]);

  useEffect(() => {
    if (loots.length > 0) {
      setFloorName(loots[0].fights[0].name);
      setFloorId(loots[0].fights[0].floor);
    }
  }),
    [loots];

  const handleComboBoxChange = () => {
    setDroppedWeapon(
      weapons.find((item) => item.id == weaponRef.current.value)
    );
  };

  return (
    <>
      {/* {isLoading && (
        <>
          <div className="h-screen">
            <div className="flex justify-center">
              <p className="text-2xl mx-2">Loading Tracker...</p>
            </div>
          </div>
        </>
      )} */}
      <h1 className=" text-center text-2xl p-6">{floorName}</h1>
      {loots &&
        loots.map(({ name, id, image }) => (
          <div key={id} className="flex justify-center">
            <div className="flex w-96 p-2 my-2">
              <img src={`https://xivapi.com${image}`} />
              <p className="mx-2">{name}</p>
            </div>
            <MembersComboBox />
          </div>
        ))}
      {floorId && floorId == 4 && (
        <>
          {droppedWeapon && (
            <div className="flex justify-center" key={droppedWeapon.id}>
              <div className="flex w-96 p-2 my-2">
                <img src={`https://xivapi.com${droppedWeapon.image}`} />
                <p className="mx-2">{droppedWeapon.name}</p>
              </div>
              <MembersComboBox />
            </div>
          )}
          <div className="text-center">
            <select
              ref={weaponRef}
              className="select select-bordered rounded-md select-sm my-2 text-black"
              onChange={handleComboBoxChange}
            >
              <option hidden value="">
                Select a weapon
              </option>
              {weapons.map(({ name, id }) => (
                <option key={id} value={id}>
                  {name}
                </option>
              ))}
            </select>
          </div>
        </>
      )}
    </>
  );
}
