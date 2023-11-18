import useFetch from "../useFetch";
import { useRouter } from "next/router";
import { useState, useEffect, useRef } from "react";

export default function GroupDetailsPage() {
  const toggleCreate = () => {};

  return (
    <div>
      <h1>Group Details</h1>
      <button>Add Players</button>
      <input type="text" />
      <button className="btn btn-sm" type="submit">
        Submit
      </button>
      <button className="btn btn-sm" onClick={toggleCreate}>
        Cancel
      </button>
    </div>
  );
}
