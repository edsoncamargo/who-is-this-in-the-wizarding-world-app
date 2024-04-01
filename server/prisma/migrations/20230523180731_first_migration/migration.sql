-- CreateTable
CREATE TABLE "Character" (
    "id" TEXT NOT NULL PRIMARY KEY,
    "name" TEXT NOT NULL,
    "blood" TEXT NOT NULL,
    "born" TEXT NOT NULL,
    "species" TEXT NOT NULL,
    "gender" TEXT NOT NULL,
    "house" TEXT NOT NULL,
    "url" TEXT NOT NULL
);

-- CreateIndex
CREATE UNIQUE INDEX "Character_name_key" ON "Character"("name");

-- CreateIndex
CREATE UNIQUE INDEX "Character_url_key" ON "Character"("url");
