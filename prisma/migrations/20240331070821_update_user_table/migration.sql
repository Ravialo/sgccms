-- AlterTable
ALTER TABLE `appointments` MODIFY `purpose_details` TEXT NULL;

-- AlterTable
ALTER TABLE `users` ADD COLUMN `student_id` INTEGER NULL;

-- AddForeignKey
ALTER TABLE `users` ADD CONSTRAINT `users_student_id_fkey` FOREIGN KEY (`student_id`) REFERENCES `students`(`id`) ON DELETE CASCADE ON UPDATE CASCADE;
