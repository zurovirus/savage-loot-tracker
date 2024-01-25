import { useRouter } from "next/router";
import { useState, useRef, useEffect } from "react";
import { removeSpecialCharacters } from "@/components/lib/utility";
import AddItem from "@/components/addItem";
import useFetch from "../../hooks/useFetch";
import DisplayPlayerLoot from "@/components/displayPlayerLoot";
import DisplayNamePlate from "@/components/displayNamePlate";

export default function GroupDetailsPage() {
  const router = useRouter();
  const { id } = router.query;
  const [groupName, setGroupName] = useState();
  const [players, setPlayers] = useState([]);
  const [classes, setClasses] = useState([]);
  const [isCreating, setIsCreating] = useState(false);
  const [error, setError] = useState(null);
  const playerName = useRef("");
  const chosenClass = useRef("");
  const { data } = useFetch(`/api/class`);
  const { data: tierData } = useFetch(`/api/tiers`);

  useEffect(() => {
    const fetchPlayers = async () => {
      const data = await fetch(`/api/group/${id}`, {
        method: "GET",
        credentials: "include",
        headers: {
          "Content-Type": "application/json",
        },
      });
      const result = await data.json();
      setGroupName(result.name);
      setPlayers(result.players);
    };

    if (id) {
      fetchPlayers();
    }
  }, [id]);

  useEffect(() => {
    setClasses(data);
  }, [data]);

  const toggleCreate = () => {
    setIsCreating((prevState) => !prevState);
    setError(null);
  };

  const submitHandler = async () => {
    const cleanedName = removeSpecialCharacters(playerName.current.value);

    if (cleanedName.trim().length === 0 && cleanedName.trim() == "") {
      setError("Please enter a valid player name");
      playerName.current.focus();
      playerName.current.select();
      return;
    }
    try {
      const res = await fetch("/api/player/create", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({
          name: cleanedName,
          groupId: id,
          classId: chosenClass.current.value,
        }),
      });

      if (res.ok) {
        const player = await res.json();
        setPlayers((prevPlayers) => [
          ...prevPlayers,
          {
            id: player.id,
            name: player.name,
            classId: player.classId,
            playerloots: [],
          },
        ]);
        toggleCreate();
      }
    } catch (error) {
      setError(error.message);
    }
  };

  return (
    <div>
      <h1 className="text-center text-2xl m-2 mb-4">Raid Group {groupName}</h1>
      {classes && isCreating && (
        <div className="flex items-center mx-6 my-4">
          <label className="text-lg">Class:</label>
          <select
            ref={chosenClass}
            className="select select-bordered border-white rounded-lg w-auto select-sm mx-8 bg-zinc-800 focus:outline-none focus:ring focus:ring-yellow-400"
          >
            <option hidden value="">
              Select a class
            </option>
            {classes.map(({ id, name }) => (
              <option key={id} value={id}>
                {name}
              </option>
            ))}
          </select>
        </div>
      )}
      <AddItem
        submitHandler={submitHandler}
        dataName={"players"}
        dataRef={playerName}
        error={error}
        toggleCreate={toggleCreate}
        isCreating={isCreating}
      />
      <div key={id} tabIndex={0} className="collapse my-4 z-10">
        <div className="collapse-title text-xl font-bold text-yellow-500">
          Players
        </div>
        <input type="checkbox" defaultChecked={players.length != 8} />
        <div className="collapse-content">
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-4 mx-2">
            {players.length > 0 ? (
              players.map(({ name, id, classId }) => (
                <DisplayNamePlate
                  name={name}
                  classes={classes}
                  classId={classId}
                  id={id}
                />
              ))
            ) : (
              <p>Empty in here...</p>
            )}
          </div>
        </div>
      </div>
      {tierData.map(({ id, name, fights }) => (
        <div key={id} tabIndex={0} className="collapse my-4 z-5">
          <div className="collapse-title text-xl font-bold text-yellow-500">
            {name}
          </div>
          <input type="checkbox" />
          <div className="collapse-content">
            {fights.map((fight) => (
              <div key={fight.id} tabIndex={0} className="collapse my-4">
                <input type="radio" name="my-accordion-1" />
                <div className="collapse-title text-lg font-semibold text-purple-500">
                  {fight.name}
                </div>
                <div className="collapse-content">
                  <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-4 mx-2">
                    {players.map(({ name, id, classId, playerloots }) => (
                      <div key={id} className="col-span-1">
                        <DisplayNamePlate
                          name={name}
                          classes={classes}
                          classId={classId}
                          id={id}
                        />
                        <DisplayPlayerLoot
                          playerloots={playerloots}
                          fightId={fight.id}
                        />
                      </div>
                    ))}
                  </div>
                </div>
              </div>
            ))}
          </div>
        </div>
      ))}
    </div>
  );
}
