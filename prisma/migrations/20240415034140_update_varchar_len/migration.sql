/*
  Warnings:

  - You are about to alter the column `code` on the `user_reset_passwords` table. The data in that column could be lost. The data in that column will be cast from `VarChar(255)` to `VarChar(6)`.

*/
-- AlterTable
ALTER TABLE `user_reset_passwords` MODIFY `code` VARCHAR(6) NOT NULL,
    MODIFY `verify_token` VARCHAR(500) NOT NULL,
    MODIFY `reset_token` VARCHAR(500) NULL;
