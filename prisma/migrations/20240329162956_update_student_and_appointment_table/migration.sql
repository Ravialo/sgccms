/*
  Warnings:

  - The values [submitted] on the enum `appointments_status` will be removed. If these variants are still used in the database, this will fail.

*/
-- AlterTable
ALTER TABLE `appointments` MODIFY `status` ENUM('open', 'pending', 'closed') NOT NULL DEFAULT 'open';

-- AlterTable
ALTER TABLE `students` MODIFY `suffix` VARCHAR(255) NULL;
