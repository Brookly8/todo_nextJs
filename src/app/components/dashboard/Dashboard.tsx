"use client";
import React, { useEffect, useState } from "react";
import EmptyDashboard from "../emptyDashboard/EmptyDashboard";
import TodoCard from "../todoCart/TodoCard";
import axios from "axios";

export default function Dashboard({ todos, setTodos }: any) {
  const [completedCount, setcompletedCount] = useState(0);
  useEffect(() => {
    const fetchData = async () => {
      try {
        const res: any = await axios("http://localhost:8080/tasks");
        setTodos(res.data);
      } catch (error) {
        console.log(error);
      }
    };
    fetchData();
  }, [todos]);

  useEffect(() => {
    const compTodos = todos.filter((todo: any) => todo.completed === true);
    setcompletedCount(compTodos.length);
  }, [todos]);

  return (
    <div className="mt-[5%] w-[736px] h-[309px]">
      <div className="flex justify-between pb-5">
        <div className="flex gap-2">
          <p className="text-[#4ea8de]">
            <b>Tasks</b>
          </p>
          <div className=" bg-[#333333] rounded-[10px] w-6 h-6 flex justify-center items-center">
            {<b>{todos.length}</b>}
          </div>
        </div>
        <div className="flex gap-2">
          <p className="text-[#8284fa]">
            <b>Compleated</b>
          </p>
          <div className=" bg-[#333333] rounded-[10px] p-3 h-6 flex justify-center items-center">
            {`${completedCount} of ${todos.length}`}
          </div>
        </div>
      </div>
      {todos.length < 1 ? (
        <EmptyDashboard />
      ) : (
        <div className="flex flex-col gap-3">
          {todos.map((todo: any, id: number) => {
            return <TodoCard key={id} todo={todo} setTodos={setTodos} />;
          })}
        </div>
      )}
    </div>
  );
}
