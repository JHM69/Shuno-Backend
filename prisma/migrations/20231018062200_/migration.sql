-- CreateTable
CREATE TABLE `Article` (
    `id` INTEGER NOT NULL AUTO_INCREMENT,
    `slug` VARCHAR(191) NOT NULL,
    `title` VARCHAR(191) NOT NULL,
    `description` VARCHAR(191) NOT NULL,
    `body` VARCHAR(191) NOT NULL,
    `createdAt` DATETIME(3) NOT NULL DEFAULT CURRENT_TIMESTAMP(3),
    `updatedAt` DATETIME(3) NOT NULL DEFAULT CURRENT_TIMESTAMP(3),
    `authorId` INTEGER NOT NULL,

    UNIQUE INDEX `Article_slug_key`(`slug`),
    PRIMARY KEY (`id`)
) DEFAULT CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci;

-- CreateTable
CREATE TABLE `Comment` (
    `id` INTEGER NOT NULL AUTO_INCREMENT,
    `createdAt` DATETIME(3) NOT NULL DEFAULT CURRENT_TIMESTAMP(3),
    `updatedAt` DATETIME(3) NOT NULL DEFAULT CURRENT_TIMESTAMP(3),
    `body` VARCHAR(191) NOT NULL,
    `articleId` INTEGER NOT NULL,
    `authorId` INTEGER NOT NULL,

    PRIMARY KEY (`id`)
) DEFAULT CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci;

-- CreateTable
CREATE TABLE `Tag` (
    `id` INTEGER NOT NULL AUTO_INCREMENT,
    `name` VARCHAR(191) NOT NULL,

    UNIQUE INDEX `Tag_name_key`(`name`),
    PRIMARY KEY (`id`)
) DEFAULT CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci;

-- CreateTable
CREATE TABLE `users` (
    `id` INTEGER NOT NULL AUTO_INCREMENT,
    `email` VARCHAR(191) NOT NULL,
    `username` VARCHAR(191) NOT NULL,
    `password` VARCHAR(191) NOT NULL,
    `image` VARCHAR(191) NULL DEFAULT 'https://api.realworld.io/images/smiley-cyrus.jpeg',
    `bio` VARCHAR(191) NULL,
    `createdAt` DATETIME(3) NOT NULL DEFAULT CURRENT_TIMESTAMP(3),
    `updatedAt` DATETIME(3) NOT NULL DEFAULT CURRENT_TIMESTAMP(3),

    UNIQUE INDEX `users_email_key`(`email`),
    UNIQUE INDEX `users_username_key`(`username`),
    PRIMARY KEY (`id`)
) DEFAULT CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci;

-- CreateTable
CREATE TABLE `Artist` (
    `id` INTEGER NOT NULL AUTO_INCREMENT,
    `name` VARCHAR(191) NOT NULL,
    `primaryImage` VARCHAR(191) NOT NULL,
    `followerCount` VARCHAR(191) NOT NULL,
    `fanCount` VARCHAR(191) NOT NULL,
    `isVerified` BOOLEAN NOT NULL,
    `dominantLanguage` VARCHAR(191) NOT NULL,
    `dominantType` VARCHAR(191) NOT NULL,
    `bio` VARCHAR(191) NOT NULL,
    `dob` VARCHAR(191) NOT NULL,
    `fb` VARCHAR(191) NOT NULL,
    `twitter` VARCHAR(191) NOT NULL,
    `wiki` VARCHAR(191) NOT NULL,
    `availableLanguages` VARCHAR(191) NOT NULL,
    `isRadioPresent` BOOLEAN NOT NULL,
    `authorId` INTEGER NOT NULL,

    PRIMARY KEY (`id`)
) DEFAULT CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci;

