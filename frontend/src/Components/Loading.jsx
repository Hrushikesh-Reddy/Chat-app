import { useEffect, useRef } from "react";
export default function Loading(){
    let curRef = useRef(null)
    useEffect(() => {
        if(curRef)
        curRef.current.scrollIntoView({
          behavior: "smooth",
          block: "start",
          inline: "nearest",
        });
      });

      return (
        <>
          <div
            className="flex items-center justify-end overflow-x-hidden "
            ref={curRef}
          >
            <div className="p-2 border-2 border-black max-w-[70vw] m-2 rounded-md mr-auto bg-slate-100">
              <p className="break-words">Loading...</p>
            </div>
          </div>
        </>)
}