import React from "react";

export default function Colors({
  color,
  setTodoData,
  todoData,
}: {
  color: string;
  setTodoData: any;
  todoData: any;
}) {
  const handleClick = (e: React.MouseEvent<HTMLDivElement>) => {
    const target = e.target as HTMLDivElement;
    const color = target.style.backgroundColor;
    setTodoData({ ...todoData, color: color });
  };

  return (
    <div
      onClick={handleClick}
      className={`w-[52px] h-[52px] shrink-0 flex items-center justify-center cursor-pointer rounded-full hover:border-[2px] hover:border-white`}
      style={{ backgroundColor: color }}
    ></div>
  );
}
