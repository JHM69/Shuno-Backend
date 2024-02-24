/* eslint-disable import/no-extraneous-dependencies */


import { PrismaVectorStore } from "@langchain/community/vectorstores/prisma";
import { GoogleGenerativeAIEmbeddings  } from "@langchain/google-genai";
import { PrismaClient, Prisma, Song,  } from "@prisma/client";

// add prisma to the NodeJS global type
// TODO : downgraded @types/node to 15.14.1 to avoid error on NodeJS.Global
interface CustomNodeJsGlobal extends NodeJS.Global {
  prisma: PrismaClient;
}

// Prevent multiple instances of Prisma Client in development
declare const global: CustomNodeJsGlobal;

const prisma = global.prisma || new PrismaClient();

if (process.env.NODE_ENV === 'development') {
  global.prisma = prisma;
}


export const songStore = PrismaVectorStore.withModel<Song>(prisma).create(
  new GoogleGenerativeAIEmbeddings(),
  {
    prisma: Prisma,
    tableName: "Song",
    vectorColumnName: "vector",
    columns: {
      id: PrismaVectorStore.IdColumn,
      content: PrismaVectorStore.ContentColumn,
    },
  }
);

export default prisma;