import { useState, useEffect, useRef } from "react";
import MembersComboBox from "@/components/memberComboBox";
import GroupComboBox from "@/components/groupComboBox";
import useFetch from "../../hooks/useFetch";
import Link from "next/link";

export default function RaidDetailsPage() {
  const [loots, setLoots] = useState([]);
  const [weapons, setWeapons] = useState([]);
  const [droppedWeapon, setDroppedWeapon] = useState();
  const [floorName, setFloorName] = useState("");
  const [floorId, setFloorId] = useState();
  const [selectedGroup, setSelectedGroup] = useState();
  const [playerLoot, setPlayerLoot] = useState([]);
  const [successMessage, setSuccessMessage] = useState();
  const [errorMessage, setErrorMessage] = useState();
  const weaponRef = useRef(null);
  const { data, isLoading, id } = useFetch("/api/loot");

  useEffect(() => {
    if (!isLoading && data.length > 0) {
      const filteredWeapons = data.filter((item) => item.typeId === 18);
      const filteredLoot = data.filter((item) =>
        item.fights.some(
          (fight) => fight.id == id && item.typeId != 1 && item.typeId != 18
        )
      );
      setWeapons(filteredWeapons);
      setLoots(filteredLoot);
      messageHandler();
      setPlayerLoot([]);
    }
  }, [isLoading, data, id]);

  useEffect(() => {
    if (loots.length > 0) {
      setFloorName(loots[0].fights[0].name);
      setFloorId(loots[0].fights[0].floor);
    }
  }, [loots]);

  const handleWeaponBoxChange = () => {
    setDroppedWeapon(
      weapons.find((item) => item.id == weaponRef.current.value)
    );

    if (droppedWeapon) {
      setPlayerLoot((prevItems) => {
        const updatedPlayerLoot = prevItems.filter(
          (loot) => loot.typeId !== droppedWeapon.typeId
        );
        return updatedPlayerLoot;
      });
    }
  };

  const handleSelectedPlayerChanged = (player) => {
    updatePlayerLoot(player);
  };

  const handleGroupChange = (value) => {
    setSelectedGroup(value);
  };

  function messageHandler() {
    setSuccessMessage(null);
    setErrorMessage(null);
  }

  const updatePlayerLoot = (item) => {
    setPlayerLoot((prevItems) => {
      const updatedPlayerLoot = prevItems.map((loot) => {
        if (loot.typeId === item.typeId) {
          // Update the playerId for the matching item
          return { ...loot, lootId: item.lootId, playerId: item.playerId };
        }
        return loot; // Leave other items unchanged
      });

      // If the item was not found, add a new entry
      if (
        !updatedPlayerLoot.some((loot) => loot.lootId === parseInt(item.lootId))
      ) {
        updatedPlayerLoot.push({
          lootId: item.lootId,
          typeId: item.typeId,
          playerId: item.playerId,
        });
      }

      return updatedPlayerLoot;
    });
  };

  const handleUpdate = async () => {
    const dataToSend = playerLoot.map((loot) => {
      return { lootId: loot.lootId, playerId: loot.playerId };
    });

    const response = await fetch("/api/playerLoot/create", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify(dataToSend),
    });

    if (response.ok) {
      setSuccessMessage("Loot has been added successfully");
    } else {
      setErrorMessage("An error has occurred adding loot");
    }
  };

  return (
    <>
      {successMessage && (
        <>
          <div className="flex justify-between font-semibold mb-4 items-center bg-green-600 rounded-lg">
            <p className="mx-auto">{successMessage}</p>
            <button
              onClick={messageHandler}
              className="mx-3 font-bold -mt-1 text-center hover:text-black hover:font-bold"
            >
              x
            </button>
          </div>
        </>
      )}
      {errorMessage && (
        <>
          <div className="flex justify-between font-semibold mb-4 items-center bg-red-600 rounded-lg">
            <p className="mx-auto">{errorMessage}</p>
            <button
              onClick={messageHandler}
              className="mx-3 font-bold -mt-1 text-center hover:text-black hover:font-bold"
            >
              x
            </button>
          </div>
        </>
      )}
      <h1 className=" text-center text-2xl p-6">{floorName}</h1>
      <GroupComboBox onSelectChange={handleGroupChange} />
      {loots &&
        loots.map(({ name, id, image, typeId }) => (
          <div key={id} className="flex justify-center">
            <div className="flex w-96 p-2 my-2">
              <img src={`https://xivapi.com${image}`} />
              <p className="mx-2">{name}</p>
            </div>
            <MembersComboBox
              group={selectedGroup}
              setSelectedPlayer={handleSelectedPlayerChanged}
              item={id}
              type={typeId}
            />
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
              <MembersComboBox
                group={selectedGroup}
                setSelectedPlayer={handleSelectedPlayerChanged}
                item={droppedWeapon.id}
                type={droppedWeapon.typeId}
              />
            </div>
          )}
          <div className="text-center">
            <select
              ref={weaponRef}
              className="select select-bordered rounded-md select-sm my-2 text-black"
              onChange={handleWeaponBoxChange}
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
      {playerLoot.length > 0 && (
        <button
          onClick={handleUpdate}
          className="flex mx-auto font-bold px-4 py-2 my-4 bg-yellow-600 hover:bg-yellow-700 hover:px-3 rounded-lg"
        >
          Update Loot
        </button>
      )}
    </>
  );
}
