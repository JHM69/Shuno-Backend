/*
  Warnings:

  - You are about to drop the column `fanCount` on the `Playlist` table. All the data in the column will be lost.
  - You are about to drop the column `firstname` on the `Playlist` table. All the data in the column will be lost.
  - You are about to drop the column `followerCount` on the `Playlist` table. All the data in the column will be lost.
  - You are about to drop the column `lastname` on the `Playlist` table. All the data in the column will be lost.
  - You are about to drop the column `name` on the `Playlist` table. All the data in the column will be lost.
  - You are about to drop the column `shares` on the `Playlist` table. All the data in the column will be lost.
  - You are about to drop the column `songCount` on the `Playlist` table. All the data in the column will be lost.

*/
-- AlterTable
ALTER TABLE "Playlist" DROP COLUMN "fanCount",
DROP COLUMN "firstname",
DROP COLUMN "followerCount",
DROP COLUMN "lastname",
DROP COLUMN "name",
DROP COLUMN "shares",
DROP COLUMN "songCount",
ADD COLUMN     "primaryImage" TEXT;
