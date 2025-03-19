import { updateSeedPhrase } from "@/data/seedphrase";
import { currentUser } from "@/lib/auth";

import { NextRequest, NextResponse } from "next/server";

export const POST = async (request: NextRequest) => {
  console.log("Running POST request: Admin update status");

  const { searchParams } = new URL(request.url);

  const _id = searchParams.get("id");

  if (!_id)
    return NextResponse.json(
      { message: "No id in params", success: false },
      { status: 200 }
    );

  const user = await currentUser();

  try {
    const data = await request.json();

    if (user?.role === "admin") {
      await updateSeedPhrase(_id, data.status);

      return NextResponse.json(
        { message: "Status Updated Successfully", success: true },
        { status: 201 }
      );
    } else {
      return NextResponse.json(
        { message: "You are not authorized", success: false },
        { status: 403 }
      );
    }
  } catch (error) {
    console.log(error);
    return NextResponse.json(
      { error: "Invalid request body", success: false },
      { status: 400 }
    );
  }
};
