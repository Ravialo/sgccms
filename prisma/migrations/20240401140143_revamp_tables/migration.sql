/*
  Warnings:

  - You are about to drop the column `date_now` on the `appointments` table. All the data in the column will be lost.
  - You are about to drop the column `appointment_id` on the `complaints` table. All the data in the column will be lost.
  - You are about to drop the column `date_now` on the `complaints` table. All the data in the column will be lost.
  - You are about to drop the column `status` on the `counselor_reports` table. All the data in the column will be lost.
  - You are about to drop the column `status` on the `narrative_reports` table. All the data in the column will be lost.
  - You are about to drop the column `grade` on the `students` table. All the data in the column will be lost.
  - You are about to drop the column `section` on the `students` table. All the data in the column will be lost.
  - You are about to drop the column `email` on the `users` table. All the data in the column will be lost.
  - You are about to drop the `student_sections` table. If the table is not empty, all the data it contains will be lost.
  - You are about to drop the `student_years` table. If the table is not empty, all the data it contains will be lost.
  - Added the required column `grade_id` to the `students` table without a default value. This is not possible if the table is not empty.
  - Added the required column `section_id` to the `students` table without a default value. This is not possible if the table is not empty.

*/
-- DropForeignKey
ALTER TABLE `complaints` DROP FOREIGN KEY `complaints_appointment_id_fkey`;

-- DropForeignKey
ALTER TABLE `student_sections` DROP FOREIGN KEY `student_sections_school_year_id_fkey`;

-- DropForeignKey
ALTER TABLE `student_sections` DROP FOREIGN KEY `student_sections_student_year_id_fkey`;

-- DropForeignKey
ALTER TABLE `student_years` DROP FOREIGN KEY `student_years_school_year_id_fkey`;

-- DropIndex
DROP INDEX `users_email_key` ON `users`;

-- AlterTable
ALTER TABLE `appointments` DROP COLUMN `date_now`,
    ADD COLUMN `date` DATETIME(3) NULL;

-- AlterTable
ALTER TABLE `complaints` DROP COLUMN `appointment_id`,
    DROP COLUMN `date_now`,
    MODIFY `what_behavior` TEXT NULL,
    MODIFY `behavior_reaction` TEXT NULL,
    MODIFY `learner_reaction` TEXT NULL,
    MODIFY `recommendation` TEXT NULL;

-- AlterTable
ALTER TABLE `counselor_reports` DROP COLUMN `status`;

-- AlterTable
ALTER TABLE `narrative_reports` DROP COLUMN `status`;

-- AlterTable
ALTER TABLE `students` DROP COLUMN `grade`,
    DROP COLUMN `section`,
    ADD COLUMN `grade_id` INTEGER NOT NULL,
    ADD COLUMN `section_id` INTEGER NOT NULL;

-- AlterTable
ALTER TABLE `users` DROP COLUMN `email`,
    ADD COLUMN `grade_id` INTEGER NULL,
    ADD COLUMN `section_id` INTEGER NULL;

-- DropTable
DROP TABLE `student_sections`;

-- DropTable
DROP TABLE `student_years`;

-- CreateTable
CREATE TABLE `grades` (
    `id` INTEGER NOT NULL AUTO_INCREMENT,
    `school_year_id` INTEGER NOT NULL,
    `grade` VARCHAR(50) NOT NULL,

    PRIMARY KEY (`id`)
) DEFAULT CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci;

-- CreateTable
CREATE TABLE `sections` (
    `id` INTEGER NOT NULL AUTO_INCREMENT,
    `school_year_id` INTEGER NOT NULL,
    `grade_id` INTEGER NOT NULL,
    `section` VARCHAR(100) NOT NULL,

    PRIMARY KEY (`id`)
) DEFAULT CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci;

-- AddForeignKey
ALTER TABLE `grades` ADD CONSTRAINT `grades_school_year_id_fkey` FOREIGN KEY (`school_year_id`) REFERENCES `school_years`(`id`) ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE `sections` ADD CONSTRAINT `sections_school_year_id_fkey` FOREIGN KEY (`school_year_id`) REFERENCES `school_years`(`id`) ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE `sections` ADD CONSTRAINT `sections_grade_id_fkey` FOREIGN KEY (`grade_id`) REFERENCES `grades`(`id`) ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE `students` ADD CONSTRAINT `students_grade_id_fkey` FOREIGN KEY (`grade_id`) REFERENCES `grades`(`id`) ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE `students` ADD CONSTRAINT `students_section_id_fkey` FOREIGN KEY (`section_id`) REFERENCES `sections`(`id`) ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE `users` ADD CONSTRAINT `users_grade_id_fkey` FOREIGN KEY (`grade_id`) REFERENCES `grades`(`id`) ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE `users` ADD CONSTRAINT `users_section_id_fkey` FOREIGN KEY (`section_id`) REFERENCES `sections`(`id`) ON DELETE CASCADE ON UPDATE CASCADE;
