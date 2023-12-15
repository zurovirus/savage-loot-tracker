import { useRouter } from "next/router";
import { useState, useRef, useEffect } from "react";
import AddItem from "@/components/addItem";
import { removeSpecialCharacters } from "@/components/lib/utility";
import useFetch from "../useFetch";

export default function GroupDetailsPage() {
  const router = useRouter();
  const { id } = router.query;
  const [players, setPlayers] = useState([]);
  const [classes, setClasses] = useState([]);
  const [isCreating, setIsCreating] = useState(false);
  const [error, setError] = useState(null);
  const playerName = useRef("");
  const chosenClass = useRef("");
  const { data } = useFetch(`/api/class`);

  useEffect(() => {
    const fetchPlayers = async () => {
      const data = await fetch(`/api/group/${id}`, {
        method: "GET",
        headers: {
          "Content-Type": "application/json",
        },
      });
      const result = await data.json();
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
        setPlayers((prevPlayers) => [...prevPlayers, player]);
        toggleCreate();
      }
    } catch (error) {
      setError(error.message);
    }
  };

  return (
    <div>
      <h1>Group Details</h1>
      <div className="flex items-center">
        {classes && isCreating && (
          <div>
            <label>Class</label>
            <select
              ref={chosenClass}
              className="select select-bordered rounded-md w-auto select-sm text-black"
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
          data={players}
          error={error}
          toggleCreate={toggleCreate}
          isCreating={isCreating}
        />
      </div>
    </div>
  );
}
