import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
// import Image from "next/image";
import React from "react";
import Link from "next/link";
import {
  Menubar,
  MenubarContent,
  MenubarItem,
  MenubarMenu,
  MenubarSeparator,
  MenubarShortcut,
  MenubarTrigger,
} from "@/components/ui/menubar";

const HeaderPage = () => {
  return (
    <div className="relative">
      <div className="bg-[#000000a9] p-6 absolute top-0 left-0 w-full z-10">
        <div className="flex justify-around">
          <div>
            <div className="border-2 border-white rounded-sm p-2 text-center">
              {/* <div className='flex'> */}

              <p className="text-2xl text-center font-mono">Fast Shopping</p>
              {/* </div> */}
            </div>
            <div>
              <p className="pl-2 p-2">FAST SHOPPING YOUR HOME</p>
            </div>
          </div>
          <Input className="w-96" placeholder="search product" />
          <div className="space-x-10">
            <Link href="/signin">
              <Button className="font-bold border-2 border-white">Login</Button>
            </Link>
            <Link href="/signup">
              <Button className="bg-white text-black font-bold hover:bg-gray-300">
                Signup
              </Button>
            </Link>
          </div>
        </div>
        <div className="flex justify-center space-x-11">
          <div>
            <Menubar>
              <MenubarMenu>
                <MenubarTrigger>Men</MenubarTrigger>
                <MenubarContent className="bg-[#000000a9] text-white">
                  <MenubarItem>
                    New Tab <MenubarShortcut>⌘T</MenubarShortcut>
                  </MenubarItem>
                  <MenubarItem>New Window</MenubarItem>
                  <MenubarSeparator />
                  <MenubarItem>Share</MenubarItem>
                  <MenubarSeparator />
                  <MenubarItem>Print</MenubarItem>
                </MenubarContent>
              </MenubarMenu>
            </Menubar>
          </div>
          <div>
            <Menubar>
              <MenubarMenu>
                <MenubarTrigger>Women</MenubarTrigger>
                <MenubarContent className="bg-[#000000a9] text-white">
                  <MenubarItem>
                    New Tab <MenubarShortcut>⌘T</MenubarShortcut>
                  </MenubarItem>
                  <MenubarItem>New Window</MenubarItem>
                  <MenubarSeparator />
                  <MenubarItem>Share</MenubarItem>
                  <MenubarSeparator />
                  <MenubarItem>Print</MenubarItem>
                </MenubarContent>
              </MenubarMenu>
            </Menubar>
          </div>
          <div>
            <Menubar>
              <MenubarMenu>
                <MenubarTrigger>Sports</MenubarTrigger>
                <MenubarContent className="bg-[#000000a9] text-white">
                  <MenubarItem>
                    New Tab <MenubarShortcut>⌘T</MenubarShortcut>
                  </MenubarItem>
                  <MenubarItem>New Window</MenubarItem>
                  <MenubarSeparator />
                  <MenubarItem>Share</MenubarItem>
                  <MenubarSeparator />
                  <MenubarItem>Print</MenubarItem>
                </MenubarContent>
              </MenubarMenu>
            </Menubar>
          </div>
          <div>
            <Menubar>
              <MenubarMenu>
                <MenubarTrigger>Electronic</MenubarTrigger>
                <MenubarContent className="bg-[#000000a9] text-white">
                  <MenubarItem>
                    New Tab <MenubarShortcut>⌘T</MenubarShortcut>
                  </MenubarItem>
                  <MenubarItem>New Window</MenubarItem>
                  <MenubarSeparator />
                  <MenubarItem>Share</MenubarItem>
                  <MenubarSeparator />
                  <MenubarItem>Print</MenubarItem>
                </MenubarContent>
              </MenubarMenu>
            </Menubar>
          </div>
        </div>
      </div>
      <div>
        <img
          src="https://media1.thehungryjpeg.com/thumbs2/ori_3513922_280999654b9acc6a6e143612046c091cd5eeacab_fast-shopping-logo.jpg"
          width={0}
          height={0}
          style={{ width: "100%", height: 990 }}
          alt="Background Image"
        />
      </div>
    </div>
  );
};

export default HeaderPage;
