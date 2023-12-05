-- AlterTable
ALTER TABLE "Playlist" ADD COLUMN     "language" TEXT,
ADD COLUMN     "subtitle" TEXT,
ADD COLUMN     "type" TEXT,
ADD COLUMN     "year" TEXT;

-- CreateTable
CREATE TABLE "_PlaylistArtists" (
    "A" INTEGER NOT NULL,
    "B" INTEGER NOT NULL
);

-- CreateIndex
CREATE UNIQUE INDEX "_PlaylistArtists_AB_unique" ON "_PlaylistArtists"("A", "B");

-- CreateIndex
CREATE INDEX "_PlaylistArtists_B_index" ON "_PlaylistArtists"("B");

-- AddForeignKey
ALTER TABLE "_PlaylistArtists" ADD CONSTRAINT "_PlaylistArtists_A_fkey" FOREIGN KEY ("A") REFERENCES "artists"("id") ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "_PlaylistArtists" ADD CONSTRAINT "_PlaylistArtists_B_fkey" FOREIGN KEY ("B") REFERENCES "Playlist"("id") ON DELETE CASCADE ON UPDATE CASCADE;
