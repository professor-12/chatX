/*
  Warnings:

  - You are about to drop the `_SubscriptionToUser` table. If the table is not empty, all the data it contains will be lost.
  - A unique constraint covering the columns `[userId]` on the table `Subscription` will be added. If there are existing duplicate values, this will fail.
  - Added the required column `userId` to the `Subscription` table without a default value. This is not possible if the table is not empty.

*/
-- DropForeignKey
ALTER TABLE "_SubscriptionToUser" DROP CONSTRAINT "_SubscriptionToUser_A_fkey";

-- DropForeignKey
ALTER TABLE "_SubscriptionToUser" DROP CONSTRAINT "_SubscriptionToUser_B_fkey";

-- AlterTable
ALTER TABLE "Subscription" ADD COLUMN     "userId" TEXT NOT NULL;

-- DropTable
DROP TABLE "_SubscriptionToUser";

-- CreateIndex
CREATE UNIQUE INDEX "Subscription_userId_key" ON "Subscription"("userId");

-- AddForeignKey
ALTER TABLE "Subscription" ADD CONSTRAINT "Subscription_userId_fkey" FOREIGN KEY ("userId") REFERENCES "User"("_id") ON DELETE RESTRICT ON UPDATE CASCADE;
