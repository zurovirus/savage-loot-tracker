import { useRouter } from "next/router";
import { useState, useRef, useEffect } from "react";
import Link from "next/link";
import AddItem from "@/components/addItem";
import {
  removeSpecialCharacters,
  classColorText,
} from "@/components/lib/utility";
import useFetch from "../../hooks/useFetch";
import { formatDistanceToNow, format } from "date-fns";

export default function GroupDetailsPage() {
  const router = useRouter();
  const { id } = router.query;
  const [players, setPlayers] = useState([]);
  const [classes, setClasses] = useState([]);
  const [isCreating, setIsCreating] = useState(false);
  const [error, setError] = useState(null);
  const [uniqueDates, setUniqueDates] = useState([]);
  const playerName = useRef("");
  const chosenClass = useRef("");
  const { data } = useFetch(`/api/class`);
  const { data: tierData } = useFetch(`/api/tiers`);

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
      players.map((player) => {
        player.playerloots.map((loot) => {});
      });
    };

    if (id) {
      fetchPlayers();
    }
  }, [id]);

  useEffect(() => {
    setClasses(data);
  }, [data]);

  function groupLootByDate(data) {
    const lootByDate = {};

    data.forEach((item) => {
      const date = item.date;
      if (!lootByDate[date]) {
        lootByDate[date] = [];
      }
      lootByDate[date].push(item);
    });

    return lootByDate;
  }

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

  function groupLootByDate(data) {
    const lootByDate = {};

    data.forEach((item) => {
      const date = item.date;
      if (!lootByDate[date]) {
        lootByDate[date] = [];
      }
      lootByDate[date].push(item);
    });

    return lootByDate;
  }

  // ... (other code)

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
          error={error}
          toggleCreate={toggleCreate}
          isCreating={isCreating}
        />
      </div>
      {tierData.map(({ id, name, fights }) => (
        <div key={id} tabIndex={0} className="collapse my-4 z-5">
          <div className="collapse-title text-xl font-bold">{name}</div>
          <input type="checkbox" />
          <div className="collapse-content">
            {fights.map((fight) => (
              <div key={fight.id} tabIndex={0} className="collapse my-4">
                <input type="radio" name="my-accordion-1" />
                <div className="collapse-title text-lg font-semibold">
                  {fight.name}
                </div>
                <div className="collapse-content">
                  <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-4 mx-2">
                    {players.map(({ name, id, classId, playerloots }) => (
                      <div key={id} className="col-span-1">
                        <Link href={`/${name}/${id}`}>
                          <div
                            className={`mx-auto text-center my-2 font-semibold rounded-md p-2 ${classColorText(
                              classId
                            )}`}
                          >
                            <p className="text-lg">{name}</p>
                            {classes.map((classItem) => (
                              <div key={classItem.id}>
                                {classItem.id === classId && (
                                  <p className="mx-2">{classItem.name}</p>
                                )}
                              </div>
                            ))}
                          </div>
                        </Link>
                        {Object.keys(
                          groupLootByDate(
                            playerloots.filter(
                              (loot) => loot.loot.fights[0].id === fight.id
                            )
                          )
                        ).map((date) => (
                          <div key={date}>
                            <p className="mx-4 text-amber-400">{`Looted ${formatDistanceToNow(
                              new Date(date)
                            )} ago`}</p>
                            {groupLootByDate(
                              playerloots.filter(
                                (loot) => loot.loot.fights[0].id === fight.id
                              )
                            )[date].map(({ id, loot, date }) => (
                              <div key={id} className="flex mx-6 my-2">
                                <img
                                  src={`https://xivapi.com${loot.image}`}
                                  alt={loot.name}
                                  className="object-none"
                                />
                                <p className="mx-2">{loot.name}</p>
                              </div>
                            ))}
                          </div>
                        ))}
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
