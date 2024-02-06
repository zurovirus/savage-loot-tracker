import { useState, useEffect, useRef } from "react";
import MembersComboBox from "@/components/memberComboBox";
import GroupComboBox from "@/components/groupComboBox";
import useFetch from "../../hooks/useFetch";
import { useSession } from "next-auth/react";
import Image from "next/image";

// The Raid Details Page.
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
  const { data: session } = useSession();

  // If the page is loading and the data is empty, does nothing, otherwise filters the loot and weapons by fights. Filters out books drops.
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

  // Sets the floor id and the floor name.
  useEffect(() => {
    if (loots.length > 0) {
      setFloorName(loots[0].fights[0].name);
      setFloorId(loots[0].fights[0].floor);
    }
  }, [loots]);

  // Handles the change event of the weapon combo box to display the chosen weapon.
  const handleWeaponBoxChange = () => {
    setDroppedWeapon(
      weapons.find((item) => item.id == weaponRef.current.value)
    );

    // Swaps the weapon out when the user selects item in the combo box.
    if (droppedWeapon) {
      setPlayerLoot((prevItems) => {
        const updatedPlayerLoot = prevItems.filter(
          (loot) => loot.typeId !== droppedWeapon.typeId
        );
        return updatedPlayerLoot;
      });
    }
  };

  // Handles the change event of the player combo box.
  const handleSelectedPlayerChanged = (player) => {
    updatePlayerLoot(player);
  };

  // Handles the change event of the group combo box.
  const handleGroupChange = (value) => {
    setSelectedGroup(value);
  };

  // Handles the display of the status message.
  function messageHandler() {
    setSuccessMessage(null);
    setErrorMessage(null);
  }

  // Updates the player loot to be sent to the database.
  const updatePlayerLoot = (item) => {
    setPlayerLoot((prevItems) => {
      const updatedPlayerLoot = prevItems.map((loot) => {
        if (loot.typeId === item.typeId) {
          // Update the playerId for the matching item
          return { ...loot, lootId: item.lootId, playerId: item.playerId };
        }
        return loot;
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

  // Handles the update of the player's loot in the database.
  const handleUpdate = async () => {
    // Modfies the player loot data to be sent.
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
      {/* Displays the message of whether or not the player loot has been updated or if an error has occurred. */}
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
      {/* If there is no session display a message */}
      {!session && (
        <div className="flex justify-center items-center my-4 -mb-4">
          <div class="chat chat-end">
            <div className="chat-bubble text-white font-semibold w-96 text-center">
              Sign in with Discord to track your loot!
            </div>
          </div>
          <Image
            src="/homepage/TalkingZuro.png"
            alt="Talking Zuro"
            width={150}
            height={75}
            className="rounded-full mx-2"
          />
        </div>
      )}
      <h1 className="text-center text-2xl p-4">{floorName}</h1>
      {/* The group combo box */}
      <GroupComboBox onSelectChange={handleGroupChange} />
      {/* Maps through the loot and adds a combo box to select a player to associate the loot with. */}
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
      {/* If the fight is the 4th fight of the tier, adds the weapon box */}
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
      {/* Allows the player to update the loot if a player was selected to be associated. */}
      {playerLoot.length > 0 && (
        <button
          onClick={handleUpdate}
          className="flex mx-auto font-bold px-4 py-2 my-4 text-black bg-yellow-600 hover:bg-yellow-700 hover:px-3 rounded-lg"
        >
          Update Loot
        </button>
      )}
    </>
  );
}
