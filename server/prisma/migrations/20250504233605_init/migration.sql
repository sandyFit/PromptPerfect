-- CreateTable
CREATE TABLE "PromptOutput" (
    "id" TEXT NOT NULL PRIMARY KEY,
    "output" TEXT NOT NULL,
    "model" TEXT NOT NULL,
    "inferredPromptId" TEXT,
    "createdAt" DATETIME NOT NULL DEFAULT CURRENT_TIMESTAMP,
    CONSTRAINT "PromptOutput_inferredPromptId_fkey" FOREIGN KEY ("inferredPromptId") REFERENCES "PromptTemplate" ("id") ON DELETE SET NULL ON UPDATE CASCADE
);

-- CreateTable
CREATE TABLE "PromptTemplate" (
    "id" TEXT NOT NULL PRIMARY KEY,
    "text" TEXT NOT NULL,
    "tone" TEXT,
    "function" TEXT,
    "createdAt" DATETIME NOT NULL DEFAULT CURRENT_TIMESTAMP
);
