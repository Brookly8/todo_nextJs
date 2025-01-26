"use client";
import Image from "next/image";
import React, { useEffect, useState } from "react";
import Colors from "../colors/Colors";
import Button from "../button/Button";
import axios from "axios";
import { useRouter, useSearchParams } from "next/navigation";

export default function CreateEditTodo({ type }: any) {
  const searchParams = useSearchParams();
  const id = searchParams.get("id");
  const router = useRouter();
  const [errorMessage, setErrorMessage] = useState("");
  const [selectedColor, setSelectedColor] = useState<any>(null);
  const [todoData, setTodoData] = useState<any>({
    title: "",
    color: "",
    completed: false,
  });
  const colors = [
    "#FF3B30",
    "#FF9500",
    "#FFCC00",
    "#34C759",
    "#007AFF",
    "#5856D6",
    "#AF52DE",
    "#FF2D55",
    "#A2845E",
  ];

  useEffect(() => {
    if (id) {
      const fetchData = async () => {
        try {
          const res: any = await axios("http://localhost:8080/tasks");
          const picked = res.data.filter(
            (todo: any) => todo.id === Number(id)
          )[0];
          setTodoData(picked);
        } catch (error) {
          console.log(error);
        }
      };
      fetchData();
    }
  }, [id]);

  const sendData = async () => {
    try {
      if (id) {
        await axios.put(`http://localhost:8080/tasks/${id}`, todoData);
        console.log("Todo updated successfully!");
        router.push("/");
      } else {
        const { data }: any = await axios.post(
          "http://localhost:8080/tasks",
          todoData
        );
        console.log(data);
      }
      router.push("/");
    } catch (error: any) {
      console.log(error.response.data.error);
      setErrorMessage(error.response.data.error);
    }
  };

  const selectColor = (id: number) => {
    setSelectedColor(id);
  };

  return (
    <div className="flex flex-col justify-center items-center">
      <div className="mt-[5%] w-[736px] h-[309px] flex flex-col gap-4 items-start">
        <Image
          onClick={() => router.push("/")}
          className=" mb-7 hover:cursor-pointer"
          aria-hidden
          src="/arrow-left.png"
          alt="Plus icon"
          width={24}
          height={24}
        />
        <div className="flex flex-col gap-3 w-full">
          <h3 className="text-[#4ea8de]">
            <b>Title</b>
          </h3>
          <input
            onChange={(e) =>
              setTodoData({ ...todoData, title: e.target.value })
            }
            className=" bg-[#333333] px-3 h-[52px] rounded-lg"
            value={todoData.title}
            type="text"
            placeholder="EX. Brush you teeth"
          />
        </div>
        <div>
          <h3 className="text-[#4ea8de] pb-3">
            <b>Color</b>
          </h3>
          <div className="flex gap-3 pb-5">
            {colors.map((color, id) => (
              <div
                onClick={() => selectColor(id)}
                key={id}
                className={`rounded-full${
                  selectedColor === id && " border-[2px] border-white"
                }`}
              >
                <Colors
                  color={color}
                  setTodoData={setTodoData}
                  todoData={todoData}
                />
              </div>
            ))}
          </div>
        </div>
        <Button
          sendData={sendData}
          custClass={
            "w-[736px] py-3 bg-[#1E6F9F] rounded-lg text-[#F2F2F2] text-lg flex justify-center items-center gap-2"
          }
          text={type}
        />
        <div className="flex justify-center w-[100%]">
          <h3 className="text-red-400">{errorMessage && errorMessage}</h3>
        </div>
      </div>
    </div>
  );
}
