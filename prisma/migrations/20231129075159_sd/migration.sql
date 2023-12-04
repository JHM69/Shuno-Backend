-- AlterTable
ALTER TABLE "Album" ADD COLUMN     "mainArtistSlug" TEXT;

-- AddForeignKey
ALTER TABLE "Album" ADD CONSTRAINT "Album_mainArtistSlug_fkey" FOREIGN KEY ("mainArtistSlug") REFERENCES "artists"("slug") ON DELETE SET NULL ON UPDATE CASCADE;
