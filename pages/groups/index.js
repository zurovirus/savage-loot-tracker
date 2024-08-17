import useFetch from "../../hooks/useFetch";
import { useState, useRef, useEffect } from "react";
import GroupCard from "@/components/groupCard";
import AddItem from "@/components/addItem";
import { removeSpecialCharacters } from "@/components/lib/utility";
import Authenticate from "@/components/authenticate";
import { useSession } from "next-auth/react";

// The Group page.
export default function Groups() {
  Authenticate();
  const { data: session } = useSession();
  const { data } = useFetch("/api/group");
  const [groups, setGroups] = useState([]);
  const [isCreating, setIsCreating] = useState(false);
  const [error, setError] = useState(null);
  const groupName = useRef("");

  // Sets the group
  useEffect(() => {
    setGroups(data);
  }, [data]);

  // Handles the toggle event of the add group button.
  const toggleCreate = () => {
    setIsCreating((prevState) => !prevState);
    setError(null);
  };

  // Handles the submit event of the add group button.
  const submitHandler = async () => {
    // Cleans the string of the user input.
    const cleanedName = removeSpecialCharacters(groupName.current.value);

    // Searches if the group name is already existing.
    const nameAvailability = groups.find(
      (group) => group.name === cleanedName.trim()
    );

    // If the group name exists, adds an error message.
    if (nameAvailability) {
      setError("A group with that name already exists");
      groupName.current.focus();
      groupName.current.select();
      return;
    }

    // If the name is empty, adds an error message.
    if (cleanedName.trim().length === 0 && cleanedName.trim() == "") {
      setError("Please enter a valid group name");
      groupName.current.focus();
      groupName.current.select();
      return;
    }

    // Creates the group in the database.
    try {
      const res = await fetch("/api/group/create", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({
          name: cleanedName,
          id: session.user.id,
        }),
      });

      // If the response is successful, adds the group to the list.
      if (res.ok) {
        const group = await res.json();
        setGroups((prevGroups) => [
          ...prevGroups,
          { id: group.id, name: group.name, players: [] },
        ]);
        toggleCreate();
      }
    } catch (error) {
      setError(error.message);
    }
  };

  // The data to be displayed/
  return (
    <>
      <div>
        <h1 className="text-2xl text-center m-4">My Raid Groups</h1>
        <AddItem
          submitHandler={submitHandler}
          dataName={"groups"}
          dataRef={groupName}
          data={groups}
          error={error}
          toggleCreate={toggleCreate}
          isCreating={isCreating}
        />
        <div className="grid grid-cols-3 gap-5 my-6">
          {groups &&
            groups.map(({ name, id }) => (
              <div
                key={id}
                className="my-2 border-2 rounded-xl py-2 px-4 border-stone-900 bg-gradient-to-br from-stone-950  to-slate-800 shadow-lg shadow-zinc-900"
              >
                <GroupCard
                  id={id}
                  name={name}
                  groups={groups}
                  setGroups={setGroups}
                />
              </div>
            ))}
        </div>
      </div>
    </>
  );
}
