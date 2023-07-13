/*
  Warnings:

  - You are about to drop the `_targetToworkout` table. If the table is not empty, all the data it contains will be lost.
  - You are about to drop the `target` table. If the table is not empty, all the data it contains will be lost.

*/
-- DropForeignKey
ALTER TABLE "_targetToworkout" DROP CONSTRAINT "_targetToworkout_A_fkey";

-- DropForeignKey
ALTER TABLE "_targetToworkout" DROP CONSTRAINT "_targetToworkout_B_fkey";

-- DropTable
DROP TABLE "_targetToworkout";

-- DropTable
DROP TABLE "target";

-- CreateTable
CREATE TABLE "trains" (
    "id" TEXT NOT NULL,
    "muscle" TEXT NOT NULL,

    CONSTRAINT "trains_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "_trainsToworkout" (
    "A" TEXT NOT NULL,
    "B" TEXT NOT NULL
);

-- CreateIndex
CREATE UNIQUE INDEX "_trainsToworkout_AB_unique" ON "_trainsToworkout"("A", "B");

-- CreateIndex
CREATE INDEX "_trainsToworkout_B_index" ON "_trainsToworkout"("B");

-- AddForeignKey
ALTER TABLE "_trainsToworkout" ADD CONSTRAINT "_trainsToworkout_A_fkey" FOREIGN KEY ("A") REFERENCES "trains"("id") ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "_trainsToworkout" ADD CONSTRAINT "_trainsToworkout_B_fkey" FOREIGN KEY ("B") REFERENCES "workout"("id") ON DELETE CASCADE ON UPDATE CASCADE;
