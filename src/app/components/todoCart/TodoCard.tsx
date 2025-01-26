"use client";
import axios from "axios";
import Image from "next/image";
import { useRouter } from "next/navigation";
import React from "react";

export default function ({ todo, setTodos }: any) {
  const router = useRouter();

  const deleteTask = async (id: any) => {
    try {
      const { data } = await axios.delete(`http://localhost:8080/tasks/${id}`);
      console.log(data);

      setTodos((prevTodos: any) =>
        prevTodos.filter((todo: any) => todo.id !== id)
      );
    } catch (error) {
      console.error("Error deleting task:", error);
    }
  };

  const changeStatus = async () => {
    try {
      await axios.put(`http://localhost:8080/tasks/${todo.id}`, {
        ...todo,
        completed: !todo.completed,
      });
      console.log("Todo updated successfully!");
    } catch (error) {
      console.log(error);
    }
  };

  return (
    <div className="bg-[#262626] w-full flex justify-between items-center p-[14px] rounded-lg">
      <div className=" flex gap-4 items-center w-[92%]">
        <div
          onClick={changeStatus}
          className={`w-[24px] h-[24px] rounded-full shrink-0 ${
            !todo.completed
              ? "border-[#4ea8de] border-2"
              : "w-6 h-6 flex items-center justify-center rounded-full bg-[#585bbd]"
          }`}
        >
          {todo.completed ? (
            <Image
              aria-hidden
              src="/vector.png"
              alt="Plus icon"
              width={10}
              height={5.69}
            />
          ) : (
            ""
          )}
        </div>
        <p
          onClick={() =>
            router.push(`/editTodo?id=${encodeURIComponent(todo.id)}`)
          }
          className={
            !todo.completed
              ? "text-[#f2f2f2] hover:cursor-pointer"
              : "line-through text-[#808080] hover:cursor-pointer"
          }
        >
          {todo.title}
        </p>
      </div>
      <Image
        onClick={() => deleteTask(todo.id)}
        aria-hidden
        className="hover:cursor-pointer"
        src="/trash.png"
        alt="Plus icon"
        width={24}
        height={24}
      />
    </div>
  );
}
