-- AlterTable
ALTER TABLE "artists" ALTER COLUMN "primaryImage" SET DEFAULT 'http://54.80.47.120:5001/logo.png',
ALTER COLUMN "dominantType" SET DEFAULT 'singer',
ALTER COLUMN "bio" SET DEFAULT 'This is a bio',
ALTER COLUMN "dob" SET DEFAULT '2021-01-01',
ALTER COLUMN "fb" SET DEFAULT 'https://www.facebook.com/',
ALTER COLUMN "twitter" SET DEFAULT 'https://twitter.com/home',
ALTER COLUMN "wiki" SET DEFAULT 'https://en.wikipedia.org/wiki/Main_Page',
ALTER COLUMN "availableLanguages" SET DEFAULT 'en';
