/*
  Warnings:

  - You are about to drop the column `grade_id` on the `users` table. All the data in the column will be lost.
  - You are about to drop the column `section_id` on the `users` table. All the data in the column will be lost.

*/
-- DropForeignKey
ALTER TABLE `users` DROP FOREIGN KEY `users_grade_id_fkey`;

-- DropForeignKey
ALTER TABLE `users` DROP FOREIGN KEY `users_section_id_fkey`;

-- AlterTable
ALTER TABLE `users` DROP COLUMN `grade_id`,
    DROP COLUMN `section_id`;

-- CreateTable
CREATE TABLE `advisors` (
    `id` INTEGER NOT NULL AUTO_INCREMENT,
    `school_year_id` INTEGER NOT NULL,
    `grade_id` INTEGER NOT NULL,
    `section_id` INTEGER NOT NULL,
    `user_id` INTEGER NOT NULL,

    PRIMARY KEY (`id`)
) DEFAULT CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci;

-- AddForeignKey
ALTER TABLE `advisors` ADD CONSTRAINT `advisors_school_year_id_fkey` FOREIGN KEY (`school_year_id`) REFERENCES `school_years`(`id`) ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE `advisors` ADD CONSTRAINT `advisors_grade_id_fkey` FOREIGN KEY (`grade_id`) REFERENCES `grades`(`id`) ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE `advisors` ADD CONSTRAINT `advisors_section_id_fkey` FOREIGN KEY (`section_id`) REFERENCES `sections`(`id`) ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE `advisors` ADD CONSTRAINT `advisors_user_id_fkey` FOREIGN KEY (`user_id`) REFERENCES `users`(`id`) ON DELETE CASCADE ON UPDATE CASCADE;
