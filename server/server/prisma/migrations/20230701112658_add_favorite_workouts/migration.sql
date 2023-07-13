-- CreateTable
CREATE TABLE "_favorite" (
    "A" TEXT NOT NULL,
    "B" TEXT NOT NULL
);

-- CreateIndex
CREATE UNIQUE INDEX "_favorite_AB_unique" ON "_favorite"("A", "B");

-- CreateIndex
CREATE INDEX "_favorite_B_index" ON "_favorite"("B");

-- AddForeignKey
ALTER TABLE "_favorite" ADD CONSTRAINT "_favorite_A_fkey" FOREIGN KEY ("A") REFERENCES "user"("id") ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "_favorite" ADD CONSTRAINT "_favorite_B_fkey" FOREIGN KEY ("B") REFERENCES "workout"("id") ON DELETE CASCADE ON UPDATE CASCADE;
