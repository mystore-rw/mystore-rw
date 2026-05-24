/*
  Warnings:

  - You are about to drop the column `clerkId` on the `User` table. All the data in the column will be lost.
  - Added the required column `whatsappNumber` to the `Shop` table without a default value. This is not possible if the table is not empty.

*/
-- DropIndex
DROP INDEX "User_clerkId_key";

-- AlterTable
ALTER TABLE "Product" ALTER COLUMN "price" DROP NOT NULL;

-- AlterTable
ALTER TABLE "Shop" ADD COLUMN     "whatsappNumber" TEXT NOT NULL;

-- AlterTable
ALTER TABLE "User" DROP COLUMN "clerkId";
