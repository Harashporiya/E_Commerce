"use client";
import React, { useEffect, useState } from "react";

import { userProfile } from "@/http/api";
import { useParams } from "next/navigation";
import { UserType } from "@/types/userType";
import HeaderPage from "../../product/[id]/header";
import FooterPage from "../../footer/page";
const ProfilePage = () => {
  const [user, setuser] = useState([]);
  const params = useParams();
  const id = params.id;
  console.log(id);
  useEffect(() => {
    const userFetchData = async () => {
      try {
        const response = await userProfile(id as string);
        setuser(response.data.userFind);
        localStorage.setItem("userid", response.data.userFind._id);
        console.log(response.data.userFind);
      } catch (error) {
        console.log("Error", error);
      }
    };
    userFetchData();
  }, [id]);
  return (
    <div className="bg-white min-h-screen">
      <HeaderPage />
      <main className="flex-grow bg-gray-100 py-16">
        <div className="flex">
          <div className="p-4  container mx-10 bg-gray-400 h-96 w-96 rounded-md shadow-xl">
            <div className="flex items-center">
              <img
                src="https://cdn.pixabay.com/photo/2020/07/01/12/58/icon-5359553_640.png"
                alt=""
                className="w-24  h-24 border-[10px] border-white rounded-full"
              />
              <div>
                {user.map((users: UserType) => (
                  <div key={users._id}>
                    <p className="text-white font-bold text-3xl p-4">
                      {users.firstName} {users.lastName}
                    </p>
                  </div>
                ))}
              </div>
            </div>
            <div className=" border-t p-2 mt-4 border-black"></div>
          </div>
          <div>
            <p className="text-black">Harash</p>
          </div>
        </div>
      </main>
      <FooterPage />
    </div>
  );
};
export default ProfilePage;
