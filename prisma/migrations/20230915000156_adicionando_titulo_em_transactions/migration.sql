-- RedefineTables
PRAGMA foreign_keys=OFF;
CREATE TABLE "new_transactions" (
    "id" INTEGER NOT NULL PRIMARY KEY AUTOINCREMENT,
    "title" TEXT NOT NULL DEFAULT 'Sem titulo',
    "value" REAL NOT NULL,
    "type" TEXT NOT NULL DEFAULT 'ENTRADA',
    "categoria" TEXT NOT NULL,
    "dateCreate" DATETIME NOT NULL DEFAULT CURRENT_TIMESTAMP
);
INSERT INTO "new_transactions" ("categoria", "dateCreate", "id", "type", "value") SELECT "categoria", "dateCreate", "id", "type", "value" FROM "transactions";
DROP TABLE "transactions";
ALTER TABLE "new_transactions" RENAME TO "transactions";
PRAGMA foreign_key_check;
PRAGMA foreign_keys=ON;