-- CreateTable
CREATE TABLE `Album` (
    `id` INTEGER NOT NULL AUTO_INCREMENT,
    `title` VARCHAR(191) NOT NULL,
    `releaseYear` INTEGER NOT NULL,
    `label` VARCHAR(191) NOT NULL,
    `language` VARCHAR(191) NOT NULL,
    `origin` VARCHAR(191) NOT NULL,
    `playCount` INTEGER NOT NULL,
    `copyrightText` VARCHAR(191) NOT NULL,
    `isDolbyContent` BOOLEAN NOT NULL,
    `explicitContent` INTEGER NOT NULL,
    `hasLyrics` BOOLEAN NOT NULL,
    `lyricsSnippet` VARCHAR(191) NOT NULL,
    `hasLyric` BOOLEAN NOT NULL,
    `encryptedMediaUrl` VARCHAR(191) NOT NULL,
    `encryptedMediaPath` VARCHAR(191) NOT NULL,
    `mediaPreviewUrl` VARCHAR(191) NOT NULL,
    `permaUrl` VARCHAR(191) NOT NULL,
    `albumUrl` VARCHAR(191) NOT NULL,
    `duration` INTEGER NOT NULL,
    `webp` BOOLEAN NOT NULL,
    `disabled` BOOLEAN NOT NULL,
    `disabledText` VARCHAR(191) NOT NULL,
    `cacheState` BOOLEAN NOT NULL,
    `releaseDate` DATETIME(3) NOT NULL,
    `vcode` VARCHAR(191) NOT NULL,
    `vlink` VARCHAR(191) NOT NULL,
    `trillerAvailable` BOOLEAN NOT NULL,
    `labelUrl` VARCHAR(191) NOT NULL,
    `authorId` INTEGER NOT NULL,

    PRIMARY KEY (`id`)
) DEFAULT CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci;

-- CreateTable
CREATE TABLE `Playlist` (
    `id` INTEGER NOT NULL AUTO_INCREMENT,
    `userId` VARCHAR(191) NOT NULL,
    `name` VARCHAR(191) NOT NULL,
    `followerCount` VARCHAR(191) NOT NULL,
    `songCount` INTEGER NOT NULL,
    `fanCount` VARCHAR(191) NOT NULL,
    `username` VARCHAR(191) NOT NULL,
    `firstname` VARCHAR(191) NOT NULL,
    `lastname` VARCHAR(191) NOT NULL,
    `shares` VARCHAR(191) NOT NULL,
    `url` VARCHAR(191) NOT NULL,
    `authorId` INTEGER NOT NULL,

    PRIMARY KEY (`id`)
) DEFAULT CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci;

-- CreateTable
CREATE TABLE `Genre` (
    `id` INTEGER NOT NULL AUTO_INCREMENT,
    `name` ENUM('POP', 'ROCK', 'HIPHOP', 'RNB', 'JAZZ', 'COUNTRY', 'CLASSICAL', 'METAL', 'BLUES', 'FOLK', 'REGGAE', 'PUNK', 'ELECTRONIC', 'DANCE', 'HOUSE', 'TRANCE', 'TECHNO', 'DUBSTEP', 'DRUMNBASS', 'AMBIENT', 'CHILL', 'LOUNGE', 'TRAP', 'INDIE', 'ALTERNATIVE', 'GRUNGE', 'PSYCHEDELIC', 'EXPERIMENTAL', 'FUNK', 'SOUL', 'DISCO', 'GOSPEL', 'CHRISTIAN', 'INSTRUMENTAL', 'SOUNDTRACK', 'KPOP', 'JPOP', 'ANIME', 'GAME', 'OTHER') NOT NULL,

    PRIMARY KEY (`id`)
) DEFAULT CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci;

-- CreateTable
CREATE TABLE `Song` (
    `id` INTEGER NOT NULL AUTO_INCREMENT,
    `name` VARCHAR(191) NOT NULL,
    `albumId` INTEGER NOT NULL,
    `year` VARCHAR(191) NOT NULL,
    `releaseDate` DATETIME(3) NULL,
    `duration` INTEGER NOT NULL,
    `label` VARCHAR(191) NOT NULL,
    `explicitContent` INTEGER NOT NULL,
    `playCount` INTEGER NOT NULL,
    `language` VARCHAR(191) NOT NULL,
    `hasLyrics` BOOLEAN NOT NULL,
    `url` VARCHAR(191) NOT NULL,
    `copyright` VARCHAR(191) NOT NULL,
    `contentType` ENUM('MUSIC', 'PODCAST', 'AUDIOBOOK', 'POEM', 'PAPER') NOT NULL,
    `origin` VARCHAR(191) NOT NULL,
    `lyricsSnippet` VARCHAR(191) NOT NULL,
    `encryptedMediaUrl` VARCHAR(191) NOT NULL,
    `encryptedMediaPath` VARCHAR(191) NOT NULL,
    `mediaPreviewUrl` VARCHAR(191) NOT NULL,
    `permaUrl` VARCHAR(191) NOT NULL,
    `albumUrl` VARCHAR(191) NOT NULL,
    `rightId` INTEGER NOT NULL,
    `kbps320` BOOLEAN NOT NULL,
    `isDolbyContent` BOOLEAN NOT NULL,
    `disabled` VARCHAR(191) NOT NULL,
    `disabledText` VARCHAR(191) NOT NULL,
    `cacheState` VARCHAR(191) NOT NULL,
    `vcode` VARCHAR(191) NOT NULL,
    `trillerAvailable` BOOLEAN NOT NULL,
    `labelUrl` VARCHAR(191) NOT NULL,
    `authorId` INTEGER NOT NULL,

    PRIMARY KEY (`id`)
) DEFAULT CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci;

