/*
  Warnings:

  - You are about to drop the `Post` table. If the table is not empty, all the data it contains will be lost.
  - You are about to drop the `User` table. If the table is not empty, all the data it contains will be lost.

*/
-- DropForeignKey
ALTER TABLE `Post` DROP FOREIGN KEY `Post_authorId_fkey`;

-- DropTable
DROP TABLE `Post`;

-- DropTable
DROP TABLE `User`;

-- CreateTable
CREATE TABLE `school_years` (
    `id` INTEGER NOT NULL AUTO_INCREMENT,
    `year` VARCHAR(4) NOT NULL,
    `default` BOOLEAN NOT NULL,

    PRIMARY KEY (`id`)
) DEFAULT CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci;

-- CreateTable
CREATE TABLE `student_years` (
    `id` INTEGER NOT NULL AUTO_INCREMENT,
    `school_year_id` INTEGER NOT NULL,
    `year` VARCHAR(4) NOT NULL,

    PRIMARY KEY (`id`)
) DEFAULT CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci;

-- CreateTable
CREATE TABLE `student_sections` (
    `id` INTEGER NOT NULL AUTO_INCREMENT,
    `school_year_id` INTEGER NOT NULL,
    `student_year_id` INTEGER NOT NULL,
    `sections` VARCHAR(255) NOT NULL,

    PRIMARY KEY (`id`)
) DEFAULT CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci;

-- CreateTable
CREATE TABLE `students` (
    `id` INTEGER NOT NULL AUTO_INCREMENT,
    `school_year_id` INTEGER NOT NULL,
    `lrn_no` VARCHAR(191) NOT NULL,
    `first_name` VARCHAR(255) NOT NULL,
    `middle_name` VARCHAR(255) NULL,
    `last_name` VARCHAR(255) NOT NULL,
    `prefix` VARCHAR(10) NULL,
    `suffix` VARCHAR(255) NOT NULL,
    `gender` ENUM('male', 'female', 'others') NOT NULL,
    `age` INTEGER NULL,
    `year` VARCHAR(4) NOT NULL,
    `section` VARCHAR(255) NOT NULL,
    `status` ENUM('active', 'inactive') NOT NULL DEFAULT 'active',
    `deleted` BOOLEAN NOT NULL DEFAULT false,
    `created_at` DATETIME(3) NOT NULL DEFAULT CURRENT_TIMESTAMP(3),
    `updated_at` DATETIME(3) NOT NULL,

    UNIQUE INDEX `students_lrn_no_key`(`lrn_no`),
    PRIMARY KEY (`id`)
) DEFAULT CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci;

-- CreateTable
CREATE TABLE `users` (
    `id` INTEGER NOT NULL AUTO_INCREMENT,
    `username` VARCHAR(255) NOT NULL,
    `email` VARCHAR(255) NOT NULL,
    `password` VARCHAR(255) NOT NULL,
    `role` ENUM('student', 'advisor', 'counselor', 'principal') NOT NULL,
    `status` ENUM('active', 'inactive') NOT NULL,
    `deleted` BOOLEAN NOT NULL DEFAULT false,
    `created_at` DATETIME(3) NOT NULL DEFAULT CURRENT_TIMESTAMP(3),
    `updated_at` DATETIME(3) NOT NULL,

    UNIQUE INDEX `users_username_key`(`username`),
    UNIQUE INDEX `users_email_key`(`email`),
    PRIMARY KEY (`id`)
) DEFAULT CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci;

-- CreateTable
CREATE TABLE `appointments` (
    `id` INTEGER NOT NULL AUTO_INCREMENT,
    `school_year_id` INTEGER NOT NULL,
    `user_id` INTEGER NOT NULL,
    `student_id` INTEGER NOT NULL,
    `date_now` DATETIME(3) NOT NULL DEFAULT CURRENT_TIMESTAMP(3),
    `contact_no` VARCHAR(20) NOT NULL,
    `purpose` VARCHAR(255) NOT NULL,
    `purpose_details` TEXT NOT NULL,
    `status` ENUM('open', 'submitted', 'closed') NOT NULL DEFAULT 'open',
    `deleted` BOOLEAN NOT NULL DEFAULT false,
    `created_at` DATETIME(3) NOT NULL DEFAULT CURRENT_TIMESTAMP(3),
    `updated_at` DATETIME(3) NOT NULL,

    PRIMARY KEY (`id`)
) DEFAULT CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci;

-- CreateTable
CREATE TABLE `complaints` (
    `id` INTEGER NOT NULL AUTO_INCREMENT,
    `school_year_id` INTEGER NOT NULL,
    `user_id` INTEGER NOT NULL,
    `student_id` INTEGER NOT NULL,
    `appointment_id` INTEGER NOT NULL,
    `date_now` DATETIME(3) NOT NULL DEFAULT CURRENT_TIMESTAMP(3),
    `place` TEXT NOT NULL,
    `what_happened` TEXT NOT NULL,
    `what_behavior` TEXT NOT NULL,
    `behavior_reaction` TEXT NOT NULL,
    `learner_reaction` TEXT NOT NULL,
    `recommendation` TEXT NOT NULL,
    `status` ENUM('open', 'pending', 'closed') NOT NULL DEFAULT 'open',
    `deleted` BOOLEAN NOT NULL DEFAULT false,
    `created_at` DATETIME(3) NOT NULL DEFAULT CURRENT_TIMESTAMP(3),
    `updated_at` DATETIME(3) NOT NULL,

    PRIMARY KEY (`id`)
) DEFAULT CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci;

