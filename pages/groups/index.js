import useFetch from "../../hooks/useFetch";
import { useState, useRef, useEffect } from "react";
import Link from "next/link";
import AddItem from "@/components/addItem";
import { removeSpecialCharacters } from "@/components/lib/utility";

export default function Groups() {
  const { data } = useFetch("/api/group");
  const [groups, setGroups] = useState([]);
  const [isCreating, setIsCreating] = useState(false);
  const [error, setError] = useState(null);
  const groupName = useRef("");

  useEffect(() => {
    setGroups(data);
  }, [data]);

  const toggleCreate = () => {
    setIsCreating((prevState) => !prevState);
    setError(null);
  };

  const submitHandler = async () => {
    const cleanedName = removeSpecialCharacters(groupName.current.value);

    const nameAvailability = groups.find(
      (group) => group.name === cleanedName.trim()
    );

    if (nameAvailability) {
      setError("A group with that name already exists");
      groupName.current.focus();
      groupName.current.select();
      return;
    }

    if (cleanedName.trim().length === 0 && cleanedName.trim() == "") {
      setError("Please enter a valid group name");
      groupName.current.focus();
      groupName.current.select();
      return;
    }
    try {
      const res = await fetch("/api/group/create", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({
          name: cleanedName,
        }),
      });

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

  return (
    <>
      <div>
        <h1 className="text-2xl m-2">My groups</h1>
        <AddItem
          submitHandler={submitHandler}
          dataName={"groups"}
          dataRef={groupName}
          data={groups}
          error={error}
          toggleCreate={toggleCreate}
          isCreating={isCreating}
        />
        {groups &&
          groups.map(({ name, id }) => (
            <div key={id}>
              <Link href={`/groups/${id}`} className="mx-6">
                {name}
              </Link>
            </div>
          ))}
      </div>
    </>
  );
}
