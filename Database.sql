-- MySQL dump 10.13  Distrib 8.0.34, for Win64 (x86_64)
--
-- Host: localhost    Database: sg_ccms
-- ------------------------------------------------------
-- Server version	8.0.35

/*!40101 SET @OLD_CHARACTER_SET_CLIENT=@@CHARACTER_SET_CLIENT */;
/*!40101 SET @OLD_CHARACTER_SET_RESULTS=@@CHARACTER_SET_RESULTS */;
/*!40101 SET @OLD_COLLATION_CONNECTION=@@COLLATION_CONNECTION */;
/*!50503 SET NAMES utf8 */;
/*!40103 SET @OLD_TIME_ZONE=@@TIME_ZONE */;
/*!40103 SET TIME_ZONE='+00:00' */;
/*!40014 SET @OLD_UNIQUE_CHECKS=@@UNIQUE_CHECKS, UNIQUE_CHECKS=0 */;
/*!40014 SET @OLD_FOREIGN_KEY_CHECKS=@@FOREIGN_KEY_CHECKS, FOREIGN_KEY_CHECKS=0 */;
/*!40101 SET @OLD_SQL_MODE=@@SQL_MODE, SQL_MODE='NO_AUTO_VALUE_ON_ZERO' */;
/*!40111 SET @OLD_SQL_NOTES=@@SQL_NOTES, SQL_NOTES=0 */;

--
-- Table structure for table `_prisma_migrations`
--

