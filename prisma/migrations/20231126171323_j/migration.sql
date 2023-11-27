/*
  Warnings:

  - A unique constraint covering the columns `[slug]` on the table `Album` will be added. If there are existing duplicate values, this will fail.
  - A unique constraint covering the columns `[slug]` on the table `Playlist` will be added. If there are existing duplicate values, this will fail.
  - A unique constraint covering the columns `[slug]` on the table `artists` will be added. If there are existing duplicate values, this will fail.
  - A unique constraint covering the columns `[slug]` on the table `songs` will be added. If there are existing duplicate values, this will fail.
  - Added the required column `slug` to the `Album` table without a default value. This is not possible if the table is not empty.
  - Added the required column `slug` to the `Playlist` table without a default value. This is not possible if the table is not empty.
  - Added the required column `slug` to the `artists` table without a default value. This is not possible if the table is not empty.
  - Added the required column `slug` to the `songs` table without a default value. This is not possible if the table is not empty.

*/
-- AlterTable
ALTER TABLE "Album" ADD COLUMN     "slug" TEXT NOT NULL;

-- AlterTable
ALTER TABLE "Playlist" ADD COLUMN     "slug" TEXT NOT NULL;

-- AlterTable
ALTER TABLE "artists" ADD COLUMN     "slug" TEXT NOT NULL;

-- AlterTable
ALTER TABLE "songs" ADD COLUMN     "slug" TEXT NOT NULL;

-- CreateIndex
CREATE UNIQUE INDEX "Album_slug_key" ON "Album"("slug");

-- CreateIndex
CREATE UNIQUE INDEX "Playlist_slug_key" ON "Playlist"("slug");

-- CreateIndex
CREATE UNIQUE INDEX "artists_slug_key" ON "artists"("slug");

-- CreateIndex
CREATE UNIQUE INDEX "songs_slug_key" ON "songs"("slug");
