-- DropIndex
DROP INDEX `users_email_key` ON `users`;

-- AlterTable
ALTER TABLE `users` ADD COLUMN `first_name` VARCHAR(255) NULL,
    ADD COLUMN `last_name` VARCHAR(255) NULL;
