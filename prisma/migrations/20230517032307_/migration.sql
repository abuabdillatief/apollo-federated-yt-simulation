/*
  Warnings:

  - You are about to drop the column `total_click` on the `Video` table. All the data in the column will be lost.
  - You are about to drop the column `total_played` on the `Video` table. All the data in the column will be lost.
  - Added the required column `totalClick` to the `Video` table without a default value. This is not possible if the table is not empty.
  - Added the required column `totalPlayed` to the `Video` table without a default value. This is not possible if the table is not empty.

*/
-- AlterTable
ALTER TABLE "Video" DROP COLUMN "total_click",
DROP COLUMN "total_played",
ADD COLUMN     "totalClick" INTEGER NOT NULL,
ADD COLUMN     "totalPlayed" INTEGER NOT NULL;