-- CreateTable
CREATE TABLE `narrative_reports` (
    `id` INTEGER NOT NULL AUTO_INCREMENT,
    `school_year_id` INTEGER NOT NULL,
    `user_id` INTEGER NOT NULL,
    `student_id` INTEGER NOT NULL,
    `complaint_id` INTEGER NOT NULL,
    `case_report_no` VARCHAR(255) NOT NULL,
    `incident` TEXT NOT NULL,
    `reported_by` VARCHAR(500) NOT NULL,
    `date_reported` VARCHAR(255) NOT NULL,
    `time_reported` VARCHAR(255) NOT NULL,
    `detail_of_event` TEXT NOT NULL,
    `action_taken` TEXT NOT NULL,
    `summary` TEXT NOT NULL,
    `parties` TEXT NULL,
    `status` ENUM('open', 'pending', 'closed') NOT NULL DEFAULT 'open',
    `deleted` BOOLEAN NOT NULL DEFAULT false,
    `created_at` DATETIME(3) NOT NULL DEFAULT CURRENT_TIMESTAMP(3),
    `updated_at` DATETIME(3) NOT NULL,

    PRIMARY KEY (`id`)
) DEFAULT CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci;

-- CreateTable
CREATE TABLE `counselor_reports` (
    `id` INTEGER NOT NULL AUTO_INCREMENT,
    `school_year_id` INTEGER NOT NULL,
    `user_id` INTEGER NOT NULL,
    `student_id` INTEGER NOT NULL,
    `complaint_id` INTEGER NOT NULL,
    `summary` TEXT NOT NULL,
    `recommendations` TEXT NOT NULL,
    `status` ENUM('open', 'pending', 'closed') NOT NULL DEFAULT 'open',
    `deleted` BOOLEAN NOT NULL DEFAULT false,
    `created_at` DATETIME(3) NOT NULL DEFAULT CURRENT_TIMESTAMP(3),
    `updated_at` DATETIME(3) NOT NULL,

    PRIMARY KEY (`id`)
) DEFAULT CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci;

-- AddForeignKey
ALTER TABLE `student_years` ADD CONSTRAINT `student_years_school_year_id_fkey` FOREIGN KEY (`school_year_id`) REFERENCES `school_years`(`id`) ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE `student_sections` ADD CONSTRAINT `student_sections_school_year_id_fkey` FOREIGN KEY (`school_year_id`) REFERENCES `school_years`(`id`) ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE `student_sections` ADD CONSTRAINT `student_sections_student_year_id_fkey` FOREIGN KEY (`student_year_id`) REFERENCES `student_years`(`id`) ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE `students` ADD CONSTRAINT `students_school_year_id_fkey` FOREIGN KEY (`school_year_id`) REFERENCES `school_years`(`id`) ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE `appointments` ADD CONSTRAINT `appointments_school_year_id_fkey` FOREIGN KEY (`school_year_id`) REFERENCES `school_years`(`id`) ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE `appointments` ADD CONSTRAINT `appointments_user_id_fkey` FOREIGN KEY (`user_id`) REFERENCES `users`(`id`) ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE `appointments` ADD CONSTRAINT `appointments_student_id_fkey` FOREIGN KEY (`student_id`) REFERENCES `students`(`id`) ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE `complaints` ADD CONSTRAINT `complaints_school_year_id_fkey` FOREIGN KEY (`school_year_id`) REFERENCES `school_years`(`id`) ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE `complaints` ADD CONSTRAINT `complaints_user_id_fkey` FOREIGN KEY (`user_id`) REFERENCES `users`(`id`) ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE `complaints` ADD CONSTRAINT `complaints_student_id_fkey` FOREIGN KEY (`student_id`) REFERENCES `students`(`id`) ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE `complaints` ADD CONSTRAINT `complaints_appointment_id_fkey` FOREIGN KEY (`appointment_id`) REFERENCES `appointments`(`id`) ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE `narrative_reports` ADD CONSTRAINT `narrative_reports_school_year_id_fkey` FOREIGN KEY (`school_year_id`) REFERENCES `school_years`(`id`) ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE `narrative_reports` ADD CONSTRAINT `narrative_reports_user_id_fkey` FOREIGN KEY (`user_id`) REFERENCES `users`(`id`) ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE `narrative_reports` ADD CONSTRAINT `narrative_reports_student_id_fkey` FOREIGN KEY (`student_id`) REFERENCES `students`(`id`) ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE `narrative_reports` ADD CONSTRAINT `narrative_reports_complaint_id_fkey` FOREIGN KEY (`complaint_id`) REFERENCES `complaints`(`id`) ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE `counselor_reports` ADD CONSTRAINT `counselor_reports_school_year_id_fkey` FOREIGN KEY (`school_year_id`) REFERENCES `school_years`(`id`) ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE `counselor_reports` ADD CONSTRAINT `counselor_reports_user_id_fkey` FOREIGN KEY (`user_id`) REFERENCES `users`(`id`) ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE `counselor_reports` ADD CONSTRAINT `counselor_reports_student_id_fkey` FOREIGN KEY (`student_id`) REFERENCES `students`(`id`) ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE `counselor_reports` ADD CONSTRAINT `counselor_reports_complaint_id_fkey` FOREIGN KEY (`complaint_id`) REFERENCES `complaints`(`id`) ON DELETE CASCADE ON UPDATE CASCADE;
