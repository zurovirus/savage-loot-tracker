import Link from "next/link";
import { useState, useRef } from "react";
import { TbEdit } from "react-icons/tb";
import { removeSpecialCharacters } from "@/components/lib/utility";

export default function GroupCard({ id, name, groups, setGroups }) {
  const [isEditing, setIsEditing] = useState(false);
  const groupName = useRef();
  const [error, setError] = useState(null);

  const toggleEdit = () => {
    setIsEditing((prevState) => !prevState);
    setError(null);
  };

  async function saveHandler() {
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

    try {
      const res = await fetch("/api/group/update", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({
          name: cleanedName,
          id: id,
        }),
      });

      // If the response is successful, updates the group name.
      if (res.ok) {
        const updatedGroup = await res.json();
        setGroups((prevGroups) =>
          prevGroups.map((group) => {
            if (group.id == updatedGroup.id) {
              return { ...group, name: updatedGroup.name };
            }
            return group;
          })
        );

        toggleEdit();
      }
    } catch (error) {
      setError(error.message);
    }
  }

  async function deleteHandler() {
    const res = await fetch("api/group/delete", {
      method: "DELETE",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({
        id: id,
      }),
    });

    if (res.ok) {
      setGroups((prevGroups) => prevGroups.filter((group) => group.id == id));
    }
  }

  return (
    <>
      {isEditing ? (
        <>
          <div className="flex justify-between">
            <input
              className="px-3 border text-sm rounded-lg text-white border-gray-200 bg-zinc-800 focus:outline-none focus:ring-white focus:ring-1 "
              type="text"
              ref={groupName}
              autoFocus
            />
            <div>
              <button
                className="btn btn-sm mx-2 bg-green-700 hover:bg-green-800 border-none focus:outline-none focus:ring-white focus:ring-1 text-white"
                type="submit"
                onClick={saveHandler}
              >
                Save
              </button>
              <button
                className="btn btn-sm bg-red-700 hover:bg-red-800 border-none focus:outline-none focus:ring-white focus:ring-1 text-white "
                onClick={toggleEdit}
              >
                Cancel
              </button>
            </div>
          </div>
          {error && <label className="text-red-700">{error} </label>}
        </>
      ) : (
        <>
          <Link
            href={`/groups/${id}`}
            className="font-semibold text-xl text-blue-600 hover:text-blue-700"
          >
            {name}
          </Link>
          <button
            className="mx-2 text-yellow-600 hover:text-yellow-700"
            onClick={toggleEdit}
          >
            <TbEdit />
          </button>
        </>
      )}
      <div className="flex justify-end pt-10">
        <button
          className="p-2 text-sm bg-red-800 rounded-lg"
          // onClick={deleteHandler}
        >
          Delete
        </button>
      </div>
    </>
  );
}
