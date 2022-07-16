/*
  Warnings:

  - You are about to drop the column `incomeAmount` on the `Portfolio` table. All the data in the column will be lost.
  - You are about to drop the column `incomeFrequency` on the `Portfolio` table. All the data in the column will be lost.
  - You are about to drop the `Budget` table. If the table is not empty, all the data it contains will be lost.
  - You are about to drop the `Note` table. If the table is not empty, all the data it contains will be lost.
  - You are about to drop the `PortfolioHistory` table. If the table is not empty, all the data it contains will be lost.
  - You are about to drop the `SubBudget` table. If the table is not empty, all the data it contains will be lost.
  - You are about to drop the `UserPreferences` table. If the table is not empty, all the data it contains will be lost.
  - A unique constraint covering the columns `[id]` on the table `Post` will be added. If there are existing duplicate values, this will fail.
  - Added the required column `userId` to the `Post` table without a default value. This is not possible if the table is not empty.

*/
-- DropForeignKey
ALTER TABLE "Budget" DROP CONSTRAINT "Budget_userId_fkey";

-- DropForeignKey
ALTER TABLE "Note" DROP CONSTRAINT "Note_userId_fkey";

-- DropForeignKey
ALTER TABLE "PortfolioHistory" DROP CONSTRAINT "PortfolioHistory_userId_fkey";

-- DropForeignKey
ALTER TABLE "SubBudget" DROP CONSTRAINT "SubBudget_budgetId_fkey";

-- DropForeignKey
ALTER TABLE "SubBudget" DROP CONSTRAINT "SubBudget_userId_fkey";

-- DropForeignKey
ALTER TABLE "UserPreferences" DROP CONSTRAINT "UserPreferences_userId_fkey";

-- AlterTable
ALTER TABLE "Portfolio" DROP COLUMN "incomeAmount",
DROP COLUMN "incomeFrequency";

-- AlterTable
ALTER TABLE "Post" ADD COLUMN     "archived" BOOLEAN NOT NULL DEFAULT false,
ADD COLUMN     "deleted" BOOLEAN NOT NULL DEFAULT false,
ADD COLUMN     "userId" TEXT NOT NULL;

-- DropTable
DROP TABLE "Budget";

-- DropTable
DROP TABLE "Note";

-- DropTable
DROP TABLE "PortfolioHistory";

-- DropTable
DROP TABLE "SubBudget";

-- DropTable
DROP TABLE "UserPreferences";

-- DropEnum
DROP TYPE "BudgetCategory";

-- DropEnum
DROP TYPE "Frequency";

-- DropEnum
DROP TYPE "SupportedCurrencies";

-- DropEnum
DROP TYPE "ThemePreferences";

-- CreateIndex
CREATE UNIQUE INDEX "Post_id_key" ON "Post"("id");

-- AddForeignKey
ALTER TABLE "Post" ADD CONSTRAINT "Post_userId_fkey" FOREIGN KEY ("userId") REFERENCES "User"("id") ON DELETE CASCADE ON UPDATE CASCADE;
