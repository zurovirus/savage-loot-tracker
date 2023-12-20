import useFetch from "@/hooks/useFetch";
import { useState } from "react";
import Link from "next/link";

export default function GroupComboBox({ onSelectChange }) {
  const { data, isLoading } = useFetch("/api/group");

  const handleSelectChange = (e) => {
    onSelectChange(e.target.value);
  };

  if (isLoading) {
    return <p className="text-center mb-2">Loading groups...</p>;
  } else {
    return (
      <>
        {data.length === 0 ? (
          <div>
            <Link
              className="text-center mb-2 hover:text-blue-300"
              href="/groups"
            >
              No groups found, click here to create a group
            </Link>
          </div>
        ) : (
          <div className="text-center mb-2">
            <select
              onChange={handleSelectChange}
              className="select select-bordered rounded-md w-auto select-sm text-black"
            >
              <option hidden value="">
                Select a group
              </option>
              {data.map(({ name, id }) => (
                <option key={id} value={id}>
                  {name}
                </option>
              ))}
            </select>
          </div>
        )}
      </>
    );
  }
}
