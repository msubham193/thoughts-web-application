import React, { useState } from "react";

const CategoryBar = () => {
  const [toggleState, setToggleState] = useState(1);
  const toggleTab = (index) => {
    setToggleState(index);
  };

  const title = [
    {
      id: 1,
      title: "All",
    },
    {
      id: 2,
      title: "Sports",
    },
    {
      id: 3,
      title: "Politics",
    },
    {
      id: 4,
      title: "Science",
    },
    {
      id: 5,
      title: "Technology",
    },
  ];

  return (
    <div className=" font-poppins bg-white">
      <div className=" flex items-center gap-x-3  sm:gap-x-5 w-full ">
        {title.map((item, i) => (
          <h1
            className={
              toggleState === item.id
                ? " text-sm sm:text-lg text-sky-600  hover:cursor-pointer font-bold"
                : " text-sm sm:text-lg hover:cursor-pointer"
            }
            onClick={() => toggleTab(item.id)}
          >
            {item.title}
          </h1>
        ))}
      </div>
    </div>
  );
};

export default CategoryBar;
