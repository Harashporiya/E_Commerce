import React from "react";

// import { auth } from "@/auth";
// import { redirect } from "next/navigation";
import HeaderPage from "./(client)/header/page";
import MidHeader from "./(client)/midheader/page";
import ShowProduct from "./(client)/showproduct/product";
const page = async () => {
  // const session = await auth()
  // if(session?.user) redirect("/home")
  return (
    <div className="bg-white min-h-screen">
      <HeaderPage />
      <MidHeader />
      <ShowProduct />
    </div>
  );
};

export default page;
