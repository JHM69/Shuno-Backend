-- CreateEnum
CREATE TYPE "ContentType" AS ENUM ('MUSIC', 'PODCAST', 'AUDIOBOOK', 'POEM', 'PAPER');

-- CreateEnum
CREATE TYPE "GenreContentTypes" AS ENUM ('POP', 'ROCK', 'HIPHOP', 'RNB', 'JAZZ', 'COUNTRY', 'CLASSICAL', 'METAL', 'BLUES', 'FOLK', 'REGGAE', 'PUNK', 'ELECTRONIC', 'DANCE', 'HOUSE', 'TRANCE', 'TECHNO', 'DUBSTEP', 'DRUMNBASS', 'AMBIENT', 'CHILL', 'LOUNGE', 'TRAP', 'INDIE', 'ALTERNATIVE', 'GRUNGE', 'PSYCHEDELIC', 'EXPERIMENTAL', 'FUNK', 'SOUL', 'DISCO', 'GOSPEL', 'CHRISTIAN', 'INSTRUMENTAL', 'SOUNDTRACK', 'KPOP', 'JPOP', 'ANIME', 'GAME', 'OTHER');

-- CreateTable
CREATE TABLE "Article" (
    "id" SERIAL NOT NULL,
    "slug" TEXT NOT NULL,
    "title" TEXT NOT NULL,
    "description" TEXT NOT NULL,
    "body" TEXT NOT NULL,
    "createdAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "updatedAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "authorId" INTEGER NOT NULL,

    CONSTRAINT "Article_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "Comment" (
    "id" SERIAL NOT NULL,
    "createdAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "updatedAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "body" TEXT NOT NULL,
    "articleId" INTEGER NOT NULL,
    "authorId" INTEGER NOT NULL,

    CONSTRAINT "Comment_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "Tag" (
    "id" SERIAL NOT NULL,
    "name" TEXT NOT NULL,

    CONSTRAINT "Tag_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "users" (
    "id" SERIAL NOT NULL,
    "email" TEXT NOT NULL,
    "username" TEXT NOT NULL,
    "password" TEXT NOT NULL,
    "image" TEXT DEFAULT 'https://api.realworld.io/images/smiley-cyrus.jpeg',
    "bio" TEXT,
    "createdAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "updatedAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,

    CONSTRAINT "users_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "Artist" (
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
    "updatedAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,

    CONSTRAINT "Artist_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "Album" (
    "id" SERIAL NOT NULL,
    "title" TEXT NOT NULL,
    "releaseYear" INTEGER NOT NULL,
    "label" TEXT NOT NULL,
    "language" TEXT NOT NULL,
    "origin" TEXT NOT NULL,
    "playCount" INTEGER NOT NULL,
    "copyrightText" TEXT NOT NULL,
    "isDolbyContent" BOOLEAN NOT NULL,
    "explicitContent" INTEGER NOT NULL,
    "hasLyrics" BOOLEAN NOT NULL,
    "lyricsSnippet" TEXT NOT NULL,
    "hasLyric" BOOLEAN NOT NULL,
    "encryptedMediaUrl" TEXT NOT NULL,
    "encryptedMediaPath" TEXT NOT NULL,
    "mediaPreviewUrl" TEXT NOT NULL,
    "permaUrl" TEXT NOT NULL,
    "albumUrl" TEXT NOT NULL,
    "duration" INTEGER NOT NULL,
    "webp" BOOLEAN NOT NULL,
    "disabled" BOOLEAN NOT NULL,
    "disabledText" TEXT NOT NULL,
    "cacheState" BOOLEAN NOT NULL,
    "releaseDate" TIMESTAMP(3) NOT NULL,
    "vcode" TEXT NOT NULL,
    "vlink" TEXT NOT NULL,
    "trillerAvailable" BOOLEAN NOT NULL,
    "labelUrl" TEXT NOT NULL,
    "authorId" INTEGER NOT NULL,

    CONSTRAINT "Album_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "Playlist" (
    "id" SERIAL NOT NULL,
    "userId" TEXT NOT NULL,
    "name" TEXT NOT NULL,
    "followerCount" TEXT NOT NULL,
    "songCount" INTEGER NOT NULL,
    "fanCount" TEXT NOT NULL,
    "username" TEXT NOT NULL,
    "firstname" TEXT NOT NULL,
    "lastname" TEXT NOT NULL,
    "shares" TEXT NOT NULL,
    "url" TEXT NOT NULL,
    "authorId" INTEGER NOT NULL,

    CONSTRAINT "Playlist_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "Genre" (
    "id" SERIAL NOT NULL,
    "name" "GenreContentTypes" NOT NULL,

    CONSTRAINT "Genre_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "Song" (
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

    CONSTRAINT "Song_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "Image" (
    "id" SERIAL NOT NULL,
    "quality" TEXT NOT NULL,
    "link" TEXT NOT NULL,
    "artistId" INTEGER,
    "albumId" INTEGER,
    "playlistId" INTEGER,
    "songId" INTEGER,

    CONSTRAINT "Image_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "SongDownloadUrl" (
    "id" SERIAL NOT NULL,
    "quality" TEXT NOT NULL,
    "link" TEXT NOT NULL,
    "songId" INTEGER NOT NULL,

    CONSTRAINT "SongDownloadUrl_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "_ArticleToTag" (
    "A" INTEGER NOT NULL,
    "B" INTEGER NOT NULL
);

