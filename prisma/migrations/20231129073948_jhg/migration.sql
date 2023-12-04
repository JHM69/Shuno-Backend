-- CreateTable
CREATE TABLE "_AlbumGenres" (
    "A" INTEGER NOT NULL,
    "B" INTEGER NOT NULL
);

-- CreateIndex
CREATE UNIQUE INDEX "_AlbumGenres_AB_unique" ON "_AlbumGenres"("A", "B");

-- CreateIndex
CREATE INDEX "_AlbumGenres_B_index" ON "_AlbumGenres"("B");

-- AddForeignKey
ALTER TABLE "_AlbumGenres" ADD CONSTRAINT "_AlbumGenres_A_fkey" FOREIGN KEY ("A") REFERENCES "Album"("id") ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "_AlbumGenres" ADD CONSTRAINT "_AlbumGenres_B_fkey" FOREIGN KEY ("B") REFERENCES "Genre"("id") ON DELETE CASCADE ON UPDATE CASCADE;
