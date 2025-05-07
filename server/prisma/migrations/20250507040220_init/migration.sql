-- CreateTable
CREATE TABLE "PromptOptimization" (
    "id" INTEGER NOT NULL PRIMARY KEY AUTOINCREMENT,
    "targetModel" TEXT NOT NULL,
    "sourcePrompt" TEXT NOT NULL,
    "suggestions" TEXT NOT NULL,
    "createdAt" DATETIME NOT NULL DEFAULT CURRENT_TIMESTAMP
);
