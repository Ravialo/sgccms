/*
  Warnings:

  - You are about to drop the column `year` on the `students` table. All the data in the column will be lost.
  - Added the required column `grade` to the `students` table without a default value. This is not possible if the table is not empty.

*/
-- AlterTable
ALTER TABLE `students` DROP COLUMN `year`,
    ADD COLUMN `grade` VARCHAR(255) NOT NULL;
