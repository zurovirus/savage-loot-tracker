import { useState, useEffect } from "react";
export default function MembersComboBox() {
  const [players, setPlayers] = useState([]);

  const testPlayers = [
    { name: "Zuro", id: 1 },
    { name: "Berry", id: 2 },
    { name: "Huey", id: 3 },
  ];
  useEffect(() => {
    setPlayers(testPlayers);
  }, []);

  return (
    <>
      <div className="flex items-center w-80 my-4">
        <p className="mx-2">Select a raid member:</p>
        <div className="">
          <select className="select select-sm rounded-md w-auto text-black">
            {players.map(({ name, id }) => (
              <option key={id} value={id}>
                {name}
              </option>
            ))}
          </select>
        </div>
      </div>
    </>
  );
}
