/*
  Warnings:

  - The values [STARTER,PRO] on the enum `SubscriptionTier` will be removed. If these variants are still used in the database, this will fail.

*/
-- AlterEnum
BEGIN;
CREATE TYPE "SubscriptionTier_new" AS ENUM ('FREE', 'FTF', 'FSMVP', 'ENTERPRISE');
ALTER TABLE "User" ALTER COLUMN "subscriptionPlan" DROP DEFAULT;
ALTER TABLE "User" ALTER COLUMN "subscriptionPlan" TYPE "SubscriptionTier_new" USING ("subscriptionPlan"::text::"SubscriptionTier_new");
ALTER TYPE "SubscriptionTier" RENAME TO "SubscriptionTier_old";
ALTER TYPE "SubscriptionTier_new" RENAME TO "SubscriptionTier";
DROP TYPE "SubscriptionTier_old";
ALTER TABLE "User" ALTER COLUMN "subscriptionPlan" SET DEFAULT 'FREE';
COMMIT;
