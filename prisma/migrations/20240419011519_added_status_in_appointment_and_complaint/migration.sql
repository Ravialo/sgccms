-- AlterTable
ALTER TABLE `appointments` MODIFY `status` ENUM('open', 'pending', 'closed', 'cancelled') NOT NULL DEFAULT 'open';

-- AlterTable
ALTER TABLE `complaints` MODIFY `status` ENUM('open', 'pending', 'closed', 'cancelled') NOT NULL DEFAULT 'open';
