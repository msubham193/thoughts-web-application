import axios from "axios";
import React, { useEffect, useState } from "react";

const UserCard = ({ id }) => {
  console.log(id);

  const [user, setUser] = useState({});

  useEffect(() => {
    const getUser = async () => {
      try {
        const { data } = await axios.get(`/${id}`);

        setUser(data.user);
      } catch (error) {}
    };

    getUser();
  }, []);

  return (
    <div className="flex items-center relative p-4 w-full bg-white rounded-lg overflow-hidden shadow hover:shadow-md">
      <div className="w-12 h-12 rounded-full bg-gray-100">
      <img src={user?.avatar} alt="" className="w-full h-full rounded-full" />
      </div>
      <div className="ml-3">
        <p className="font-medium text-gray-800">{user?.name}</p>
        <p className="text-sm text-gray-600">{user?.email?.split('@')[0]}</p>
      </div>
    </div>
  );
};

export default UserCard;