-- CreateTable
CREATE TABLE "_UserFavorites" (
    "A" INTEGER NOT NULL,
    "B" INTEGER NOT NULL
);

-- CreateTable
CREATE TABLE "_UserFollows" (
    "A" INTEGER NOT NULL,
    "B" INTEGER NOT NULL
);

-- CreateTable
CREATE TABLE "_ArtistSongs" (
    "A" INTEGER NOT NULL,
    "B" INTEGER NOT NULL
);

-- CreateTable
CREATE TABLE "_PrimaryArtists" (
    "A" INTEGER NOT NULL,
    "B" INTEGER NOT NULL
);

-- CreateTable
CREATE TABLE "_FeaturedArtists" (
    "A" INTEGER NOT NULL,
    "B" INTEGER NOT NULL
);

-- CreateTable
CREATE TABLE "_SongGenres" (
    "A" INTEGER NOT NULL,
    "B" INTEGER NOT NULL
);

-- CreateIndex
CREATE UNIQUE INDEX "Article_slug_key" ON "Article"("slug");

-- CreateIndex
CREATE UNIQUE INDEX "Tag_name_key" ON "Tag"("name");

-- CreateIndex
CREATE UNIQUE INDEX "users_email_key" ON "users"("email");

-- CreateIndex
CREATE UNIQUE INDEX "users_username_key" ON "users"("username");

-- CreateIndex
CREATE UNIQUE INDEX "_ArticleToTag_AB_unique" ON "_ArticleToTag"("A", "B");

-- CreateIndex
CREATE INDEX "_ArticleToTag_B_index" ON "_ArticleToTag"("B");

-- CreateIndex
CREATE UNIQUE INDEX "_UserFavorites_AB_unique" ON "_UserFavorites"("A", "B");

-- CreateIndex
CREATE INDEX "_UserFavorites_B_index" ON "_UserFavorites"("B");

-- CreateIndex
CREATE UNIQUE INDEX "_UserFollows_AB_unique" ON "_UserFollows"("A", "B");

-- CreateIndex
CREATE INDEX "_UserFollows_B_index" ON "_UserFollows"("B");

-- CreateIndex
CREATE UNIQUE INDEX "_ArtistSongs_AB_unique" ON "_ArtistSongs"("A", "B");

-- CreateIndex
CREATE INDEX "_ArtistSongs_B_index" ON "_ArtistSongs"("B");

-- CreateIndex
CREATE UNIQUE INDEX "_PrimaryArtists_AB_unique" ON "_PrimaryArtists"("A", "B");

-- CreateIndex
CREATE INDEX "_PrimaryArtists_B_index" ON "_PrimaryArtists"("B");

-- CreateIndex
CREATE UNIQUE INDEX "_FeaturedArtists_AB_unique" ON "_FeaturedArtists"("A", "B");

-- CreateIndex
CREATE INDEX "_FeaturedArtists_B_index" ON "_FeaturedArtists"("B");

-- CreateIndex
CREATE UNIQUE INDEX "_SongGenres_AB_unique" ON "_SongGenres"("A", "B");

-- CreateIndex
CREATE INDEX "_SongGenres_B_index" ON "_SongGenres"("B");

