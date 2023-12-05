/*
  Warnings:

  - Added the required column `name` to the `Playlist` table without a default value. This is not possible if the table is not empty.

*/
-- AlterTable
ALTER TABLE "Playlist" ADD COLUMN     "name" TEXT NOT NULL;
