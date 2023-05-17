-- CreateTable
CREATE TABLE "User" (
    "id" SERIAL NOT NULL,
    "currentVideoId" INTEGER NOT NULL,

    CONSTRAINT "User_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "Video" (
    "id" SERIAL NOT NULL,
    "duration" INTEGER NOT NULL,
    "total_click" INTEGER NOT NULL,
    "total_played" INTEGER NOT NULL,

    CONSTRAINT "Video_pkey" PRIMARY KEY ("id")
);
