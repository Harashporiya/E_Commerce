import { connectToDataBase } from "@/lib/db/db";
import { User } from "@/lib/model/user";
import { NextResponse } from "next/server";

export async function GET(
  request: Request,
  { params }: { params: { id: string } },
) {
  await connectToDataBase();
  const { id } = params;
  try {
    const userFind = await User.findById(id);
    if (!userFind) {
      return NextResponse.json({ message: "User not exit" }, { status: 404 });
    }
    return NextResponse.json(
      { userFind, message: "User find" },
      { status: 200 },
    );
  } catch (error) {
    return NextResponse.json({ message: "User not found" }, { status: 404 });
  }
}
