/*
  Warnings:

  - You are about to drop the `_trainsToworkout` table. If the table is not empty, all the data it contains will be lost.
  - You are about to drop the `trains` table. If the table is not empty, all the data it contains will be lost.

*/
-- DropForeignKey
ALTER TABLE "_trainsToworkout" DROP CONSTRAINT "_trainsToworkout_A_fkey";

-- DropForeignKey
ALTER TABLE "_trainsToworkout" DROP CONSTRAINT "_trainsToworkout_B_fkey";

-- DropTable
DROP TABLE "_trainsToworkout";

-- DropTable
DROP TABLE "trains";

-- CreateTable
CREATE TABLE "muscle" (
    "id" TEXT NOT NULL,
    "muscle" TEXT NOT NULL,

    CONSTRAINT "muscle_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "_muscleToworkout" (
    "A" TEXT NOT NULL,
    "B" TEXT NOT NULL
);

-- CreateIndex
CREATE UNIQUE INDEX "_muscleToworkout_AB_unique" ON "_muscleToworkout"("A", "B");

-- CreateIndex
CREATE INDEX "_muscleToworkout_B_index" ON "_muscleToworkout"("B");

-- AddForeignKey
ALTER TABLE "_muscleToworkout" ADD CONSTRAINT "_muscleToworkout_A_fkey" FOREIGN KEY ("A") REFERENCES "muscle"("id") ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "_muscleToworkout" ADD CONSTRAINT "_muscleToworkout_B_fkey" FOREIGN KEY ("B") REFERENCES "workout"("id") ON DELETE CASCADE ON UPDATE CASCADE;
