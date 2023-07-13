-- CreateTable
CREATE TABLE "user" (
    "id" TEXT NOT NULL,
    "name" TEXT NOT NULL,
    "email" TEXT NOT NULL,
    "password" TEXT NOT NULL,
    "dob" TIMESTAMP(3) NOT NULL,
    "type" TEXT NOT NULL DEFAULT 'BASIC',

    CONSTRAINT "user_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "workout" (
    "id" TEXT NOT NULL,
    "name" TEXT NOT NULL,
    "desc" TEXT NOT NULL,

    CONSTRAINT "workout_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "plan" (
    "id" TEXT NOT NULL,
    "sets" INTEGER NOT NULL,
    "reps" INTEGER NOT NULL,
    "exerciseId" TEXT NOT NULL,
    "workoutId" TEXT NOT NULL,

    CONSTRAINT "plan_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "exercise" (
    "id" TEXT NOT NULL,
    "name" TEXT NOT NULL,

    CONSTRAINT "exercise_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "target" (
    "id" TEXT NOT NULL,
    "name" TEXT NOT NULL,

    CONSTRAINT "target_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "equipment" (
    "id" TEXT NOT NULL,
    "name" TEXT NOT NULL,

    CONSTRAINT "equipment_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "tip" (
    "id" TEXT NOT NULL,
    "tip" TEXT NOT NULL,
    "workoutId" TEXT NOT NULL,

    CONSTRAINT "tip_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "_targetToworkout" (
    "A" TEXT NOT NULL,
    "B" TEXT NOT NULL
);

-- CreateTable
CREATE TABLE "_equipmentToworkout" (
    "A" TEXT NOT NULL,
    "B" TEXT NOT NULL
);

-- CreateIndex
CREATE UNIQUE INDEX "_targetToworkout_AB_unique" ON "_targetToworkout"("A", "B");

-- CreateIndex
CREATE INDEX "_targetToworkout_B_index" ON "_targetToworkout"("B");

-- CreateIndex
CREATE UNIQUE INDEX "_equipmentToworkout_AB_unique" ON "_equipmentToworkout"("A", "B");

-- CreateIndex
CREATE INDEX "_equipmentToworkout_B_index" ON "_equipmentToworkout"("B");

-- AddForeignKey
ALTER TABLE "plan" ADD CONSTRAINT "plan_exerciseId_fkey" FOREIGN KEY ("exerciseId") REFERENCES "exercise"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "plan" ADD CONSTRAINT "plan_workoutId_fkey" FOREIGN KEY ("workoutId") REFERENCES "workout"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "tip" ADD CONSTRAINT "tip_workoutId_fkey" FOREIGN KEY ("workoutId") REFERENCES "workout"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "_targetToworkout" ADD CONSTRAINT "_targetToworkout_A_fkey" FOREIGN KEY ("A") REFERENCES "target"("id") ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "_targetToworkout" ADD CONSTRAINT "_targetToworkout_B_fkey" FOREIGN KEY ("B") REFERENCES "workout"("id") ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "_equipmentToworkout" ADD CONSTRAINT "_equipmentToworkout_A_fkey" FOREIGN KEY ("A") REFERENCES "equipment"("id") ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "_equipmentToworkout" ADD CONSTRAINT "_equipmentToworkout_B_fkey" FOREIGN KEY ("B") REFERENCES "workout"("id") ON DELETE CASCADE ON UPDATE CASCADE;
