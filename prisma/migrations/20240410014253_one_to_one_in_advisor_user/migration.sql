/*
  Warnings:

  - A unique constraint covering the columns `[user_id]` on the table `advisors` will be added. If there are existing duplicate values, this will fail.

*/
-- CreateIndex
CREATE UNIQUE INDEX `advisors_user_id_key` ON `advisors`(`user_id`);
