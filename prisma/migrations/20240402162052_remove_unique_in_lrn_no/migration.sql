-- DropIndex
DROP INDEX `students_lrn_no_key` ON `students`;

-- AlterTable
ALTER TABLE `students` MODIFY `lrn_no` VARCHAR(255) NOT NULL;
