import Image from "next/image";
import React from "react";

export default function EmptyDashboard() {
  return (
    <div className=" flex justify-center gap-3 flex-col items-center border-t border-[#333333] rounded-lg w-[736px] h-[266px]">
      <Image
        aria-hidden
        src="/Clipboard.png"
        alt="Plus icon"
        width={56}
        height={56}
      />
      <div className="flex flex-col items-center gap-3">
        <p className="text-[#808080]">
          <b>You don't have any tasks registered yet.</b>
        </p>
        <p className="text-[#808080] text-[18px]">
          Create tasks and organize your to-do items.
        </p>
      </div>
    </div>
  );
}
