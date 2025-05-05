-- CreateTable
CREATE TABLE "PromptTranslation" (
    "id" INTEGER NOT NULL PRIMARY KEY AUTOINCREMENT,
    "sourceModel" TEXT NOT NULL,
    "targetModel" TEXT NOT NULL,
    "sourcePrompt" TEXT NOT NULL,
    "translatedPrompt" TEXT NOT NULL,
    "createdAt" DATETIME NOT NULL DEFAULT CURRENT_TIMESTAMP
);
