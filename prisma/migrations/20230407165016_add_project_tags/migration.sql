-- AlterTable
ALTER TABLE "Project" ADD COLUMN     "tags" TEXT[] DEFAULT ARRAY[]::TEXT[],
ALTER COLUMN "raised" SET DEFAULT 0;
