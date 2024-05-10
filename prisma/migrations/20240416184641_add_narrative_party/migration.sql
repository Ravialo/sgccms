-- CreateTable
CREATE TABLE `narrative_report_parties` (
    `id` INTEGER NOT NULL AUTO_INCREMENT,
    `narrative_report_id` INTEGER NOT NULL,
    `student_id` INTEGER NOT NULL,
    `created_at` DATETIME(3) NOT NULL DEFAULT CURRENT_TIMESTAMP(3),

    PRIMARY KEY (`id`)
) DEFAULT CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci;

-- AddForeignKey
ALTER TABLE `narrative_report_parties` ADD CONSTRAINT `narrative_report_parties_narrative_report_id_fkey` FOREIGN KEY (`narrative_report_id`) REFERENCES `narrative_reports`(`id`) ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE `narrative_report_parties` ADD CONSTRAINT `narrative_report_parties_student_id_fkey` FOREIGN KEY (`student_id`) REFERENCES `students`(`id`) ON DELETE CASCADE ON UPDATE CASCADE;
