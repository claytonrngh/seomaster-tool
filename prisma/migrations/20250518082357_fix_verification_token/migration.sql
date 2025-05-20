-- CreateTable
CREATE TABLE "VerificationToken" (
    "token" TEXT NOT NULL PRIMARY KEY,
    "userId" TEXT NOT NULL,
    "expires" DATETIME NOT NULL,
    "createdAt" DATETIME NOT NULL DEFAULT CURRENT_TIMESTAMP,
    CONSTRAINT "VerificationToken_userId_fkey" FOREIGN KEY ("userId") REFERENCES "User" ("id") ON DELETE RESTRICT ON UPDATE CASCADE
);

-- RedefineTables
PRAGMA defer_foreign_keys=ON;
PRAGMA foreign_keys=OFF;
CREATE TABLE "new_CreditLog" (
    "id" TEXT NOT NULL PRIMARY KEY,
    "userId" TEXT NOT NULL,
    "type" TEXT NOT NULL,
    "amount" INTEGER NOT NULL,
    "metadata" TEXT,
    "createdAt" DATETIME NOT NULL DEFAULT CURRENT_TIMESTAMP,
    CONSTRAINT "CreditLog_userId_fkey" FOREIGN KEY ("userId") REFERENCES "User" ("id") ON DELETE RESTRICT ON UPDATE CASCADE
);
INSERT INTO "new_CreditLog" ("amount", "createdAt", "id", "metadata", "type", "userId") SELECT "amount", "createdAt", "id", "metadata", "type", "userId" FROM "CreditLog";
DROP TABLE "CreditLog";
ALTER TABLE "new_CreditLog" RENAME TO "CreditLog";
PRAGMA foreign_keys=ON;
PRAGMA defer_foreign_keys=OFF;
