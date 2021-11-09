/*
  Warnings:

  - You are about to drop the column `table_id` on the `Card` table. All the data in the column will be lost.

*/
-- CreateTable
CREATE TABLE "Column" (
    "id" INTEGER NOT NULL PRIMARY KEY AUTOINCREMENT,
    "title" TEXT NOT NULL,
    "description" TEXT DEFAULT '',
    "table_id" INTEGER,
    "is_archived" BOOLEAN NOT NULL DEFAULT false,
    CONSTRAINT "Column_table_id_fkey" FOREIGN KEY ("table_id") REFERENCES "Table" ("id") ON DELETE SET NULL ON UPDATE CASCADE
);

-- RedefineTables
PRAGMA foreign_keys=OFF;
CREATE TABLE "new_Board" (
    "id" INTEGER NOT NULL PRIMARY KEY AUTOINCREMENT,
    "title" TEXT NOT NULL,
    "description" TEXT DEFAULT '',
    "user_id" INTEGER,
    "is_archived" BOOLEAN NOT NULL DEFAULT false,
    CONSTRAINT "Board_user_id_fkey" FOREIGN KEY ("user_id") REFERENCES "User" ("id") ON DELETE SET NULL ON UPDATE CASCADE
);
INSERT INTO "new_Board" ("description", "id", "title", "user_id") SELECT "description", "id", "title", "user_id" FROM "Board";
DROP TABLE "Board";
ALTER TABLE "new_Board" RENAME TO "Board";
CREATE TABLE "new_Table" (
    "id" INTEGER NOT NULL PRIMARY KEY AUTOINCREMENT,
    "title" TEXT NOT NULL,
    "description" TEXT DEFAULT '',
    "board_id" INTEGER,
    "is_archived" BOOLEAN NOT NULL DEFAULT false,
    CONSTRAINT "Table_board_id_fkey" FOREIGN KEY ("board_id") REFERENCES "Board" ("id") ON DELETE SET NULL ON UPDATE CASCADE
);
INSERT INTO "new_Table" ("board_id", "description", "id", "title") SELECT "board_id", "description", "id", "title" FROM "Table";
DROP TABLE "Table";
ALTER TABLE "new_Table" RENAME TO "Table";
CREATE TABLE "new_Card" (
    "id" INTEGER NOT NULL PRIMARY KEY AUTOINCREMENT,
    "title" TEXT NOT NULL,
    "description" TEXT DEFAULT '',
    "column_id" INTEGER,
    "is_archived" BOOLEAN NOT NULL DEFAULT false,
    CONSTRAINT "Card_column_id_fkey" FOREIGN KEY ("column_id") REFERENCES "Column" ("id") ON DELETE SET NULL ON UPDATE CASCADE
);
INSERT INTO "new_Card" ("description", "id", "title") SELECT "description", "id", "title" FROM "Card";
DROP TABLE "Card";
ALTER TABLE "new_Card" RENAME TO "Card";
PRAGMA foreign_key_check;
PRAGMA foreign_keys=ON;