-- CreateTable
CREATE TABLE `Image` (
    `id` INTEGER NOT NULL AUTO_INCREMENT,
    `quality` VARCHAR(191) NOT NULL,
    `link` VARCHAR(191) NOT NULL,
    `artistId` INTEGER NULL,
    `albumId` INTEGER NULL,
    `playlistId` INTEGER NULL,
    `songId` INTEGER NULL,

    PRIMARY KEY (`id`)
) DEFAULT CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci;

-- CreateTable
CREATE TABLE `SongDownloadUrl` (
    `id` INTEGER NOT NULL AUTO_INCREMENT,
    `quality` VARCHAR(191) NOT NULL,
    `link` VARCHAR(191) NOT NULL,
    `songId` INTEGER NOT NULL,

    PRIMARY KEY (`id`)
) DEFAULT CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci;

-- CreateTable
CREATE TABLE `_ArticleToTag` (
    `A` INTEGER NOT NULL,
    `B` INTEGER NOT NULL,

    UNIQUE INDEX `_ArticleToTag_AB_unique`(`A`, `B`),
    INDEX `_ArticleToTag_B_index`(`B`)
) DEFAULT CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci;

-- CreateTable
CREATE TABLE `_UserFavorites` (
    `A` INTEGER NOT NULL,
    `B` INTEGER NOT NULL,

    UNIQUE INDEX `_UserFavorites_AB_unique`(`A`, `B`),
    INDEX `_UserFavorites_B_index`(`B`)
) DEFAULT CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci;

-- CreateTable
CREATE TABLE `_UserFollows` (
    `A` INTEGER NOT NULL,
    `B` INTEGER NOT NULL,

    UNIQUE INDEX `_UserFollows_AB_unique`(`A`, `B`),
    INDEX `_UserFollows_B_index`(`B`)
) DEFAULT CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci;

-- CreateTable
CREATE TABLE `_ArtistSongs` (
    `A` INTEGER NOT NULL,
    `B` INTEGER NOT NULL,

    UNIQUE INDEX `_ArtistSongs_AB_unique`(`A`, `B`),
    INDEX `_ArtistSongs_B_index`(`B`)
) DEFAULT CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci;

-- CreateTable
CREATE TABLE `_PrimaryArtists` (
    `A` INTEGER NOT NULL,
    `B` INTEGER NOT NULL,

    UNIQUE INDEX `_PrimaryArtists_AB_unique`(`A`, `B`),
    INDEX `_PrimaryArtists_B_index`(`B`)
) DEFAULT CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci;

-- CreateTable
CREATE TABLE `_FeaturedArtists` (
    `A` INTEGER NOT NULL,
    `B` INTEGER NOT NULL,

    UNIQUE INDEX `_FeaturedArtists_AB_unique`(`A`, `B`),
    INDEX `_FeaturedArtists_B_index`(`B`)
) DEFAULT CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci;

-- CreateTable
CREATE TABLE `_SongGenres` (
    `A` INTEGER NOT NULL,
    `B` INTEGER NOT NULL,

    UNIQUE INDEX `_SongGenres_AB_unique`(`A`, `B`),
    INDEX `_SongGenres_B_index`(`B`)
) DEFAULT CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci;

