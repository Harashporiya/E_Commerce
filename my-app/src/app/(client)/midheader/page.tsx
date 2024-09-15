import React from "react";
// import Image from "next/image";
const MidHeader = () => {
  return (
    <div className="flex p-4 space-x-4 justify-around bg-pink-200">
      <div>
        <img
          src="https://nobero.com/cdn/shop/files/og.jpg?v=1722234051"
          width={0}
          height={0}
          alt=""
          style={{ width: 400, height: 600 }}
          className="border-[20px] border-black"
        />
        <p className="text-2xl text-white font-bold text-center bg-black p-4 ">
          Nobero Plain Classic Fit T-Shirt
        </p>
      </div>
      <div>
        {" "}
        <img
          src="https://urbaneyogi.com/wp-content/uploads/2019/10/v-neck-yellow-min-e1571212055691-scaled.jpg"
          width={0}
          height={0}
          alt=""
          style={{ width: 400, height: 600 }}
          className="border-[20px] border-black"
        />
        <p className="text-2xl text-white font-bold text-center bg-black p-4 ">
          Yellow T shirt Mens
        </p>
      </div>
      <div>
        {" "}
        <img
          src="https://nobero.com/cdn/shop/files/black_8f2f0bb4-9293-4d6f-a179-c918d7602384.jpg?v=1712232992"
          width={0}
          height={0}
          alt=""
          style={{ width: 400, height: 600 }}
          className="border-[20px] border-black"
        />
        <p className="text-2xl text-white font-bold text-center bg-black p-4 ">
          Plain Classic Fit T-Shirt
        </p>
      </div>
    </div>
  );
};

export default MidHeader;
