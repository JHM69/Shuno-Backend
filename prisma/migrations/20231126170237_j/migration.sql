/*
  Warnings:

  - You are about to drop the `Artist` table. If the table is not empty, all the data it contains will be lost.
  - You are about to drop the `Song` table. If the table is not empty, all the data it contains will be lost.
  - Added the required column `updatedAt` to the `Album` table without a default value. This is not possible if the table is not empty.
  - Added the required column `updatedAt` to the `Genre` table without a default value. This is not possible if the table is not empty.
  - Added the required column `updatedAt` to the `Playlist` table without a default value. This is not possible if the table is not empty.

*/
-- DropForeignKey
ALTER TABLE "Artist" DROP CONSTRAINT "Artist_authorId_fkey";

-- DropForeignKey
ALTER TABLE "Image" DROP CONSTRAINT "Image_artistId_fkey";

-- DropForeignKey
ALTER TABLE "Image" DROP CONSTRAINT "Image_songId_fkey";

-- DropForeignKey
ALTER TABLE "Song" DROP CONSTRAINT "Song_albumId_fkey";

-- DropForeignKey
ALTER TABLE "Song" DROP CONSTRAINT "Song_authorId_fkey";

-- DropForeignKey
ALTER TABLE "Song" DROP CONSTRAINT "Song_id_fkey";

-- DropForeignKey
ALTER TABLE "SongDownloadUrl" DROP CONSTRAINT "SongDownloadUrl_songId_fkey";

-- DropForeignKey
ALTER TABLE "_ArtistSongs" DROP CONSTRAINT "_ArtistSongs_A_fkey";

-- DropForeignKey
ALTER TABLE "_ArtistSongs" DROP CONSTRAINT "_ArtistSongs_B_fkey";

-- DropForeignKey
ALTER TABLE "_FeaturedArtists" DROP CONSTRAINT "_FeaturedArtists_B_fkey";

-- DropForeignKey
ALTER TABLE "_PrimaryArtists" DROP CONSTRAINT "_PrimaryArtists_B_fkey";

-- DropForeignKey
ALTER TABLE "_SongGenres" DROP CONSTRAINT "_SongGenres_B_fkey";

-- AlterTable
ALTER TABLE "Album" ADD COLUMN     "createdAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
ADD COLUMN     "updatedAt" TIMESTAMP(3) NOT NULL;

-- AlterTable
ALTER TABLE "Genre" ADD COLUMN     "createdAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
ADD COLUMN     "updatedAt" TIMESTAMP(3) NOT NULL;

-- AlterTable
ALTER TABLE "Playlist" ADD COLUMN     "createdAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
ADD COLUMN     "updatedAt" TIMESTAMP(3) NOT NULL;

-- DropTable
DROP TABLE "Artist";

-- DropTable
DROP TABLE "Song";

-- CreateTable
CREATE TABLE "artists" (
    "id" SERIAL NOT NULL,
    "name" TEXT NOT NULL,
    "primaryImage" TEXT NOT NULL,
    "followerCount" TEXT NOT NULL,
    "fanCount" TEXT NOT NULL,
    "isVerified" BOOLEAN NOT NULL,
    "dominantLanguage" TEXT NOT NULL,
    "dominantType" TEXT NOT NULL,
    "bio" TEXT NOT NULL,
    "dob" TEXT NOT NULL,
    "fb" TEXT NOT NULL,
    "twitter" TEXT NOT NULL,
    "wiki" TEXT NOT NULL,
    "availableLanguages" TEXT NOT NULL,
    "isRadioPresent" BOOLEAN NOT NULL,
    "authorId" INTEGER NOT NULL,
    "createdAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "updatedAt" TIMESTAMP(3) NOT NULL,

    CONSTRAINT "artists_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "songs" (
    "id" SERIAL NOT NULL,
    "name" TEXT NOT NULL,
    "albumId" INTEGER NOT NULL,
    "year" TEXT NOT NULL,
    "releaseDate" TIMESTAMP(3),
    "duration" INTEGER NOT NULL,
    "label" TEXT NOT NULL,
    "explicitContent" INTEGER NOT NULL,
    "playCount" INTEGER NOT NULL,
    "language" TEXT NOT NULL,
    "hasLyrics" BOOLEAN NOT NULL,
    "url" TEXT NOT NULL,
    "copyright" TEXT NOT NULL,
    "contentType" "ContentType" NOT NULL,
    "origin" TEXT NOT NULL,
    "lyricsSnippet" TEXT NOT NULL,
    "encryptedMediaUrl" TEXT NOT NULL,
    "encryptedMediaPath" TEXT NOT NULL,
    "mediaPreviewUrl" TEXT NOT NULL,
    "permaUrl" TEXT NOT NULL,
    "albumUrl" TEXT NOT NULL,
    "rightId" INTEGER NOT NULL,
    "kbps320" BOOLEAN NOT NULL,
    "isDolbyContent" BOOLEAN NOT NULL,
    "disabled" TEXT NOT NULL,
    "disabledText" TEXT NOT NULL,
    "cacheState" TEXT NOT NULL,
    "vcode" TEXT NOT NULL,
    "trillerAvailable" BOOLEAN NOT NULL,
    "labelUrl" TEXT NOT NULL,
    "authorId" INTEGER NOT NULL,
    "createdAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "updatedAt" TIMESTAMP(3) NOT NULL,

    CONSTRAINT "songs_pkey" PRIMARY KEY ("id")
);

-- CreateIndex
CREATE INDEX "artists_name_idx" ON "artists"("name");

-- CreateIndex
CREATE INDEX "name" ON "songs"("name");

-- AddForeignKey
ALTER TABLE "artists" ADD CONSTRAINT "artists_authorId_fkey" FOREIGN KEY ("authorId") REFERENCES "users"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "songs" ADD CONSTRAINT "songs_albumId_fkey" FOREIGN KEY ("albumId") REFERENCES "Album"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "songs" ADD CONSTRAINT "songs_id_fkey" FOREIGN KEY ("id") REFERENCES "Playlist"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "songs" ADD CONSTRAINT "songs_authorId_fkey" FOREIGN KEY ("authorId") REFERENCES "users"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "Image" ADD CONSTRAINT "Image_artistId_fkey" FOREIGN KEY ("artistId") REFERENCES "artists"("id") ON DELETE SET NULL ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "Image" ADD CONSTRAINT "Image_songId_fkey" FOREIGN KEY ("songId") REFERENCES "songs"("id") ON DELETE SET NULL ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "SongDownloadUrl" ADD CONSTRAINT "SongDownloadUrl_songId_fkey" FOREIGN KEY ("songId") REFERENCES "songs"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "_ArtistSongs" ADD CONSTRAINT "_ArtistSongs_A_fkey" FOREIGN KEY ("A") REFERENCES "artists"("id") ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "_ArtistSongs" ADD CONSTRAINT "_ArtistSongs_B_fkey" FOREIGN KEY ("B") REFERENCES "songs"("id") ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "_PrimaryArtists" ADD CONSTRAINT "_PrimaryArtists_B_fkey" FOREIGN KEY ("B") REFERENCES "artists"("id") ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "_FeaturedArtists" ADD CONSTRAINT "_FeaturedArtists_B_fkey" FOREIGN KEY ("B") REFERENCES "artists"("id") ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "_SongGenres" ADD CONSTRAINT "_SongGenres_B_fkey" FOREIGN KEY ("B") REFERENCES "songs"("id") ON DELETE CASCADE ON UPDATE CASCADE;
