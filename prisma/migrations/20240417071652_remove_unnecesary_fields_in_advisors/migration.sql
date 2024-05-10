/*
  Warnings:

  - You are about to drop the column `grade_id` on the `advisors` table. All the data in the column will be lost.
  - You are about to drop the column `school_year_id` on the `advisors` table. All the data in the column will be lost.
  - A unique constraint covering the columns `[section_id]` on the table `advisors` will be added. If there are existing duplicate values, this will fail.

*/
-- DropForeignKey
ALTER TABLE `advisors` DROP FOREIGN KEY `advisors_grade_id_fkey`;

-- DropForeignKey
ALTER TABLE `advisors` DROP FOREIGN KEY `advisors_school_year_id_fkey`;

-- AlterTable
ALTER TABLE `advisors` DROP COLUMN `grade_id`,
    DROP COLUMN `school_year_id`;

-- CreateIndex
CREATE UNIQUE INDEX `advisors_section_id_key` ON `advisors`(`section_id`);
