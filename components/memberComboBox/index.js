import { useState, useEffect } from "react";
import { useRouter } from "next/router";

export default function MembersComboBox({
  group,
  setSelectedPlayer,
  item,
  type,
}) {
  const [players, setPlayers] = useState([]);

  useEffect(() => {
    const fetchPlayers = async () => {
      const data = await fetch(`/api/group/${group}`, {
        method: "GET",
        headers: {
          "Content-Type": "application/json",
        },
      });
      const result = await data.json();
      setPlayers(result.players);
    };

    if (group) {
      fetchPlayers();
    }
  }, [group]);

  const changeHandler = (e) => {
    setSelectedPlayer({
      lootId: item,
      typeId: type,
      playerId: parseInt(e.target.value),
    });
  };

  return (
    <>
      {players.length !== 0 ? (
        <div className="flex items-center w-80 my-4">
          <p className="mx-2">Loot Winner:</p>
          <div className="">
            <select
              onChange={changeHandler}
              className="select select-sm rounded-md w-auto text-black"
            >
              <option hidden value="">
                Select a player
              </option>
              {players.map(({ name, id }) => (
                <option key={id} value={id}>
                  {name}
                </option>
              ))}
            </select>
          </div>
        </div>
      ) : (
        <></>
      )}
    </>
  );
}
