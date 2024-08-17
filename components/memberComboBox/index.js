import { useState, useEffect } from "react";

// This component is responsible for displaying the group's members.
export default function MembersComboBox({
  group,
  setSelectedPlayer,
  item,
  type,
}) {
  const [players, setPlayers] = useState([]);

  // Fetches the group's members from the database. Runs when the group data is changed.
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

    // If group is populated, fetch the players.
    if (group) {
      fetchPlayers();
    }
  }, [group]);

  // Handles the change event of the members combo box.
  const changeHandler = (e) => {
    setSelectedPlayer({
      lootId: item,
      typeId: type,
      playerId: parseInt(e.target.value),
    });
  };

  // The players combo box.
  return (
    <>
      {players.length !== 0 ? (
        <div className="flex items-center w-80 my-4">
          <p className="mx-2">Looted by:</p>
          <div className="">
            <select
              onChange={changeHandler}
              className="select select-sm rounded-md w-auto text-black bg-white"
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
