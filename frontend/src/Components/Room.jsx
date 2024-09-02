import { useState } from "react";
import RoomContent from "./RoomContent";

// eslint-disable-next-line react/prop-types
export default function Room({ user, Room_id, CURRENT_USER }) {
  const [loadRoom, setLoadRoom] = useState(false);

  function handleRoom() {
    setLoadRoom(!loadRoom);
  }

  return (
    <>
      {loadRoom && <RoomContent handleRoom={handleRoom} Room_id={Room_id} CURRENT_USER={CURRENT_USER} user={user} />}
      <div className="room-div p-4 border-b-2 border-black text-lg" onClick={handleRoom}>
        {user}
      </div>
    </>
  );
}
