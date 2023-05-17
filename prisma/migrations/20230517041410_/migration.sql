-- CreateEnum
CREATE TYPE "Action" AS ENUM ('Unset', 'Play', 'Pause', 'Skip', 'MovePage');

-- CreateTable
CREATE TABLE "ActionDetail" (
    "id" SERIAL NOT NULL,
    "videoId" INTEGER NOT NULL,
    "action" "Action" NOT NULL,
    "previousAction" "Action" NOT NULL,
    "createdAt" TIMESTAMP(3) NOT NULL,

    CONSTRAINT "ActionDetail_pkey" PRIMARY KEY ("id")
);
