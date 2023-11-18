import useFetch from "../useFetch";
import { useState, useRef, useEffect } from "react";
import Link from "next/link";
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
        setGroups((prevGroups) => [...prevGroups, group]);
        toggleCreate();
      }
    } catch (error) {
      setError(error.message);
    }
  };

  return (
    <>
      {/* {isLoading && (
        <>
          <div className="h-screen">
            <div className="flex justify-center">
              <p className="text-2xl mx-2">Loading Tracker...</p>
            </div>
          </div>
        </>
      )} */}
      <div>
        <h1>Groups</h1>
        {!isCreating && (
          <button className="btn btn-sm" onClick={toggleCreate}>
            Create group
          </button>
        )}
        {isCreating && (
          <div>
            <label className="">Name</label>
            <input
              className="text-black"
              type="text"
              ref={groupName}
              autoFocus
            />
            {error && <label className="m-2 text-red-700">{error} </label>}
            <button
              className="btn btn-sm"
              type="submit"
              onClick={submitHandler}
            >
              Submit
            </button>
            <button className="btn btn-sm" onClick={toggleCreate}>
              Cancel
            </button>
          </div>
        )}
        {groups &&
          groups.map(({ name, id }) => (
            <div key={id}>
              <Link href={`/groups/${id}`}>{name}</Link>
            </div>
          ))}
      </div>
    </>
  );
}
