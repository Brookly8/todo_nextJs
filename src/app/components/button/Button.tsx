"use client";
import axios from "axios";
import Image from "next/image";
import { useRouter } from "next/navigation";
import React from "react";

export default function Button({ custClass, text, sendData }: any) {
  const router = useRouter();

  const toggle = () => {
    if (text === "Add Task" || text === "save") {
      sendData();
    } else {
      router.push("/createtodo");
    }
  };

  return (
    <button onClick={toggle} className={custClass}>
      <p>
        <b>{text}</b>
      </p>
      <Image
        aria-hidden
        src={text === "save" ? "/mdi_check-bold.png" : "/plus.png"}
        alt="Plus icon"
        width={16}
        height={16}
      />
    </button>
  );
}
