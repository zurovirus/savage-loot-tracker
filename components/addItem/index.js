import { useState, useRef } from "react";
import Link from "next/link";

export default function AddItem({
  submitHandler,
  dataRef,
  data,
  dataName,
  error,
  toggleCreate,
  isCreating,
}) {
  return (
    <>
      {!isCreating && (
        <button className="btn btn-sm" onClick={toggleCreate}>
          Add {dataName}
        </button>
      )}
      {isCreating && (
        <div>
          <label className="">Name</label>
          <input className="text-black" type="text" ref={dataRef} autoFocus />
          {error && <label className="m-2 text-red-700">{error} </label>}
          <button className="btn btn-sm" type="submit" onClick={submitHandler}>
            Submit
          </button>
          <button className="btn btn-sm" onClick={toggleCreate}>
            Cancel
          </button>
        </div>
      )}
      {data &&
        data.map(({ name, id }) => (
          <div key={id}>
            <Link href={`/${dataName}/${id}`}>{name}</Link>
          </div>
        ))}
    </>
  );
}
