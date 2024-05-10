/*
  Warnings:

  - You are about to alter the column `default` on the `school_years` table. The data in that column could be lost. The data in that column will be cast from `TinyInt` to `Enum(EnumId(0))`.

*/
-- AlterTable
ALTER TABLE `school_years` MODIFY `default` ENUM('yes', 'no') NOT NULL;
