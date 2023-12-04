-- CreateTable
CREATE TABLE "_FeaturedArtistsSong" (
    "A" INTEGER NOT NULL,
    "B" INTEGER NOT NULL
);

-- CreateIndex
CREATE UNIQUE INDEX "_FeaturedArtistsSong_AB_unique" ON "_FeaturedArtistsSong"("A", "B");

-- CreateIndex
CREATE INDEX "_FeaturedArtistsSong_B_index" ON "_FeaturedArtistsSong"("B");

-- AddForeignKey
ALTER TABLE "_FeaturedArtistsSong" ADD CONSTRAINT "_FeaturedArtistsSong_A_fkey" FOREIGN KEY ("A") REFERENCES "artists"("id") ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "_FeaturedArtistsSong" ADD CONSTRAINT "_FeaturedArtistsSong_B_fkey" FOREIGN KEY ("B") REFERENCES "songs"("id") ON DELETE CASCADE ON UPDATE CASCADE;
