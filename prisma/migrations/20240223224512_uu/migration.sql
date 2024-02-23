-- AlterTable
ALTER TABLE "artists" ALTER COLUMN "creatorType" SET DEFAULT 'MUSIC',
ALTER COLUMN "isVerified" DROP NOT NULL,
ALTER COLUMN "isVerified" SET DEFAULT false,
ALTER COLUMN "isRadioPresent" SET DEFAULT false,
ALTER COLUMN "isBand" SET DEFAULT false;