-- AddForeignKey
ALTER TABLE "Article" ADD CONSTRAINT "Article_authorId_fkey" FOREIGN KEY ("authorId") REFERENCES "users"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "Comment" ADD CONSTRAINT "Comment_articleId_fkey" FOREIGN KEY ("articleId") REFERENCES "Article"("id") ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "Comment" ADD CONSTRAINT "Comment_authorId_fkey" FOREIGN KEY ("authorId") REFERENCES "users"("id") ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "Artist" ADD CONSTRAINT "Artist_authorId_fkey" FOREIGN KEY ("authorId") REFERENCES "users"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "Album" ADD CONSTRAINT "Album_authorId_fkey" FOREIGN KEY ("authorId") REFERENCES "users"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "Playlist" ADD CONSTRAINT "Playlist_authorId_fkey" FOREIGN KEY ("authorId") REFERENCES "users"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "Song" ADD CONSTRAINT "Song_albumId_fkey" FOREIGN KEY ("albumId") REFERENCES "Album"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "Song" ADD CONSTRAINT "Song_id_fkey" FOREIGN KEY ("id") REFERENCES "Playlist"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "Song" ADD CONSTRAINT "Song_authorId_fkey" FOREIGN KEY ("authorId") REFERENCES "users"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "Image" ADD CONSTRAINT "Image_artistId_fkey" FOREIGN KEY ("artistId") REFERENCES "Artist"("id") ON DELETE SET NULL ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "Image" ADD CONSTRAINT "Image_albumId_fkey" FOREIGN KEY ("albumId") REFERENCES "Album"("id") ON DELETE SET NULL ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "Image" ADD CONSTRAINT "Image_playlistId_fkey" FOREIGN KEY ("playlistId") REFERENCES "Playlist"("id") ON DELETE SET NULL ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "Image" ADD CONSTRAINT "Image_songId_fkey" FOREIGN KEY ("songId") REFERENCES "Song"("id") ON DELETE SET NULL ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "SongDownloadUrl" ADD CONSTRAINT "SongDownloadUrl_songId_fkey" FOREIGN KEY ("songId") REFERENCES "Song"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "_ArticleToTag" ADD CONSTRAINT "_ArticleToTag_A_fkey" FOREIGN KEY ("A") REFERENCES "Article"("id") ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "_ArticleToTag" ADD CONSTRAINT "_ArticleToTag_B_fkey" FOREIGN KEY ("B") REFERENCES "Tag"("id") ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "_UserFavorites" ADD CONSTRAINT "_UserFavorites_A_fkey" FOREIGN KEY ("A") REFERENCES "Article"("id") ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "_UserFavorites" ADD CONSTRAINT "_UserFavorites_B_fkey" FOREIGN KEY ("B") REFERENCES "users"("id") ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "_UserFollows" ADD CONSTRAINT "_UserFollows_A_fkey" FOREIGN KEY ("A") REFERENCES "users"("id") ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "_UserFollows" ADD CONSTRAINT "_UserFollows_B_fkey" FOREIGN KEY ("B") REFERENCES "users"("id") ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "_ArtistSongs" ADD CONSTRAINT "_ArtistSongs_A_fkey" FOREIGN KEY ("A") REFERENCES "Artist"("id") ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "_ArtistSongs" ADD CONSTRAINT "_ArtistSongs_B_fkey" FOREIGN KEY ("B") REFERENCES "Song"("id") ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "_PrimaryArtists" ADD CONSTRAINT "_PrimaryArtists_A_fkey" FOREIGN KEY ("A") REFERENCES "Album"("id") ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "_PrimaryArtists" ADD CONSTRAINT "_PrimaryArtists_B_fkey" FOREIGN KEY ("B") REFERENCES "Artist"("id") ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "_FeaturedArtists" ADD CONSTRAINT "_FeaturedArtists_A_fkey" FOREIGN KEY ("A") REFERENCES "Album"("id") ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "_FeaturedArtists" ADD CONSTRAINT "_FeaturedArtists_B_fkey" FOREIGN KEY ("B") REFERENCES "Artist"("id") ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "_SongGenres" ADD CONSTRAINT "_SongGenres_A_fkey" FOREIGN KEY ("A") REFERENCES "Genre"("id") ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "_SongGenres" ADD CONSTRAINT "_SongGenres_B_fkey" FOREIGN KEY ("B") REFERENCES "Song"("id") ON DELETE CASCADE ON UPDATE CASCADE;
