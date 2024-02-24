-- AlterTable
ALTER TABLE "artists" ALTER COLUMN "dominantLanguage" SET DEFAULT 'en',
ALTER COLUMN "dominantType" SET DEFAULT 'singer',
ALTER COLUMN "bio" SET DEFAULT 'This is a bio',
ALTER COLUMN "dob" SET DEFAULT '2021-01-01',
ALTER COLUMN "fb" SET DEFAULT 'https://www.facebook.com/',
ALTER COLUMN "twitter" SET DEFAULT 'https://twitter.com/home',
ALTER COLUMN "wiki" SET DEFAULT 'https://en.wikipedia.org/wiki/Main_Page',
ALTER COLUMN "availableLanguages" SET DEFAULT 'en';

-- AlterTable
ALTER TABLE "songs" ADD COLUMN     "tags" TEXT;
