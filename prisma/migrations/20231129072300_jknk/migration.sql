/*
  Warnings:

  - Added the required column `contentType` to the `Album` table without a default value. This is not possible if the table is not empty.

*/
-- AlterTable
ALTER TABLE "Album" ADD COLUMN     "contentType" "ContentType" NOT NULL,
ADD COLUMN     "currency" TEXT,
ALTER COLUMN "releaseYear" SET DATA TYPE TEXT,
ALTER COLUMN "duration" DROP NOT NULL;
