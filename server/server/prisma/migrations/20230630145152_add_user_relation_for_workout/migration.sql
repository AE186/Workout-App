/*
  Warnings:

  - Added the required column `userId` to the `workout` table without a default value. This is not possible if the table is not empty.

*/
-- AlterTable
ALTER TABLE "workout" ADD COLUMN     "userId" TEXT NOT NULL;

-- AddForeignKey
ALTER TABLE "workout" ADD CONSTRAINT "workout_userId_fkey" FOREIGN KEY ("userId") REFERENCES "user"("id") ON DELETE RESTRICT ON UPDATE CASCADE;
