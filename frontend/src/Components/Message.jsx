// eslint-disable-next-line react/prop-types
import { useEffect, useRef } from "react";

export default function Message({ message, timestamp, isLeft, isLast }) {
  const curRef = useRef(null);

  useEffect(() => {
    if(isLast)
    curRef.current.scrollIntoView({
      behavior: "smooth",
      block: "start",
      inline: "nearest",
    });
  });
  //console.log(message, timestamp);
  return (
    <>
      <div
        className="flex items-center justify-end overflow-x-hidden "
        ref={isLast ? curRef : null}
      >
        <div
          className={
            isLeft
              ? "p-2 border-2 border-black max-w-[70vw] m-2 rounded-md mr-auto bg-slate-100"
              : "p-2 border-2 border-black max-w-[70vw] m-2 rounded-md bg-slate-200"
          }
        >
          <p className="break-words">{message}</p>
          <p className="text-xs mt-2">{new Date(timestamp).toLocaleString()}</p>
        </div>
      </div>
    </>
  );
}
