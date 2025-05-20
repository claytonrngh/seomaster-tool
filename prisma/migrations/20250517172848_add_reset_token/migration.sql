/*
  Warnings:

  - You are about to drop the column `rewritten` on the `RewordHistory` table. All the data in the column will be lost.
  - Added the required column `result` to the `RewordHistory` table without a default value. This is not possible if the table is not empty.

*/
-- AlterTable
ALTER TABLE "User" ADD COLUMN "resetToken" TEXT;
ALTER TABLE "User" ADD COLUMN "resetTokenExpires" DATETIME;

-- CreateTable
CREATE TABLE "CreditLog" (
    "id" TEXT NOT NULL PRIMARY KEY,
    "userId" TEXT NOT NULL,
    "type" TEXT NOT NULL,
    "amount" INTEGER NOT NULL,
    "metadata" JSONB,
    "createdAt" DATETIME NOT NULL DEFAULT CURRENT_TIMESTAMP,
    CONSTRAINT "CreditLog_userId_fkey" FOREIGN KEY ("userId") REFERENCES "User" ("id") ON DELETE RESTRICT ON UPDATE CASCADE
);

-- RedefineTables
PRAGMA defer_foreign_keys=ON;
PRAGMA foreign_keys=OFF;
CREATE TABLE "new_RewordHistory" (
    "id" TEXT NOT NULL PRIMARY KEY,
    "original" TEXT NOT NULL,
    "result" TEXT NOT NULL,
    "style" TEXT,
    "createdAt" DATETIME NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "userId" TEXT,
    CONSTRAINT "RewordHistory_userId_fkey" FOREIGN KEY ("userId") REFERENCES "User" ("id") ON DELETE SET NULL ON UPDATE CASCADE
);
INSERT INTO "new_RewordHistory" ("createdAt", "id", "original", "userId") SELECT "createdAt", "id", "original", "userId" FROM "RewordHistory";
DROP TABLE "RewordHistory";
ALTER TABLE "new_RewordHistory" RENAME TO "RewordHistory";
PRAGMA foreign_keys=ON;
PRAGMA defer_foreign_keys=OFF;
