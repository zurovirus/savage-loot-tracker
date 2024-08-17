import Link from "next/link";
import { useState, useRef } from "react";
import { TbEdit, TbTrash } from "react-icons/tb";
import { removeSpecialCharacters } from "@/components/lib/utility";
import Swal from "sweetalert2/dist/sweetalert2.js";
import "@sweetalert2/theme-dark/dark.css";

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
    const result = await Swal.fire({
      title: `Delete raid group ${name}?`,
      background: "#0c0a09",
      color: "#FFFFFF",
      text: "All associated data will be deleted",
      icon: "warning",
      iconColor: "#991b1b",
      showCancelButton: true,
      cancelButtonColor: "#991b1b",
      cancelButtonText: "No",
      confirmButtonText: "Yes",
      confirmButtonColor: "#15803d",
      theme: "dark",
    });

    if (result.isConfirmed) {
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
        setGroups((prevGroups) => prevGroups.filter((group) => group.id != id));

        Swal.fire({
          title: "Deleted!",
          background: "#0c0a09",
          color: "#FFFFFF",
          text: "The raid group has been deleted.",
          icon: "success",
          iconColor: "#15803d",
          confirmButtonColor: "#ca8a04",
        });
      } else {
        Swal.fire({
          title: "Error!",
          background: "#0c0a09",
          color: "#FFFFFF",
          text: "There was a problem deleting the raid group.",
          icon: "error",
          iconColor: "#991b1b",
          confirmButtonColor: "#ca8a04",
        });
      }
    }
  }

  return (
    <>
      <Link href={`/groups/${id}`} className="font-semibold text-xl">
        <div
          key={id}
          className="my-2 border-2 rounded-xl py-2 px-4 border-slate-900 bg-gradient-to-br from-stone-950 to-slate-800 shadow-lg shadow-zinc-900"
        >
          {isEditing ? (
            <>
              <div className="flex justify-between">
                <input
                  className="px-3 border text-sm rounded-lg text-white border-gray-200 bg-zinc-800 focus:outline-none focus:ring-white focus:ring-1"
                  type="text"
                  ref={groupName}
                  autoFocus
                />
                <div>
                  <button
                    className="btn btn-sm mx-2 bg-green-700 hover:bg-green-800 border-none focus:outline-none focus:ring-white focus:ring-1 text-white"
                    type="submit"
                    onClick={(e) => {
                      e.preventDefault();
                      saveHandler();
                    }}
                  >
                    Save
                  </button>
                  <button
                    className="btn btn-sm bg-red-700 hover:bg-red-800 border-none focus:outline-none focus:ring-white focus:ring-1 text-white"
                    onClick={(e) => {
                      e.preventDefault();
                      toggleEdit();
                    }}
                  >
                    Cancel
                  </button>
                </div>
              </div>
              {error && <label className="text-red-700">{error}</label>}
            </>
          ) : (
            <>
              <div className="flex justify-between">
                <div className="">{name}</div>
                <button
                  className="p-2 text-yellow-600 hover:text-yellow-700 relative"
                  onClick={(e) => {
                    e.preventDefault();
                    toggleEdit();
                  }}
                >
                  <TbEdit />
                </button>
              </div>
            </>
          )}
          <div className="flex justify-end pt-10">
            <button
              className="p-2 bg-red-800 hover:bg-red-900 rounded-lg relative z-10 text-black border-yellow-600 border-2 hover:border-yellow-700"
              onClick={(e) => {
                e.preventDefault();
                deleteHandler();
              }}
            >
              <TbTrash />
            </button>
          </div>
        </div>
      </Link>
    </>
  );
}
