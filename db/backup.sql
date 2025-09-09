
DROP TABLE IF EXISTS `employees`;

CREATE TABLE `employees` (
  `id` int NOT NULL AUTO_INCREMENT,
  `employee_name` varchar(100) NOT NULL,
  `employee_id` varchar(20) NOT NULL,
  `department` varchar(50) DEFAULT NULL,
  `designation` varchar(100) DEFAULT NULL,
  `project` varchar(100) DEFAULT NULL,
  `type` varchar(50) DEFAULT 'not mentioned',
  `status` varchar(50) DEFAULT 'not mentioned',
  `image_url` varchar(255) DEFAULT NULL,
  `created_at` timestamp NULL DEFAULT CURRENT_TIMESTAMP,
  PRIMARY KEY (`id`),
  UNIQUE KEY `employee_id` (`employee_id`)
) ENGINE=InnoDB AUTO_INCREMENT=54 DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_0900_ai_ci;


LOCK TABLES `employees` WRITE;

INSERT INTO `employees` VALUES 
(1,'Priya','100001','HR','HR Manager','Recruitment System','Office','Permanent','/uploads/1757317664543-514711669.jpg','2025-09-08 08:05:01'),
(2,'Arun','100002','Finance','Accountant','Payroll System','Office','Permanent','/uploads/1757317664543-514711669.jpg','2025-09-08 08:05:21'),
(3,'Divya','100003','IT','Software Engineer','Internal Portal','Office','Permanent','/uploads/1757317664543-514711669.jpg','2025-09-08 08:05:26'),
(4,'Karthik','100004','Marketing','Marketing Executive','Campaign Management','Remote','Contract','/uploads/1757317664543-514711669.jpg','2025-09-08 08:05:30'),
(5,'Meena','100005','Sales','Sales Manager','Client Outreach','Office','Permanent','/uploads/1757317664543-514711669.jpg','2025-09-08 08:05:33'),
(6,'Vikram','100006','IT','DevOps Engineer','Cloud Migration','Office','Permanent','/uploads/1757317664543-514711669.jpg','2025-09-08 08:05:36'),
(7,'Anitha','100007','HR','Recruiter','Hiring Drive','Office','Permanent','/uploads/1757317664543-514711669.jpg','2025-09-08 08:05:39'),
(8,'Ramesh','100008','Finance','Financial Analyst','Budget Planning','Office','Permanent','/uploads/1757317664543-514711669.jpg','2025-09-08 08:05:42'),
(9,'Sneha','100009','Marketing','Content Writer','Content Strategy','Remote','Contract','/uploads/1757317664543-514711669.jpg','2025-09-08 08:05:44'),
(10,'Manoj','100010','IT','Frontend Developer','Website Revamp','Office','Permanent','/uploads/1757317664543-514711669.jpg','2025-09-08 08:05:47'),
(11,'Riya','100011','Sales','Sales Executive','Client Acquisition','Remote','Permanent','/uploads/1757317664543-514711669.jpg','2025-09-08 08:05:49'),
(12,'Hari','100012','IT','Backend Developer','API Development','Office','Permanent','/uploads/1757317664543-514711669.jpg','2025-09-08 08:05:51'),
(13,'Pooja','100013','HR','HR Executive','Employee Engagement','Office','Permanent','/uploads/1757317664543-514711669.jpg','2025-09-08 08:05:54'),
(14,'Suresh','100014','Finance','Auditor','Audit System','Office','Permanent','/uploads/1757317664543-514711669.jpg','2025-09-08 08:05:56'),
(15,'Lakshmi','100015','Marketing','SEO Specialist','Website Optimization','Remote','Contract','/uploads/1757317664543-514711669.jpg','2025-09-08 08:05:58'),
(16,'Rajesh','100016','IT','Fullstack Developer','E-commerce Portal','Office','Permanent','/uploads/1757317664543-514711669.jpg','2025-09-08 08:05:59'),
(17,'Divya','100017','HR','HR Coordinator','Onboarding','Office','Permanent','/uploads/1757317664543-514711669.jpg','2025-09-08 08:06:01'),
(18,'Kiran','100018','Finance','Tax Analyst','Tax Filing','Office','Permanent','/uploads/1757317664543-514711669.jpg','2025-09-08 08:06:03'),
(19,'Shreya','100019','Marketing','Social Media Manager','Campaigns','Remote','Contract','/uploads/1757317664543-514711669.jpg','2025-09-08 08:06:05'),
(20,'Rohan','100020','IT','QA Engineer','Testing Suite','Office','Permanent','/uploads/1757317664543-514711669.jpg','2025-09-08 08:06:07'),
(21,'Anjali','100021','Sales','Sales Associate','Retail Expansion','Remote','Permanent','/uploads/1757317664543-514711669.jpg','2025-09-08 08:06:09'),
(22,'Vasanth','100022','IT','Network Engineer','Infrastructure Upgrade','Office','Permanent','/uploads/1757317664543-514711669.jpg','2025-09-08 08:06:11'),
(23,'Priyanka','100023','HR','HR Associate','Training','Office','Permanent','/uploads/1757317664543-514711669.jpg','2025-09-08 08:06:13'),
(24,'Sanjay','100024','Finance','Budget Analyst','Forecasting','Office','Permanent','/uploads/1757317664543-514711669.jpg','2025-09-08 08:06:15'),
(25,'Rekha','100025','Marketing','PR Manager','Public Relations','Remote','Contract','/uploads/1757317664543-514711669.jpg','2025-09-08 08:06:17'),
(26,'Vikram','100026','IT','Backend Developer','API Gateway','Office','Permanent','/uploads/1757317664543-514711669.jpg','2025-09-08 08:59:33'),
(27,'Neha','100027','HR','HR Manager','Employee Engagement','Remote','Probation','/uploads/1757317664543-514711669.jpg','2025-09-08 08:59:56'),
(28,'Arun','100028','Finance','Financial Analyst','Budget Planning','Office','Contract','/uploads/1757317664543-514711669.jpg','2025-09-08 08:59:59'),
(29,'Sneha','100029','Marketing','SEO Specialist','Website Ranking','Remote','Permanent','/uploads/1757317664543-514711669.jpg','2025-09-08 09:00:02'),
(30,'Ravi','100030','Sales','Regional Manager','Market Expansion','Office','Permanent','/uploads/1757317664543-514711669.jpg','2025-09-08 09:00:09'),
(31,'Lakshmi','100031','Design','Graphic Designer','Brand Identity','Remote','Contract','/uploads/1757317664543-514711669.jpg','2025-09-08 09:00:47'),
(32,'Manoj','100032','Operations','Logistics Coordinator','Supply Chain','Office','Permanent','/uploads/1757317664543-514711669.jpg','2025-09-08 09:00:51'),
(33,'Pooja','100033','IT','Frontend Developer','Dashboard UI','Remote','Probation','/uploads/1757317664543-514711669.jpg','2025-09-08 09:00:57'),
(34,'Ajay','100034','Support','Customer Support Lead','Ticketing System','Office','Permanent','/uploads/1757317664543-514711669.jpg','2025-09-08 09:01:00'),
(35,'Kavya','100035','Marketing','Content Writer','Email Campaigns','Remote','Contract','/uploads/1757317664543-514711669.jpg','2025-09-08 09:01:03'),
(36,'Sunil','100036','Finance','Tax Consultant','Tax Filing','Office','Permanent','/uploads/1757317664543-514711669.jpg','2025-09-08 09:01:06'),
(37,'Ritika','100037','HR','Recruiter','Talent Acquisition','Remote','Probation','/uploads/1757317664543-514711669.jpg','2025-09-08 09:01:08'),
(38,'Deepak','100038','Sales','Sales Associate','Client Onboarding','Office','Contract','/uploads/1757317664543-514711669.jpg','2025-09-08 09:01:12'),
(39,'Ishita','100039','Design','Product Designer','Mobile App','Remote','Permanent','/uploads/1757317664543-514711669.jpg','2025-09-08 09:01:14'),
(40,'Gopal','100040','Operations','Operations Analyst','Process Optimization','Office','Permanent','/uploads/1757317664543-514711669.jpg','2025-09-08 09:01:17'),
(41,'Shreya','100041','IT','QA Engineer','Testing Framework','Remote','Probation','/uploads/1757317664543-514711669.jpg','2025-09-08 09:01:19'),
(42,'Harish','100042','Support','Technical Support','Help Desk','Office','Permanent','/uploads/1757317664543-514711669.jpg','2025-09-08 09:01:22'),
(43,'Anusha','100043','Marketing','Brand Manager','Product Launch','Remote','Contract','/uploads/1757317664543-514711669.jpg','2025-09-08 09:01:24'),
(44,'Ramesh','100044','Finance','Auditor','Internal Audit','Office','Permanent','/uploads/1757317664543-514711669.jpg','2025-09-08 09:01:47'),
(45,'Tanya','100045','HR','Training Coordinator','Skill Development','Remote','Probation','/uploads/1757317664543-514711669.jpg','2025-09-08 09:01:51'),
(46,'Varun','100046','Sales','Business Development','Partnership Deals','Office','Contract','/uploads/1757317664543-514711669.jpg','2025-09-08 09:01:53'),
(47,'Monika','100047','Design','Illustrator','Marketing Creatives','Remote','Permanent','/uploads/1757317664543-514711669.jpg','2025-09-08 09:01:56'),
(48,'Santosh','100048','Operations','Project Coordinator','ERP Implementation','Office','Permanent','/uploads/1757317664543-514711669.jpg','2025-09-08 09:02:00'),
(49,'Nisha','100049','IT','DevOps Engineer','CI/CD Pipeline','Remote','Probation','/uploads/1757317664543-514711669.jpg','2025-09-08 09:02:02'),
(50,'Abhishek','100050','Support','Support Engineer','Customer Care','Office','Permanent','/uploads/1757317664543-514711669.jpg','2025-09-08 09:02:05'),
(53,'Priya','85236999','HR','HR Manager','Recruitment System','OFC','process','/uploads/1757324509613-477142615.jpg','2025-09-08 09:41:49');

UNLOCK TABLES;


