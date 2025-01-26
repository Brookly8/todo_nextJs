"use client";
import Button from "./components/button/Button";
import Dashboard from "./components/dashboard/Dashboard";
import { useState } from "react";

export default function Home() {
  const [todos, setTodos] = useState([]);

  return (
    <div className=" flex flex-col justify-center items-center">
      <Button
        custClass={
          "absolute top-[18%]  w-[736px]  py-3 bg-[#1E6F9F] rounded-lg text-[#F2F2F2] text-lg flex justify-center items-center gap-2"
        }
        text={"Create Task"}
      />
      <Dashboard todos={todos} setTodos={setTodos} />
    </div>
  );
}
