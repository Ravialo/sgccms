-- AlterTable
ALTER TABLE `counselor_reports` ADD COLUMN `appointment_id` INTEGER NULL;

-- AlterTable
ALTER TABLE `narrative_reports` ADD COLUMN `appointment_id` INTEGER NULL,
    MODIFY `complaint_id` INTEGER NULL;

-- AddForeignKey
ALTER TABLE `narrative_reports` ADD CONSTRAINT `narrative_reports_appointment_id_fkey` FOREIGN KEY (`appointment_id`) REFERENCES `appointments`(`id`) ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE `counselor_reports` ADD CONSTRAINT `counselor_reports_appointment_id_fkey` FOREIGN KEY (`appointment_id`) REFERENCES `appointments`(`id`) ON DELETE CASCADE ON UPDATE CASCADE;
