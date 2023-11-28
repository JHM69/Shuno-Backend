/*
  Warnings:

  - You are about to drop the column `albumUrl` on the `Album` table. All the data in the column will be lost.
  - You are about to drop the column `cacheState` on the `Album` table. All the data in the column will be lost.
  - You are about to drop the column `copyrightText` on the `Album` table. All the data in the column will be lost.
  - You are about to drop the column `encryptedMediaPath` on the `Album` table. All the data in the column will be lost.
  - You are about to drop the column `encryptedMediaUrl` on the `Album` table. All the data in the column will be lost.
  - You are about to drop the column `explicitContent` on the `Album` table. All the data in the column will be lost.
  - You are about to drop the column `hasLyric` on the `Album` table. All the data in the column will be lost.
  - You are about to drop the column `hasLyrics` on the `Album` table. All the data in the column will be lost.
  - You are about to drop the column `isDolbyContent` on the `Album` table. All the data in the column will be lost.
  - You are about to drop the column `labelUrl` on the `Album` table. All the data in the column will be lost.
  - You are about to drop the column `lyricsSnippet` on the `Album` table. All the data in the column will be lost.
  - You are about to drop the column `permaUrl` on the `Album` table. All the data in the column will be lost.
  - You are about to drop the column `playCount` on the `Album` table. All the data in the column will be lost.
  - You are about to drop the column `vcode` on the `Album` table. All the data in the column will be lost.
  - You are about to drop the column `vlink` on the `Album` table. All the data in the column will be lost.
  - You are about to drop the column `webp` on the `Album` table. All the data in the column will be lost.
  - You are about to drop the `_AlbumGenres` table. If the table is not empty, all the data it contains will be lost.
  - Added the required column `isPremium` to the `Album` table without a default value. This is not possible if the table is not empty.
  - Added the required column `likes` to the `Album` table without a default value. This is not possible if the table is not empty.
  - Added the required column `plays` to the `Album` table without a default value. This is not possible if the table is not empty.

*/
-- DropForeignKey
ALTER TABLE "_AlbumGenres" DROP CONSTRAINT "_AlbumGenres_A_fkey";

-- DropForeignKey
ALTER TABLE "_AlbumGenres" DROP CONSTRAINT "_AlbumGenres_B_fkey";

-- AlterTable
ALTER TABLE "Album" DROP COLUMN "albumUrl",
DROP COLUMN "cacheState",
DROP COLUMN "copyrightText",
DROP COLUMN "encryptedMediaPath",
DROP COLUMN "encryptedMediaUrl",
DROP COLUMN "explicitContent",
DROP COLUMN "hasLyric",
DROP COLUMN "hasLyrics",
DROP COLUMN "isDolbyContent",
DROP COLUMN "labelUrl",
DROP COLUMN "lyricsSnippet",
DROP COLUMN "permaUrl",
DROP COLUMN "playCount",
DROP COLUMN "vcode",
DROP COLUMN "vlink",
DROP COLUMN "webp",
ADD COLUMN     "coverImage" TEXT,
ADD COLUMN     "isPremium" BOOLEAN NOT NULL,
ADD COLUMN     "likes" INTEGER NOT NULL,
ADD COLUMN     "plays" INTEGER NOT NULL,
ADD COLUMN     "price" INTEGER,
ALTER COLUMN "releaseYear" DROP NOT NULL,
ALTER COLUMN "label" DROP NOT NULL,
ALTER COLUMN "language" DROP NOT NULL,
ALTER COLUMN "origin" DROP NOT NULL,
ALTER COLUMN "mediaPreviewUrl" DROP NOT NULL,
ALTER COLUMN "disabledText" DROP NOT NULL,
ALTER COLUMN "releaseDate" DROP NOT NULL,
ALTER COLUMN "releaseDate" SET DEFAULT CURRENT_TIMESTAMP;

-- DropTable
DROP TABLE "_AlbumGenres";
