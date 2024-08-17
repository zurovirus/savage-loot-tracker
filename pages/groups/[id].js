import { useRouter } from "next/router";
import { useState, useRef, useEffect } from "react";
import { removeSpecialCharacters } from "@/components/lib/utility";
import MessageBox from "@/components/messageBox";
import AddItem from "@/components/addItem";
import useFetch from "../../hooks/useFetch";
import DisplayPlayerLoot from "@/components/displayPlayerLoot";
import DisplayNamePlate from "@/components/displayNamePlate";
import { TbTrash } from "react-icons/tb";

// The Group detail page.
export default function GroupDetailsPage() {
  const router = useRouter();
  const { id } = router.query;
  const [groupName, setGroupName] = useState();
  const [players, setPlayers] = useState([]);
  const [classes, setClasses] = useState([]);
  const [isCreating, setIsCreating] = useState(false);
  const [isDeleting, setIsDeleting] = useState(false);
  const [isLoading, setIsLoading] = useState(true);
  const [error, setError] = useState(null);
  const [success, setSuccess] = useState(null);
  const [nameError, setNameError] = useState(null);
  const [classError, setClassError] = useState(null);
  const playerName = useRef("");
  const chosenClass = useRef("");
  const { data } = useFetch(`/api/class`);
  const { data: tierData } = useFetch(`/api/tiers`);

  // Fetches the group and sets the group name and players based on the group id.
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
      setIsLoading(false);
    };

    if (id) {
      fetchPlayers();
    }
  }, [id]);

  // Sets the class data.
  useEffect(() => {
    setClasses(data);
  }, [data]);

  // Handles the toggle event of player creation.
  const toggleCreate = () => {
    setIsCreating((prevState) => !prevState);
    setError(null);
  };

  function toggleDelete() {
    setIsDeleting((prevState) => !prevState);
  }

  function messageHandler() {
    setError(null);
    setSuccess(null);
  }

  // Creates a player
  const submitHandler = async () => {
    // Cleans the name, to prevent SQL injection.
    const cleanedName = removeSpecialCharacters(playerName.current.value);

    console.log(chosenClass.current.value);
    // Checks if the cleaned name is not empty.
    if (cleanedName.trim().length === 0 && cleanedName.trim() == "") {
      setNameError("Please enter a valid player name");
      playerName.current.focus();
      playerName.current.select();
      return;
    }

    if (chosenClass.current.value === "") {
      setClassError("Please select a class");
      chosenClass.current.focus();
      return;
    }
    // Updates the database.
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

      // If response was successful, adds the player to the group and toggles the create button.
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
        setSuccess(`Player ${player.name} has been added to the group`);
      } else {
        setError("Something went wrong, please try again.");
      }
    } catch (error) {
      setError(error.message);
    }
  };

  // Main container for the component's UI
  return (
    <>
      {isLoading ? (
        <p>Loading page...</p>
      ) : (
        <div>
          <MessageBox
            errorMessage={error}
            successMessage={success}
            messageHandler={messageHandler}
          />
          {/* Heading displaying the name of the raid group */}
          <h1 className="text-center text-2xl m-4">Raid Group {groupName}</h1>
          {/* Conditional rendering to show a class selection dropdown if `classes` data is available and creation mode is enabled */}
          {classes && isCreating && (
            <div className="flex items-center mx-6 my-4">
              <label className="text-lg">Class:</label>
              <select
                ref={chosenClass} // Using a ref to directly access DOM node
                className="select select-bordered border-white rounded-lg w-auto select-sm mx-8 bg-zinc-800 focus:outline-none focus:ring focus:ring-yellow-400"
              >
                <option hidden value="">
                  Select a class
                </option>
                {/* Mapping through `classes` array to render options dynamically */}
                {classes.map(({ id, name }) => (
                  <option key={id} value={id}>
                    {name}
                  </option>
                ))}
              </select>
              {classError && (
                <label className="text-red-700">{classError} </label>
              )}
            </div>
          )}

          {/* AddItem component for adding new players, passed with various props for handling submission, toggling creation mode, etc. */}
          {players && players.length < 8 && (
            <AddItem
              submitHandler={submitHandler}
              dataName={"players"}
              dataRef={playerName}
              error={nameError}
              toggleCreate={toggleCreate}
              isCreating={isCreating}
            />
          )}

          {/* Container for displaying players with dynamic content based on `players` array length */}
          <div key={id} tabIndex={0} className="collapse my-4 z-10">
            <div className="collapse-title text-xl font-bold text-yellow-500">
              Players
            </div>
            <input type="checkbox" defaultChecked />
            <div className="collapse-content">
              <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-4 mx-2">
                {/* Conditional rendering to display players if available or a placeholder message */}
                {players.length > 0 ? (
                  players.map(({ name, id, classId }) => (
                    <div key={id}>
                      <DisplayNamePlate
                        name={name}
                        classes={classes}
                        classId={classId}
                        id={id}
                        isDeleting={isDeleting}
                        setPlayers={setPlayers}
                      />
                    </div>
                  ))
                ) : (
                  <p>Empty in here...</p>
                )}
              </div>
              <div className="text-right">
                <button
                  className="m-2 p-2 bg-red-800 hover:bg-red-900 rounded-md text-xl text-black border-yellow-600 hover:border-yellow-700 border-2"
                  onClick={toggleDelete}
                >
                  <TbTrash />
                </button>
              </div>
            </div>
          </div>

          {/* Mapping through `tierData` to render information about each tier including its fights */}
          {tierData.map(({ id, name, fights }) => (
            <div key={id} tabIndex={0} className="collapse my-4 z-5">
              <div className="collapse-title text-xl font-bold text-yellow-500">
                {name}
              </div>
              <input type="checkbox" />
              <div className="collapse-content">
                {/* Mapping through each fight in the tier to display details */}
                {fights.map((fight) => (
                  <div key={fight.id} tabIndex={0} className="collapse my-4">
                    <input type="radio" name="my-accordion-1" />
                    <div className="collapse-title text-lg font-semibold text-purple-500">
                      {/* Background image with fight details, demonstrating inline styling for background images */}
                      <div
                        className="py-4 ml-2 -mr-6 flex justify-between items-center bg-right bg-no-repeat rounded-lg"
                        style={{
                          backgroundImage: `url('https://xivapi.com/${fight.image}')`,
                        }}
                      >
                        {fight.name}
                      </div>
                    </div>

                    <div className="collapse-content">
                      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-4 mx-2">
                        {/* Mapping through players to display their names, classes, and loots related to the fight */}
                        {players.map(({ name, id, classId, playerloots }) => (
                          <div key={id} className="col-span-1">
                            <DisplayNamePlate
                              name={name}
                              classes={classes}
                              classId={classId}
                              id={id}
                            />
                            {/* Component to display loot specific to this player and fight */}
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
      )}
    </>
  );
}