-- AddForeignKey
ALTER TABLE `Article` ADD CONSTRAINT `Article_authorId_fkey` FOREIGN KEY (`authorId`) REFERENCES `users`(`id`) ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE `Comment` ADD CONSTRAINT `Comment_articleId_fkey` FOREIGN KEY (`articleId`) REFERENCES `Article`(`id`) ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE `Comment` ADD CONSTRAINT `Comment_authorId_fkey` FOREIGN KEY (`authorId`) REFERENCES `users`(`id`) ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE `Artist` ADD CONSTRAINT `Artist_authorId_fkey` FOREIGN KEY (`authorId`) REFERENCES `users`(`id`) ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE `Album` ADD CONSTRAINT `Album_authorId_fkey` FOREIGN KEY (`authorId`) REFERENCES `users`(`id`) ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE `Playlist` ADD CONSTRAINT `Playlist_authorId_fkey` FOREIGN KEY (`authorId`) REFERENCES `users`(`id`) ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE `Song` ADD CONSTRAINT `Song_albumId_fkey` FOREIGN KEY (`albumId`) REFERENCES `Album`(`id`) ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE `Song` ADD CONSTRAINT `Song_id_fkey` FOREIGN KEY (`id`) REFERENCES `Playlist`(`id`) ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE `Song` ADD CONSTRAINT `Song_authorId_fkey` FOREIGN KEY (`authorId`) REFERENCES `users`(`id`) ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE `Image` ADD CONSTRAINT `Image_artistId_fkey` FOREIGN KEY (`artistId`) REFERENCES `Artist`(`id`) ON DELETE SET NULL ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE `Image` ADD CONSTRAINT `Image_albumId_fkey` FOREIGN KEY (`albumId`) REFERENCES `Album`(`id`) ON DELETE SET NULL ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE `Image` ADD CONSTRAINT `Image_playlistId_fkey` FOREIGN KEY (`playlistId`) REFERENCES `Playlist`(`id`) ON DELETE SET NULL ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE `Image` ADD CONSTRAINT `Image_songId_fkey` FOREIGN KEY (`songId`) REFERENCES `Song`(`id`) ON DELETE SET NULL ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE `SongDownloadUrl` ADD CONSTRAINT `SongDownloadUrl_songId_fkey` FOREIGN KEY (`songId`) REFERENCES `Song`(`id`) ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE `_ArticleToTag` ADD CONSTRAINT `_ArticleToTag_A_fkey` FOREIGN KEY (`A`) REFERENCES `Article`(`id`) ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE `_ArticleToTag` ADD CONSTRAINT `_ArticleToTag_B_fkey` FOREIGN KEY (`B`) REFERENCES `Tag`(`id`) ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE `_UserFavorites` ADD CONSTRAINT `_UserFavorites_A_fkey` FOREIGN KEY (`A`) REFERENCES `Article`(`id`) ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE `_UserFavorites` ADD CONSTRAINT `_UserFavorites_B_fkey` FOREIGN KEY (`B`) REFERENCES `users`(`id`) ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE `_UserFollows` ADD CONSTRAINT `_UserFollows_A_fkey` FOREIGN KEY (`A`) REFERENCES `users`(`id`) ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE `_UserFollows` ADD CONSTRAINT `_UserFollows_B_fkey` FOREIGN KEY (`B`) REFERENCES `users`(`id`) ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE `_ArtistSongs` ADD CONSTRAINT `_ArtistSongs_A_fkey` FOREIGN KEY (`A`) REFERENCES `Artist`(`id`) ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE `_ArtistSongs` ADD CONSTRAINT `_ArtistSongs_B_fkey` FOREIGN KEY (`B`) REFERENCES `Song`(`id`) ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE `_PrimaryArtists` ADD CONSTRAINT `_PrimaryArtists_A_fkey` FOREIGN KEY (`A`) REFERENCES `Album`(`id`) ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE `_PrimaryArtists` ADD CONSTRAINT `_PrimaryArtists_B_fkey` FOREIGN KEY (`B`) REFERENCES `Artist`(`id`) ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE `_FeaturedArtists` ADD CONSTRAINT `_FeaturedArtists_A_fkey` FOREIGN KEY (`A`) REFERENCES `Album`(`id`) ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE `_FeaturedArtists` ADD CONSTRAINT `_FeaturedArtists_B_fkey` FOREIGN KEY (`B`) REFERENCES `Artist`(`id`) ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE `_SongGenres` ADD CONSTRAINT `_SongGenres_A_fkey` FOREIGN KEY (`A`) REFERENCES `Genre`(`id`) ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE `_SongGenres` ADD CONSTRAINT `_SongGenres_B_fkey` FOREIGN KEY (`B`) REFERENCES `Song`(`id`) ON DELETE CASCADE ON UPDATE CASCADE;
