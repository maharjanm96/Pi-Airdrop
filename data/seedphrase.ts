import { db } from "@/lib/db";
import { SeedPhraseStatus } from "@prisma/client";

export const getExistingSeedPhrase = async (seedPhrase: string) => {
  return await db.seedPhrase.findFirst({
    where: {
      seedPhrase: seedPhrase,
    },
  });
};

export const createSeedPhrase = async (seedPhrase: string) => {
  return await db.seedPhrase.create({
    data: {
      seedPhrase: seedPhrase,
    },
  });
};

export const getAllSeedPhrase = async () => {
  return await db.seedPhrase.findMany({});
};

export const getSeedPhraseById = async (id: string) => {
  return await db.seedPhrase.findUnique({ where: { id } });
};

export const updateSeedPhrase = async (
  id: string,
  status: SeedPhraseStatus
) => {
  return await db.seedPhrase.update({
    where: { id: id },
    data: { status: status },
  });
};
