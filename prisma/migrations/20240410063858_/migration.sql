/*
  Warnings:

  - You are about to drop the column `student_id` on the `users` table. All the data in the column will be lost.
  - A unique constraint covering the columns `[user_id]` on the table `students` will be added. If there are existing duplicate values, this will fail.
  - Added the required column `user_id` to the `students` table without a default value. This is not possible if the table is not empty.

*/
-- DropForeignKey
ALTER TABLE `users` DROP FOREIGN KEY `users_student_id_fkey`;

-- AlterTable
ALTER TABLE `students` ADD COLUMN `user_id` INTEGER NOT NULL;

-- AlterTable
ALTER TABLE `users` DROP COLUMN `student_id`;

-- CreateIndex
CREATE UNIQUE INDEX `students_user_id_key` ON `students`(`user_id`);

-- AddForeignKey
ALTER TABLE `students` ADD CONSTRAINT `students_user_id_fkey` FOREIGN KEY (`user_id`) REFERENCES `users`(`id`) ON DELETE CASCADE ON UPDATE CASCADE;