DROP TABLE IF EXISTS `_prisma_migrations`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!50503 SET character_set_client = utf8mb4 */;
CREATE TABLE `_prisma_migrations` (
  `id` varchar(36) COLLATE utf8mb4_unicode_ci NOT NULL,
  `checksum` varchar(64) COLLATE utf8mb4_unicode_ci NOT NULL,
  `finished_at` datetime(3) DEFAULT NULL,
  `migration_name` varchar(255) COLLATE utf8mb4_unicode_ci NOT NULL,
  `logs` text COLLATE utf8mb4_unicode_ci,
  `rolled_back_at` datetime(3) DEFAULT NULL,
  `started_at` datetime(3) NOT NULL DEFAULT CURRENT_TIMESTAMP(3),
  `applied_steps_count` int unsigned NOT NULL DEFAULT '0',
  PRIMARY KEY (`id`)
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_unicode_ci;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `_prisma_migrations`
--

LOCK TABLES `_prisma_migrations` WRITE;
/*!40000 ALTER TABLE `_prisma_migrations` DISABLE KEYS */;
INSERT INTO `_prisma_migrations` VALUES ('19c5d772-5f28-4289-a22d-145b03206276','ba5400eb8d767de24a02310dd1229421fae8d7c2a4b1f4548f4dc403a4f693e5','2024-04-02 01:21:44.865','20240402012144_add_deleted_email',NULL,NULL,'2024-04-02 01:21:44.813',1),('26bcc9e7-82f4-4550-b1c2-b97bab834cfe','23ea0f3adfa08e43e44b7ae0947c8909a12500d411504b9a934a724d3e3273a7','2024-04-03 03:54:09.688','20240403035409_add_first_name_last_name',NULL,NULL,'2024-04-03 03:54:09.634',1),('35de3721-7060-4017-874e-6315d16d64cc','6800c68618a5a51e1824cea2e73263036cff4b171f792f49a47ddcd88a27cde2','2024-04-01 14:01:26.268','20240329155754_setup_tables',NULL,NULL,'2024-04-01 14:01:25.643',1),('421a5a81-1991-4634-9dd4-4caefb6caea1','4f46fd1e79004066139beeecf648fdf84a67aab2a5f965a07ba381d0160d4806','2024-04-01 23:54:10.247','20240401235410_retain_email_user',NULL,NULL,'2024-04-01 23:54:10.181',1),('475fe5f4-719a-43fb-ab9d-6c77f48b00ee','ee063ef8e7c7f24386247ed2a2e53da959291170cb2cbd1bc86f4017a6da062a','2024-04-01 14:01:26.454','20240329163655_added_appointment_id',NULL,NULL,'2024-04-01 14:01:26.346',1),('51259f45-ab4e-4bad-967f-ce1ee76e233b','098b90dcb4c749fde070be27a01a1a03060770625b7e6953076f1463c8ada32e','2024-04-01 14:01:25.639','20240329150951_init',NULL,NULL,'2024-04-01 14:01:25.582',1),('7268f437-6805-4ffe-925f-b3354376323b','485cf25340bc24b37c904699b3e6aa821d77275cc325a038f2703584694944ef','2024-04-01 14:01:26.613','20240330141704_update_counselor_report',NULL,NULL,'2024-04-01 14:01:26.574',1),('92f69d71-d36e-44ad-b059-8cac5a7134e4','85e9aa2f1b7d22ae26d3f751fed1fc5cbcc9740b23e284269be13f0c40ecb3af','2024-04-01 14:01:26.737','20240331075350_update_student_table',NULL,NULL,'2024-04-01 14:01:26.710',1),('9cb0a8df-5fe5-449f-ab19-203018081e34','749f657c86c8e339bfd9cce988c690a5877fc3f5b08ceade0318a5a1d88c860f','2024-04-01 14:01:26.527','20240330020856_update_sy_default',NULL,NULL,'2024-04-01 14:01:26.481',1),('cc2d83b1-71c6-471b-8279-a06746887bfc','dd9f65d286be8ef6b8d821263e4cc3bde0a499931cc1950150c5549b42bb689b','2024-04-03 04:09:58.575','20240403040958_update_user_table',NULL,NULL,'2024-04-03 04:09:58.525',1),('d192c508-e840-4d8f-9aa4-5fc53c1f0b2e','7bf5dddeb9aac5996c309ddb2310ad02cacc0771bb64743b0acee65d8dd848f6','2024-04-01 14:01:26.708','20240331070821_update_user_table',NULL,NULL,'2024-04-01 14:01:26.615',1),('d747dee2-3c66-41cc-b906-d1cc999ec04e','7b628016dc2115ff1b1d6dbd97ee035a7c62490ec72dfec42f25c45c0ba773e9','2024-04-02 16:20:52.439','20240402162052_remove_unique_in_lrn_no',NULL,NULL,'2024-04-02 16:20:52.371',1),('db25acce-4574-4957-83e3-afd54efe5b9f','5282d5717fa80747adb1c336e86b945150530a3016fc50d8516465c9cfcbe216','2024-04-01 14:01:43.496','20240401140143_revamp_tables',NULL,NULL,'2024-04-01 14:01:43.106',1),('e3140bcc-8884-4b2e-b03e-42a59eb2587f','822fa802c5c3dfa5d898e8df9bec83e2d3cf3c729bbd0cf6c3f971e2ad54a735','2024-04-01 14:01:26.479','20240329225446_update_sy_table',NULL,NULL,'2024-04-01 14:01:26.456',1),('ea1bcc9f-f1ea-4794-a9cf-3701f125684a','650953ed066a2241bf30edbe58a44f8d89eb4d78d4bfa7f64459f275b82004e3','2024-04-01 14:01:26.769','20240401083834_',NULL,NULL,'2024-04-01 14:01:26.739',1),('ebe9aa41-b9b7-4192-a555-54b73e0ea98b','8cc81de693e03300ea7dff75995e6b65617c4382029e9335179273fed206a163','2024-04-01 14:01:26.571','20240330141431_update_student_table',NULL,NULL,'2024-04-01 14:01:26.529',1),('f4a416ee-50bb-4fdb-b4a2-25b8305e7d80','98276fc5a8a42aafcca3b35f0cbba47d398842c7bd60d3b7c9718cdaf7db8482','2024-04-01 14:01:26.344','20240329162956_update_student_and_appointment_table',NULL,NULL,'2024-04-01 14:01:26.271',1);
/*!40000 ALTER TABLE `_prisma_migrations` ENABLE KEYS */;
UNLOCK TABLES;

--
-- Table structure for table `appointments`
--

DROP TABLE IF EXISTS `appointments`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!50503 SET character_set_client = utf8mb4 */;
CREATE TABLE `appointments` (
  `id` int NOT NULL AUTO_INCREMENT,
  `school_year_id` int NOT NULL,
  `user_id` int NOT NULL,
  `student_id` int NOT NULL,
  `contact_no` varchar(20) COLLATE utf8mb4_unicode_ci NOT NULL,
  `purpose` varchar(255) COLLATE utf8mb4_unicode_ci NOT NULL,
  `purpose_details` text COLLATE utf8mb4_unicode_ci,
  `status` enum('open','pending','closed') COLLATE utf8mb4_unicode_ci NOT NULL DEFAULT 'open',
  `deleted` tinyint(1) NOT NULL DEFAULT '0',
  `created_at` datetime(3) NOT NULL DEFAULT CURRENT_TIMESTAMP(3),
  `updated_at` datetime(3) NOT NULL,
  `date` datetime(3) DEFAULT NULL,
  PRIMARY KEY (`id`),
  KEY `appointments_school_year_id_fkey` (`school_year_id`),
  KEY `appointments_user_id_fkey` (`user_id`),
  KEY `appointments_student_id_fkey` (`student_id`),
  CONSTRAINT `appointments_school_year_id_fkey` FOREIGN KEY (`school_year_id`) REFERENCES `school_years` (`id`) ON DELETE CASCADE ON UPDATE CASCADE,
  CONSTRAINT `appointments_student_id_fkey` FOREIGN KEY (`student_id`) REFERENCES `students` (`id`) ON DELETE CASCADE ON UPDATE CASCADE,
  CONSTRAINT `appointments_user_id_fkey` FOREIGN KEY (`user_id`) REFERENCES `users` (`id`) ON DELETE CASCADE ON UPDATE CASCADE
) ENGINE=InnoDB AUTO_INCREMENT=7 DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_unicode_ci;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `appointments`
--

LOCK TABLES `appointments` WRITE;
/*!40000 ALTER TABLE `appointments` DISABLE KEYS */;
INSERT INTO `appointments` VALUES (1,1,1,1,'09123456789','Inquiry','Grade','open',0,'2024-04-04 11:05:21.883','2024-04-04 11:05:21.883',NULL),(2,1,1,1,'09123456789','Counselling','Academic','closed',0,'2024-04-04 11:05:21.883','2024-04-04 11:05:21.883','2024-04-04 11:05:21.770'),(3,1,1,1,'09123456789','Inquiry','Grade','pending',0,'2024-04-04 11:05:21.883','2024-04-04 11:05:21.883','2024-04-04 11:05:21.770');
/*!40000 ALTER TABLE `appointments` ENABLE KEYS */;
UNLOCK TABLES;

--
-- Table structure for table `complaints`
--

DROP TABLE IF EXISTS `complaints`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!50503 SET character_set_client = utf8mb4 */;
CREATE TABLE `complaints` (
  `id` int NOT NULL AUTO_INCREMENT,
  `school_year_id` int NOT NULL,
  `user_id` int NOT NULL,
  `student_id` int NOT NULL,
  `place` text COLLATE utf8mb4_unicode_ci NOT NULL,
  `what_happened` text COLLATE utf8mb4_unicode_ci NOT NULL,
  `what_behavior` text COLLATE utf8mb4_unicode_ci,
  `behavior_reaction` text COLLATE utf8mb4_unicode_ci,
  `learner_reaction` text COLLATE utf8mb4_unicode_ci,
  `recommendation` text COLLATE utf8mb4_unicode_ci,
  `status` enum('open','pending','closed') COLLATE utf8mb4_unicode_ci NOT NULL DEFAULT 'open',
  `deleted` tinyint(1) NOT NULL DEFAULT '0',
  `created_at` datetime(3) NOT NULL DEFAULT CURRENT_TIMESTAMP(3),
  `updated_at` datetime(3) NOT NULL,
  PRIMARY KEY (`id`),
  KEY `complaints_school_year_id_fkey` (`school_year_id`),
  KEY `complaints_user_id_fkey` (`user_id`),
  KEY `complaints_student_id_fkey` (`student_id`),
  CONSTRAINT `complaints_school_year_id_fkey` FOREIGN KEY (`school_year_id`) REFERENCES `school_years` (`id`) ON DELETE CASCADE ON UPDATE CASCADE,
  CONSTRAINT `complaints_student_id_fkey` FOREIGN KEY (`student_id`) REFERENCES `students` (`id`) ON DELETE CASCADE ON UPDATE CASCADE,
  CONSTRAINT `complaints_user_id_fkey` FOREIGN KEY (`user_id`) REFERENCES `users` (`id`) ON DELETE CASCADE ON UPDATE CASCADE
) ENGINE=InnoDB AUTO_INCREMENT=4 DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_unicode_ci;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `complaints`
--

LOCK TABLES `complaints` WRITE;
/*!40000 ALTER TABLE `complaints` DISABLE KEYS */;
INSERT INTO `complaints` VALUES (1,1,2,1,'Room','not listening','NA','NA','NA','Study more','open',0,'2024-04-04 11:05:21.890','2024-04-04 11:05:21.890'),(2,1,2,1,'Room','not listening','NA','NA','NA','Study more','open',0,'2024-04-04 11:05:21.890','2024-04-04 11:05:21.890');
/*!40000 ALTER TABLE `complaints` ENABLE KEYS */;
UNLOCK TABLES;

--
-- Table structure for table `counselor_reports`
--

DROP TABLE IF EXISTS `counselor_reports`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!50503 SET character_set_client = utf8mb4 */;
CREATE TABLE `counselor_reports` (
  `id` int NOT NULL AUTO_INCREMENT,
  `school_year_id` int NOT NULL,
  `user_id` int NOT NULL,
  `student_id` int NOT NULL,
  `complaint_id` int DEFAULT NULL,
  `summary` text COLLATE utf8mb4_unicode_ci NOT NULL,
  `recommendations` text COLLATE utf8mb4_unicode_ci NOT NULL,
  `deleted` tinyint(1) NOT NULL DEFAULT '0',
  `created_at` datetime(3) NOT NULL DEFAULT CURRENT_TIMESTAMP(3),
  `updated_at` datetime(3) NOT NULL,
  `appointment_id` int DEFAULT NULL,
  PRIMARY KEY (`id`),
  KEY `counselor_reports_school_year_id_fkey` (`school_year_id`),
  KEY `counselor_reports_user_id_fkey` (`user_id`),
  KEY `counselor_reports_student_id_fkey` (`student_id`),
  KEY `counselor_reports_complaint_id_fkey` (`complaint_id`),
  KEY `counselor_reports_appointment_id_fkey` (`appointment_id`),
  CONSTRAINT `counselor_reports_appointment_id_fkey` FOREIGN KEY (`appointment_id`) REFERENCES `appointments` (`id`) ON DELETE CASCADE ON UPDATE CASCADE,
  CONSTRAINT `counselor_reports_complaint_id_fkey` FOREIGN KEY (`complaint_id`) REFERENCES `complaints` (`id`) ON DELETE CASCADE ON UPDATE CASCADE,
  CONSTRAINT `counselor_reports_school_year_id_fkey` FOREIGN KEY (`school_year_id`) REFERENCES `school_years` (`id`) ON DELETE CASCADE ON UPDATE CASCADE,
  CONSTRAINT `counselor_reports_student_id_fkey` FOREIGN KEY (`student_id`) REFERENCES `students` (`id`) ON DELETE CASCADE ON UPDATE CASCADE,
  CONSTRAINT `counselor_reports_user_id_fkey` FOREIGN KEY (`user_id`) REFERENCES `users` (`id`) ON DELETE CASCADE ON UPDATE CASCADE
) ENGINE=InnoDB AUTO_INCREMENT=8 DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_unicode_ci;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `counselor_reports`
--

LOCK TABLES `counselor_reports` WRITE;
/*!40000 ALTER TABLE `counselor_reports` DISABLE KEYS */;
INSERT INTO `counselor_reports` VALUES (1,1,3,1,NULL,'Counselling Academics','Give advise on academics',0,'2024-04-04 11:05:21.917','2024-04-04 11:05:21.917',2),(6,1,3,1,2,'Test','Test',0,'2024-04-04 11:07:16.527','2024-04-04 11:07:16.527',NULL),(7,1,3,1,1,'Test','Test',0,'2024-04-04 11:07:44.063','2024-04-04 11:07:44.063',NULL);
/*!40000 ALTER TABLE `counselor_reports` ENABLE KEYS */;
UNLOCK TABLES;

--
-- Table structure for table `grades`
--

DROP TABLE IF EXISTS `grades`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!50503 SET character_set_client = utf8mb4 */;
CREATE TABLE `grades` (
  `id` int NOT NULL AUTO_INCREMENT,
  `school_year_id` int NOT NULL,
  `grade` varchar(50) COLLATE utf8mb4_unicode_ci NOT NULL,
  PRIMARY KEY (`id`),
  KEY `grades_school_year_id_fkey` (`school_year_id`),
  CONSTRAINT `grades_school_year_id_fkey` FOREIGN KEY (`school_year_id`) REFERENCES `school_years` (`id`) ON DELETE CASCADE ON UPDATE CASCADE
) ENGINE=InnoDB AUTO_INCREMENT=8 DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_unicode_ci;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `grades`
--

LOCK TABLES `grades` WRITE;
/*!40000 ALTER TABLE `grades` DISABLE KEYS */;
INSERT INTO `grades` VALUES (1,1,'7'),(2,1,'8'),(3,1,'9'),(4,1,'10'),(5,1,'11'),(6,1,'12');
/*!40000 ALTER TABLE `grades` ENABLE KEYS */;
UNLOCK TABLES;

--
-- Table structure for table `narrative_reports`
--

DROP TABLE IF EXISTS `narrative_reports`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!50503 SET character_set_client = utf8mb4 */;
CREATE TABLE `narrative_reports` (
  `id` int NOT NULL AUTO_INCREMENT,
  `school_year_id` int NOT NULL,
  `user_id` int NOT NULL,
  `student_id` int NOT NULL,
  `complaint_id` int DEFAULT NULL,
  `case_report_no` varchar(255) COLLATE utf8mb4_unicode_ci NOT NULL,
  `incident` text COLLATE utf8mb4_unicode_ci NOT NULL,
  `reported_by` varchar(500) COLLATE utf8mb4_unicode_ci NOT NULL,
  `date_reported` varchar(255) COLLATE utf8mb4_unicode_ci NOT NULL,
  `time_reported` varchar(255) COLLATE utf8mb4_unicode_ci NOT NULL,
  `detail_of_event` text COLLATE utf8mb4_unicode_ci NOT NULL,
  `action_taken` text COLLATE utf8mb4_unicode_ci NOT NULL,
  `summary` text COLLATE utf8mb4_unicode_ci NOT NULL,
  `parties` text COLLATE utf8mb4_unicode_ci,
  `deleted` tinyint(1) NOT NULL DEFAULT '0',
  `created_at` datetime(3) NOT NULL DEFAULT CURRENT_TIMESTAMP(3),
  `updated_at` datetime(3) NOT NULL,
  `appointment_id` int DEFAULT NULL,
  PRIMARY KEY (`id`),
  KEY `narrative_reports_school_year_id_fkey` (`school_year_id`),
  KEY `narrative_reports_user_id_fkey` (`user_id`),
  KEY `narrative_reports_student_id_fkey` (`student_id`),
  KEY `narrative_reports_complaint_id_fkey` (`complaint_id`),
  KEY `narrative_reports_appointment_id_fkey` (`appointment_id`),
  CONSTRAINT `narrative_reports_appointment_id_fkey` FOREIGN KEY (`appointment_id`) REFERENCES `appointments` (`id`) ON DELETE CASCADE ON UPDATE CASCADE,
  CONSTRAINT `narrative_reports_complaint_id_fkey` FOREIGN KEY (`complaint_id`) REFERENCES `complaints` (`id`) ON DELETE CASCADE ON UPDATE CASCADE,
  CONSTRAINT `narrative_reports_school_year_id_fkey` FOREIGN KEY (`school_year_id`) REFERENCES `school_years` (`id`) ON DELETE CASCADE ON UPDATE CASCADE,
  CONSTRAINT `narrative_reports_student_id_fkey` FOREIGN KEY (`student_id`) REFERENCES `students` (`id`) ON DELETE CASCADE ON UPDATE CASCADE,
  CONSTRAINT `narrative_reports_user_id_fkey` FOREIGN KEY (`user_id`) REFERENCES `users` (`id`) ON DELETE CASCADE ON UPDATE CASCADE
) ENGINE=InnoDB AUTO_INCREMENT=5 DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_unicode_ci;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `narrative_reports`
--

LOCK TABLES `narrative_reports` WRITE;
/*!40000 ALTER TABLE `narrative_reports` DISABLE KEYS */;
INSERT INTO `narrative_reports` VALUES (1,1,3,1,NULL,'20240330-0001','Counselling Academic','John Doe','2024-03-30','12:00:00','Just counselling','Give advise','NA','[]',0,'2024-04-04 11:05:21.906','2024-04-04 11:05:21.906',2),(4,1,3,1,1,'20240404-190804','Test','Olive Tree','2024-04-04','19:08','Test','Test','Test','[]',0,'2024-04-04 11:08:16.793','2024-04-04 11:08:16.793',NULL);
/*!40000 ALTER TABLE `narrative_reports` ENABLE KEYS */;
UNLOCK TABLES;

--
-- Table structure for table `school_years`
--

DROP TABLE IF EXISTS `school_years`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!50503 SET character_set_client = utf8mb4 */;
CREATE TABLE `school_years` (
  `id` int NOT NULL AUTO_INCREMENT,
  `year` varchar(4) COLLATE utf8mb4_unicode_ci NOT NULL,
  `default` enum('yes','no') COLLATE utf8mb4_unicode_ci NOT NULL,
  `deleted` tinyint(1) NOT NULL DEFAULT '0',
  PRIMARY KEY (`id`)
) ENGINE=InnoDB AUTO_INCREMENT=4 DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_unicode_ci;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `school_years`
--

LOCK TABLES `school_years` WRITE;
/*!40000 ALTER TABLE `school_years` DISABLE KEYS */;
INSERT INTO `school_years` VALUES (1,'2024','yes',0);
/*!40000 ALTER TABLE `school_years` ENABLE KEYS */;
UNLOCK TABLES;

--
-- Table structure for table `sections`
--

DROP TABLE IF EXISTS `sections`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!50503 SET character_set_client = utf8mb4 */;
CREATE TABLE `sections` (
  `id` int NOT NULL AUTO_INCREMENT,
  `school_year_id` int NOT NULL,
  `grade_id` int NOT NULL,
  `section` varchar(100) COLLATE utf8mb4_unicode_ci NOT NULL,
  PRIMARY KEY (`id`),
  KEY `sections_school_year_id_fkey` (`school_year_id`),
  KEY `sections_grade_id_fkey` (`grade_id`),
  CONSTRAINT `sections_grade_id_fkey` FOREIGN KEY (`grade_id`) REFERENCES `grades` (`id`) ON DELETE CASCADE ON UPDATE CASCADE,
  CONSTRAINT `sections_school_year_id_fkey` FOREIGN KEY (`school_year_id`) REFERENCES `school_years` (`id`) ON DELETE CASCADE ON UPDATE CASCADE
) ENGINE=InnoDB AUTO_INCREMENT=15 DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_unicode_ci;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `sections`
--

LOCK TABLES `sections` WRITE;
/*!40000 ALTER TABLE `sections` DISABLE KEYS */;
INSERT INTO `sections` VALUES (1,1,1,'St. Therese'),(2,1,1,'St. Agnes'),(3,1,2,'St. John'),(4,1,2,'St. Micheal'),(5,1,3,'St. Ignatius'),(6,1,3,'St. Agustine'),(7,1,4,'St. Thomas'),(8,1,4,'St. Benedict'),(9,1,5,'St. Catherine'),(10,1,5,'St. Anne'),(11,1,6,'St. Andrew'),(12,1,6,'St. James'),(13,1,6,'St. Mary');
/*!40000 ALTER TABLE `sections` ENABLE KEYS */;
UNLOCK TABLES;

--
-- Table structure for table `students`
--

DROP TABLE IF EXISTS `students`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!50503 SET character_set_client = utf8mb4 */;
CREATE TABLE `students` (
  `id` int NOT NULL AUTO_INCREMENT,
  `school_year_id` int NOT NULL,
  `lrn_no` varchar(255) COLLATE utf8mb4_unicode_ci NOT NULL,
  `first_name` varchar(255) COLLATE utf8mb4_unicode_ci NOT NULL,
  `middle_name` varchar(255) COLLATE utf8mb4_unicode_ci DEFAULT NULL,
  `last_name` varchar(255) COLLATE utf8mb4_unicode_ci NOT NULL,
  `suffix` varchar(255) COLLATE utf8mb4_unicode_ci DEFAULT NULL,
  `gender` enum('male','female','others') COLLATE utf8mb4_unicode_ci NOT NULL,
  `age` int DEFAULT NULL,
  `status` enum('active','inactive') COLLATE utf8mb4_unicode_ci NOT NULL DEFAULT 'active',
  `deleted` tinyint(1) NOT NULL DEFAULT '0',
  `created_at` datetime(3) NOT NULL DEFAULT CURRENT_TIMESTAMP(3),
  `updated_at` datetime(3) NOT NULL,
  `grade_id` int NOT NULL,
  `section_id` int NOT NULL,
  PRIMARY KEY (`id`),
  KEY `students_school_year_id_fkey` (`school_year_id`),
  KEY `students_grade_id_fkey` (`grade_id`),
  KEY `students_section_id_fkey` (`section_id`),
  CONSTRAINT `students_grade_id_fkey` FOREIGN KEY (`grade_id`) REFERENCES `grades` (`id`) ON DELETE CASCADE ON UPDATE CASCADE,
  CONSTRAINT `students_school_year_id_fkey` FOREIGN KEY (`school_year_id`) REFERENCES `school_years` (`id`) ON DELETE CASCADE ON UPDATE CASCADE,
  CONSTRAINT `students_section_id_fkey` FOREIGN KEY (`section_id`) REFERENCES `sections` (`id`) ON DELETE CASCADE ON UPDATE CASCADE
) ENGINE=InnoDB AUTO_INCREMENT=30 DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_unicode_ci;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `students`
--

LOCK TABLES `students` WRITE;
/*!40000 ALTER TABLE `students` DISABLE KEYS */;
INSERT INTO `students` VALUES (1,1,'1234567890','John','','Doe','','male',12,'active',0,'2024-04-04 11:05:21.865','2024-04-04 11:05:21.865',1,1);
/*!40000 ALTER TABLE `students` ENABLE KEYS */;
UNLOCK TABLES;

--
-- Table structure for table `users`
--

DROP TABLE IF EXISTS `users`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!50503 SET character_set_client = utf8mb4 */;
CREATE TABLE `users` (
  `id` int NOT NULL AUTO_INCREMENT,
  `username` varchar(255) COLLATE utf8mb4_unicode_ci NOT NULL,
  `password` varchar(255) COLLATE utf8mb4_unicode_ci NOT NULL,
  `role` enum('student','advisor','counselor','principal') COLLATE utf8mb4_unicode_ci NOT NULL,
  `status` enum('active','inactive') COLLATE utf8mb4_unicode_ci NOT NULL,
  `deleted` tinyint(1) NOT NULL DEFAULT '0',
  `created_at` datetime(3) NOT NULL DEFAULT CURRENT_TIMESTAMP(3),
  `updated_at` datetime(3) NOT NULL,
  `student_id` int DEFAULT NULL,
  `grade_id` int DEFAULT NULL,
  `section_id` int DEFAULT NULL,
  `email` varchar(255) COLLATE utf8mb4_unicode_ci DEFAULT NULL,
  `deleted_username` varchar(255) COLLATE utf8mb4_unicode_ci DEFAULT NULL,
  `first_name` varchar(255) COLLATE utf8mb4_unicode_ci NOT NULL,
  `last_name` varchar(255) COLLATE utf8mb4_unicode_ci NOT NULL,
  PRIMARY KEY (`id`),
  UNIQUE KEY `users_username_key` (`username`),
  KEY `users_student_id_fkey` (`student_id`),
  KEY `users_grade_id_fkey` (`grade_id`),
  KEY `users_section_id_fkey` (`section_id`),
  CONSTRAINT `users_grade_id_fkey` FOREIGN KEY (`grade_id`) REFERENCES `grades` (`id`) ON DELETE CASCADE ON UPDATE CASCADE,
  CONSTRAINT `users_section_id_fkey` FOREIGN KEY (`section_id`) REFERENCES `sections` (`id`) ON DELETE CASCADE ON UPDATE CASCADE,
  CONSTRAINT `users_student_id_fkey` FOREIGN KEY (`student_id`) REFERENCES `students` (`id`) ON DELETE CASCADE ON UPDATE CASCADE
) ENGINE=InnoDB AUTO_INCREMENT=36 DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_unicode_ci;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `users`
--

LOCK TABLES `users` WRITE;
/*!40000 ALTER TABLE `users` DISABLE KEYS */;
INSERT INTO `users` VALUES (1,'7-1234567890','$2a$12$Q4Hx1AVc30Yd9W8BB0Qo3OQpgqsMjJ8fsEdh87SpQhG0IbQAU2M12','student','active',0,'2024-04-04 11:05:21.873','2024-04-04 11:05:21.873',1,1,1,NULL,NULL,'John','Doe'),(2,'advisor1','$2a$12$Q4Hx1AVc30Yd9W8BB0Qo3OQpgqsMjJ8fsEdh87SpQhG0IbQAU2M12','advisor','active',0,'2024-04-04 11:05:21.873','2024-04-04 11:05:21.873',NULL,1,1,NULL,NULL,'Olive','Tree'),(3,'counselor1','$2a$12$Q4Hx1AVc30Yd9W8BB0Qo3OQpgqsMjJ8fsEdh87SpQhG0IbQAU2M12','counselor','active',0,'2024-04-04 11:05:21.873','2024-04-04 11:05:21.873',NULL,NULL,NULL,NULL,NULL,'John','Smith'),(4,'principal1','$2a$12$Q4Hx1AVc30Yd9W8BB0Qo3OQpgqsMjJ8fsEdh87SpQhG0IbQAU2M12','principal','active',0,'2024-04-04 11:05:21.873','2024-04-04 11:05:21.873',NULL,NULL,NULL,NULL,NULL,'Harry','Potter');
/*!40000 ALTER TABLE `users` ENABLE KEYS */;
UNLOCK TABLES;
/*!40103 SET TIME_ZONE=@OLD_TIME_ZONE */;

/*!40101 SET SQL_MODE=@OLD_SQL_MODE */;
/*!40014 SET FOREIGN_KEY_CHECKS=@OLD_FOREIGN_KEY_CHECKS */;
/*!40014 SET UNIQUE_CHECKS=@OLD_UNIQUE_CHECKS */;
/*!40101 SET CHARACTER_SET_CLIENT=@OLD_CHARACTER_SET_CLIENT */;
/*!40101 SET CHARACTER_SET_RESULTS=@OLD_CHARACTER_SET_RESULTS */;
/*!40101 SET COLLATION_CONNECTION=@OLD_COLLATION_CONNECTION */;
/*!40111 SET SQL_NOTES=@OLD_SQL_NOTES */;

-- Dump completed on 2024-04-04 21:12:05
