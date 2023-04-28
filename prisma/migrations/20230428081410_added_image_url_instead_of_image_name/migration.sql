/*
  Warnings:

  - You are about to drop the column `imageFileName` on the `Project` table. All the data in the column will be lost.

*/
-- AlterTable
ALTER TABLE "Project" DROP COLUMN "imageFileName",
ADD COLUMN     "imageUrl" TEXT;
