-- DropForeignKey
ALTER TABLE "plan" DROP CONSTRAINT "plan_workoutId_fkey";

-- DropForeignKey
ALTER TABLE "tip" DROP CONSTRAINT "tip_workoutId_fkey";

-- DropForeignKey
ALTER TABLE "workout" DROP CONSTRAINT "workout_userId_fkey";

-- AddForeignKey
ALTER TABLE "workout" ADD CONSTRAINT "workout_userId_fkey" FOREIGN KEY ("userId") REFERENCES "user"("id") ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "plan" ADD CONSTRAINT "plan_workoutId_fkey" FOREIGN KEY ("workoutId") REFERENCES "workout"("id") ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "tip" ADD CONSTRAINT "tip_workoutId_fkey" FOREIGN KEY ("workoutId") REFERENCES "workout"("id") ON DELETE CASCADE ON UPDATE CASCADE;
