-- MySQL dump 10.13  Distrib 8.2.0, for macos13 (arm64)
--
-- Host: roundhouse.proxy.rlwy.net    Database: dump
-- ------------------------------------------------------
-- Server version	8.2.0

/*!40101 SET @OLD_CHARACTER_SET_CLIENT=@@CHARACTER_SET_CLIENT */;
/*!40101 SET @OLD_CHARACTER_SET_RESULTS=@@CHARACTER_SET_RESULTS */;
/*!40101 SET @OLD_COLLATION_CONNECTION=@@COLLATION_CONNECTION */;
/*!50503 SET NAMES utf8mb4 */;
/*!40103 SET @OLD_TIME_ZONE=@@TIME_ZONE */;
/*!40103 SET TIME_ZONE='+00:00' */;
/*!40014 SET @OLD_UNIQUE_CHECKS=@@UNIQUE_CHECKS, UNIQUE_CHECKS=0 */;
/*!40014 SET @OLD_FOREIGN_KEY_CHECKS=@@FOREIGN_KEY_CHECKS, FOREIGN_KEY_CHECKS=0 */;
/*!40101 SET @OLD_SQL_MODE=@@SQL_MODE, SQL_MODE='NO_AUTO_VALUE_ON_ZERO' */;
/*!40111 SET @OLD_SQL_NOTES=@@SQL_NOTES, SQL_NOTES=0 */;

--
-- Table structure for table `article_images`
--

DROP TABLE IF EXISTS `article_images`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!50503 SET character_set_client = utf8mb4 */;
CREATE TABLE `article_images` (
  `id` int NOT NULL AUTO_INCREMENT,
  `image_path` text CHARACTER SET utf8mb4 COLLATE utf8mb4_0900_ai_ci,
  `alt_text` varchar(100) DEFAULT NULL,
  `article_id` int NOT NULL,
  PRIMARY KEY (`id`),
  KEY `article_images_articles_FK` (`article_id`),
  CONSTRAINT `article_images_articles_FK` FOREIGN KEY (`article_id`) REFERENCES `articles` (`id`) ON DELETE CASCADE ON UPDATE CASCADE
) ENGINE=InnoDB AUTO_INCREMENT=11 DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_0900_ai_ci;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `article_images`
--

LOCK TABLES `article_images` WRITE;
/*!40000 ALTER TABLE `article_images` DISABLE KEYS */;
INSERT INTO `article_images` VALUES (1,'https://sfgroup.centracdn.net/client/dynamic/images/3055_2aa8075624-220904999_1-full.jpg',NULL,1),(2,'https://sfgroup.centracdn.net/client/dynamic/images/3055_aac668dbca-220904999_2-full.jpg',NULL,1),(3,'https://sfgroup.centracdn.net/client/dynamic/images/3055_8d37ff3d65-220904999_3-full.jpg',NULL,1),(4,'https://sfgroup.centracdn.net/client/dynamic/images/3055_a22f5dc4d8-220904999_5-full.jpg',NULL,1),(5,'https://sfgroup.centracdn.net/client/dynamic/images/3055_c1a9975e1a-220904999_6-full.jpg',NULL,1),(6,'https://sfgroup.centracdn.net/client/dynamic/images/3055_2aa8075624-220904999_1-full.jpg',NULL,2),(7,'https://sfgroup.centracdn.net/client/dynamic/images/3055_aac668dbca-220904999_2-full.jpg',NULL,2),(8,'https://sfgroup.centracdn.net/client/dynamic/images/3055_8d37ff3d65-220904999_3-full.jpg',NULL,2),(9,'https://sfgroup.centracdn.net/client/dynamic/images/3055_a22f5dc4d8-220904999_5-full.jpg',NULL,2),(10,'https://sfgroup.centracdn.net/client/dynamic/images/3055_c1a9975e1a-220904999_6-full.jpg',NULL,2);
/*!40000 ALTER TABLE `article_images` ENABLE KEYS */;
UNLOCK TABLES;

--
-- Table structure for table `article_listing_relations`
--

DROP TABLE IF EXISTS `article_listing_relations`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!50503 SET character_set_client = utf8mb4 */;
CREATE TABLE `article_listing_relations` (
  `id` int NOT NULL AUTO_INCREMENT,
  `article_id` int NOT NULL,
  `listing_id` int NOT NULL,
  PRIMARY KEY (`id`),
  UNIQUE KEY `article_listing_relations_UN` (`article_id`,`listing_id`),
  KEY `article_listing_relations_listings_FK` (`listing_id`),
  CONSTRAINT `article_listing_relations_articles_FK` FOREIGN KEY (`article_id`) REFERENCES `articles` (`id`) ON DELETE CASCADE ON UPDATE CASCADE,
  CONSTRAINT `article_listing_relations_listings_FK` FOREIGN KEY (`listing_id`) REFERENCES `listings` (`id`) ON DELETE CASCADE ON UPDATE CASCADE
) ENGINE=InnoDB AUTO_INCREMENT=3 DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_0900_ai_ci;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `article_listing_relations`
--

LOCK TABLES `article_listing_relations` WRITE;
/*!40000 ALTER TABLE `article_listing_relations` DISABLE KEYS */;
INSERT INTO `article_listing_relations` VALUES (1,1,3),(2,2,3);
/*!40000 ALTER TABLE `article_listing_relations` ENABLE KEYS */;
UNLOCK TABLES;

--
-- Table structure for table `article_planned_sales_relation`
--

DROP TABLE IF EXISTS `article_planned_sales_relation`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!50503 SET character_set_client = utf8mb4 */;
CREATE TABLE `article_planned_sales_relation` (
  `id` int NOT NULL AUTO_INCREMENT,
  `article_id` int NOT NULL,
  `planned_sale_id` int NOT NULL,
  PRIMARY KEY (`id`),
  UNIQUE KEY `article_planned_sales_relation_UN` (`article_id`,`planned_sale_id`),
  KEY `article_planned_sales_relation_planned_sales_FK` (`planned_sale_id`),
  CONSTRAINT `article_planned_sales_relation_articles_FK` FOREIGN KEY (`article_id`) REFERENCES `articles` (`id`) ON DELETE CASCADE ON UPDATE CASCADE,
  CONSTRAINT `article_planned_sales_relation_planned_sales_FK` FOREIGN KEY (`planned_sale_id`) REFERENCES `planned_sales` (`id`) ON DELETE CASCADE ON UPDATE CASCADE
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_0900_ai_ci;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `article_planned_sales_relation`
--

LOCK TABLES `article_planned_sales_relation` WRITE;
/*!40000 ALTER TABLE `article_planned_sales_relation` DISABLE KEYS */;
/*!40000 ALTER TABLE `article_planned_sales_relation` ENABLE KEYS */;
UNLOCK TABLES;

--
-- Table structure for table `article_properties`
--

DROP TABLE IF EXISTS `article_properties`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!50503 SET character_set_client = utf8mb4 */;
CREATE TABLE `article_properties` (
  `id` int NOT NULL AUTO_INCREMENT,
  `size` enum('XS','S','M','L','XL') CHARACTER SET utf8mb4 COLLATE utf8mb4_0900_ai_ci DEFAULT NULL,
  `color` varchar(100) DEFAULT NULL,
  `article_id` int NOT NULL,
  PRIMARY KEY (`id`),
  KEY `article_properties_articles_FK` (`article_id`),
  CONSTRAINT `article_properties_articles_FK` FOREIGN KEY (`article_id`) REFERENCES `articles` (`id`)
) ENGINE=InnoDB AUTO_INCREMENT=3 DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_0900_ai_ci;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `article_properties`
--

LOCK TABLES `article_properties` WRITE;
/*!40000 ALTER TABLE `article_properties` DISABLE KEYS */;
INSERT INTO `article_properties` VALUES (1,'S','Black',1),(2,'M','Black',2);
/*!40000 ALTER TABLE `article_properties` ENABLE KEYS */;
UNLOCK TABLES;

--
-- Table structure for table `articles`
--

DROP TABLE IF EXISTS `articles`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!50503 SET character_set_client = utf8mb4 */;
CREATE TABLE `articles` (
  `id` int NOT NULL AUTO_INCREMENT,
  `name` varchar(200) NOT NULL,
  `brand_id` int DEFAULT NULL,
  `category_id` int DEFAULT NULL,
  `price` decimal(10,2) NOT NULL,
  `quantity_in_stock` int NOT NULL,
  `description` text,
  `garment_care` text,
  PRIMARY KEY (`id`),
  UNIQUE KEY `articles_UN` (`name`,`brand_id`),
  KEY `articles_brands_FK` (`brand_id`),
  KEY `articles_categories_FK` (`category_id`),
  CONSTRAINT `articles_brands_FK` FOREIGN KEY (`brand_id`) REFERENCES `brands` (`id`) ON DELETE SET NULL,
  CONSTRAINT `articles_categories_FK` FOREIGN KEY (`category_id`) REFERENCES `categories` (`id`) ON DELETE SET NULL ON UPDATE CASCADE,
  CONSTRAINT `articles_CHECK` CHECK ((`quantity_in_stock` > 0))
) ENGINE=InnoDB AUTO_INCREMENT=3 DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_0900_ai_ci;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `articles`
--

LOCK TABLES `articles` WRITE;
/*!40000 ALTER TABLE `articles` DISABLE KEYS */;
INSERT INTO `articles` VALUES (1,'Distressed Hood, Black, Small',1,1,1200.00,80,'Distressed Hood,, now in black and size S','Machine Washable'),(2,'Distressed Hood, Black, Medium',1,1,1200.00,43,'Distressed Hood, now in black and size M','Machine Washable');
/*!40000 ALTER TABLE `articles` ENABLE KEYS */;
UNLOCK TABLES;

--
-- Table structure for table `brands`
--

DROP TABLE IF EXISTS `brands`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!50503 SET character_set_client = utf8mb4 */;
CREATE TABLE `brands` (
  `id` int NOT NULL AUTO_INCREMENT,
  `name` varchar(200) NOT NULL,
  `description` text NOT NULL,
  `image` text CHARACTER SET utf8mb4 COLLATE utf8mb4_0900_ai_ci,
  PRIMARY KEY (`id`)
) ENGINE=InnoDB AUTO_INCREMENT=3 DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_0900_ai_ci;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `brands`
--

LOCK TABLES `brands` WRITE;
/*!40000 ALTER TABLE `brands` DISABLE KEYS */;
INSERT INTO `brands` VALUES (1,'Gasp','Shop men\'s bodybuilding clothing & workout apparel by GASP, dedicated to be the best gym wear brand available. Find wrist wraps, lifting straps, and more','data:image/jpeg;base64,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'),(2,'HM','&M is your shopping destination for fashion, home, beauty, kids\' clothes and more','https://upload.wikimedia.org/wikipedia/commons/thumb/5/53/H%26M-Logo.svg/640px-H%26M-Logo.svg.png');
/*!40000 ALTER TABLE `brands` ENABLE KEYS */;
UNLOCK TABLES;

--
-- Table structure for table `cart_items`
--

DROP TABLE IF EXISTS `cart_items`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!50503 SET character_set_client = utf8mb4 */;
CREATE TABLE `cart_items` (
  `id` int NOT NULL AUTO_INCREMENT,
  `cart_id` int NOT NULL,
  `article_id` int NOT NULL,
  `quantity` smallint DEFAULT NULL,
  `added_at` timestamp NOT NULL,
  PRIMARY KEY (`id`),
  KEY `cart_items_articles_FK` (`article_id`),
  KEY `cart_items_carts_FK` (`cart_id`),
  CONSTRAINT `cart_items_articles_FK` FOREIGN KEY (`article_id`) REFERENCES `articles` (`id`) ON DELETE CASCADE ON UPDATE CASCADE,
  CONSTRAINT `cart_items_carts_FK` FOREIGN KEY (`cart_id`) REFERENCES `carts` (`id`) ON DELETE CASCADE ON UPDATE CASCADE,
  CONSTRAINT `cart_items_CHECK` CHECK ((`quantity` > 0))
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_0900_ai_ci;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `cart_items`
--

LOCK TABLES `cart_items` WRITE;
/*!40000 ALTER TABLE `cart_items` DISABLE KEYS */;
/*!40000 ALTER TABLE `cart_items` ENABLE KEYS */;
UNLOCK TABLES;

--
-- Table structure for table `carts`
--

DROP TABLE IF EXISTS `carts`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!50503 SET character_set_client = utf8mb4 */;
CREATE TABLE `carts` (
  `id` int NOT NULL AUTO_INCREMENT,
  `user_id` int DEFAULT NULL,
  `guest_user_id` int DEFAULT NULL,
  PRIMARY KEY (`id`),
  UNIQUE KEY `carts_UN` (`user_id`),
  KEY `carts_guest_users_FK` (`guest_user_id`),
  CONSTRAINT `carts_guest_users_FK` FOREIGN KEY (`guest_user_id`) REFERENCES `guest_users` (`id`) ON DELETE SET NULL ON UPDATE CASCADE,
  CONSTRAINT `carts_users_FK` FOREIGN KEY (`user_id`) REFERENCES `users` (`id`) ON DELETE SET NULL ON UPDATE CASCADE
) ENGINE=InnoDB AUTO_INCREMENT=101 DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_0900_ai_ci;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `carts`
--

LOCK TABLES `carts` WRITE;
/*!40000 ALTER TABLE `carts` DISABLE KEYS */;
INSERT INTO `carts` VALUES (9,NULL,8),(10,NULL,9),(11,NULL,10),(12,NULL,11),(13,NULL,NULL),(14,NULL,NULL),(15,NULL,NULL),(16,NULL,NULL),(17,NULL,NULL),(18,NULL,NULL),(19,NULL,NULL),(20,NULL,NULL),(21,NULL,NULL),(22,NULL,NULL),(23,NULL,NULL),(24,NULL,NULL),(25,67,NULL),(26,16,NULL),(27,17,NULL),(28,18,NULL),(29,19,NULL),(30,20,NULL),(31,21,NULL),(32,22,NULL),(33,23,NULL),(34,24,NULL),(35,25,NULL),(36,26,NULL),(37,27,NULL),(38,28,NULL),(39,29,NULL),(40,30,NULL),(41,31,NULL),(42,32,NULL),(43,33,NULL),(44,34,NULL),(45,35,NULL),(46,36,NULL),(47,37,NULL),(48,38,NULL),(49,39,NULL),(50,40,NULL),(51,41,NULL),(52,42,NULL),(53,43,NULL),(54,44,NULL),(55,45,NULL),(56,46,NULL),(57,47,NULL),(58,48,NULL),(59,49,NULL),(60,50,NULL),(61,51,NULL),(62,52,NULL),(63,66,NULL),(64,54,NULL),(65,55,NULL),(66,56,NULL),(67,57,NULL),(70,NULL,14),(71,NULL,15),(72,NULL,16),(73,NULL,17),(74,NULL,18),(75,NULL,19),(76,NULL,20),(77,NULL,21),(78,NULL,22),(79,NULL,23),(80,NULL,24),(81,NULL,27),(82,NULL,28),(83,NULL,29),(84,NULL,30),(85,NULL,31),(86,NULL,32),(87,NULL,33),(88,NULL,34),(89,NULL,35),(90,NULL,36),(91,NULL,37),(92,NULL,38),(93,NULL,39),(94,NULL,40),(95,NULL,41),(96,NULL,42),(97,NULL,43),(98,58,NULL),(99,59,NULL),(100,60,NULL);
/*!40000 ALTER TABLE `carts` ENABLE KEYS */;
UNLOCK TABLES;

--
-- Table structure for table `categories`
--

DROP TABLE IF EXISTS `categories`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!50503 SET character_set_client = utf8mb4 */;
CREATE TABLE `categories` (
  `id` int NOT NULL AUTO_INCREMENT,
  `name` varchar(200) NOT NULL,
  `description` text NOT NULL,
  `image` text CHARACTER SET utf8mb4 COLLATE utf8mb4_0900_ai_ci,
  PRIMARY KEY (`id`)
) ENGINE=InnoDB AUTO_INCREMENT=3 DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_0900_ai_ci;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `categories`
--

LOCK TABLES `categories` WRITE;
/*!40000 ALTER TABLE `categories` DISABLE KEYS */;
INSERT INTO `categories` VALUES (1,'Gym Wear','Wear for the gym. Made to get sweaty','data:image/jpeg;base64,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'),(2,'Casual Wear','123','https://www.apetogentleman.com/wp-content/uploads/2021/12/smart-casual-outfits-men-polo-1.jpg');
/*!40000 ALTER TABLE `categories` ENABLE KEYS */;
UNLOCK TABLES;

--
-- Table structure for table `guest_users`
--

DROP TABLE IF EXISTS `guest_users`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!50503 SET character_set_client = utf8mb4 */;
CREATE TABLE `guest_users` (
  `id` int NOT NULL AUTO_INCREMENT,
  `created_at` timestamp NOT NULL,
  `logged_in_at` timestamp NOT NULL,
  PRIMARY KEY (`id`)
) ENGINE=InnoDB AUTO_INCREMENT=44 DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_0900_ai_ci;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `guest_users`
--

LOCK TABLES `guest_users` WRITE;
/*!40000 ALTER TABLE `guest_users` DISABLE KEYS */;
INSERT INTO `guest_users` VALUES (8,'2024-01-03 20:33:06','2024-01-03 20:54:12'),(9,'2024-01-03 20:33:07','2024-01-03 20:33:07'),(10,'2024-01-03 20:33:08','2024-01-03 20:33:08'),(11,'2024-01-03 20:33:09','2024-01-03 20:33:09'),(12,'2024-01-05 17:35:26','2024-01-05 17:35:26'),(13,'2024-01-05 17:35:34','2024-01-05 17:35:34'),(14,'2024-01-05 17:36:49','2024-01-05 17:36:49'),(15,'2024-01-05 17:40:57','2024-01-05 17:40:57'),(16,'2024-01-05 17:42:00','2024-01-05 17:42:00'),(17,'2024-01-05 17:43:15','2024-01-05 17:43:15'),(18,'2024-01-05 17:43:23','2024-01-05 17:43:23'),(19,'2024-01-05 17:43:24','2024-01-05 17:43:24'),(20,'2024-01-05 17:43:28','2024-01-05 17:43:28'),(21,'2024-01-05 17:43:53','2024-01-05 17:43:53'),(22,'2024-01-05 17:43:55','2024-01-05 17:43:55'),(23,'2024-01-05 17:44:27','2024-01-05 17:44:27'),(24,'2024-01-05 17:45:55','2024-01-05 17:45:55'),(25,'2024-01-05 17:51:15','2024-01-05 17:51:15'),(26,'2024-01-05 17:51:20','2024-01-05 17:51:20'),(27,'2024-01-05 18:12:28','2024-01-05 18:12:28'),(28,'2024-01-05 18:12:36','2024-01-05 18:12:36'),(29,'2024-01-05 18:14:10','2024-01-05 18:14:10'),(30,'2024-01-05 18:14:11','2024-01-05 18:14:11'),(31,'2024-01-05 18:14:12','2024-01-05 18:14:12'),(32,'2024-01-05 18:14:13','2024-01-05 18:14:13'),(33,'2024-01-05 18:14:13','2024-01-05 18:14:13'),(34,'2024-01-05 18:14:14','2024-01-05 18:14:14'),(35,'2024-01-05 18:14:14','2024-01-05 18:14:14'),(36,'2024-01-05 18:14:14','2024-01-05 18:14:14'),(37,'2024-01-05 18:15:05','2024-01-05 18:15:05'),(38,'2024-01-05 18:15:06','2024-01-05 18:15:06'),(39,'2024-01-05 18:15:06','2024-01-05 18:15:06'),(40,'2024-01-05 18:15:06','2024-01-05 18:15:06'),(41,'2024-01-05 18:15:07','2024-01-05 18:15:07'),(42,'2024-01-05 18:15:07','2024-01-05 18:15:07'),(43,'2024-01-05 18:15:07','2024-01-05 18:15:07');
/*!40000 ALTER TABLE `guest_users` ENABLE KEYS */;
UNLOCK TABLES;

--
-- Table structure for table `listings`
--

DROP TABLE IF EXISTS `listings`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!50503 SET character_set_client = utf8mb4 */;
CREATE TABLE `listings` (
  `id` int NOT NULL AUTO_INCREMENT,
  `title` varchar(200) NOT NULL,
  `description` text NOT NULL,
  `article_id_default` int DEFAULT NULL,
  `image_path` text CHARACTER SET utf8mb4 COLLATE utf8mb4_0900_ai_ci,
  PRIMARY KEY (`id`),
  KEY `listings_articles_FK` (`article_id_default`),
  CONSTRAINT `listings_articles_FK` FOREIGN KEY (`article_id_default`) REFERENCES `articles` (`id`) ON DELETE SET NULL ON UPDATE CASCADE
) ENGINE=InnoDB AUTO_INCREMENT=4 DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_0900_ai_ci;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `listings`
--

LOCK TABLES `listings` WRITE;
/*!40000 ALTER TABLE `listings` DISABLE KEYS */;
INSERT INTO `listings` VALUES (3,'Distressed Hood, Black','Distressed Hood, Black by Gasp',1,'https://sfgroup.centracdn.net/client/dynamic/images/3055_2aa8075624-220904999_1-full.jpg');
/*!40000 ALTER TABLE `listings` ENABLE KEYS */;
UNLOCK TABLES;

--
-- Table structure for table `order_items`
--

DROP TABLE IF EXISTS `order_items`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!50503 SET character_set_client = utf8mb4 */;
CREATE TABLE `order_items` (
  `id` int NOT NULL AUTO_INCREMENT,
  `order_id` int NOT NULL,
  `quantity` smallint NOT NULL,
  `article_id` int DEFAULT NULL,
  PRIMARY KEY (`id`),
  KEY `order_items_orders_FK` (`order_id`),
  KEY `order_items_articles_FK` (`article_id`),
  CONSTRAINT `order_items_articles_FK` FOREIGN KEY (`article_id`) REFERENCES `articles` (`id`) ON DELETE SET NULL ON UPDATE CASCADE,
  CONSTRAINT `order_items_orders_FK` FOREIGN KEY (`order_id`) REFERENCES `orders` (`id`) ON DELETE CASCADE ON UPDATE CASCADE,
  CONSTRAINT `order_items_CHECK` CHECK ((`quantity` > 0))
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_0900_ai_ci;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `order_items`
--

LOCK TABLES `order_items` WRITE;
/*!40000 ALTER TABLE `order_items` DISABLE KEYS */;
/*!40000 ALTER TABLE `order_items` ENABLE KEYS */;
UNLOCK TABLES;

--
-- Table structure for table `orders`
--

DROP TABLE IF EXISTS `orders`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!50503 SET character_set_client = utf8mb4 */;
CREATE TABLE `orders` (
  `id` int NOT NULL AUTO_INCREMENT,
  `ordered_at` timestamp NOT NULL,
  `cart_id` int DEFAULT NULL,
  `notes` text,
  `adress` varchar(400) NOT NULL,
  `payment_method` varchar(400) NOT NULL,
  `estimated_delivery_at` timestamp NULL DEFAULT NULL,
  PRIMARY KEY (`id`),
  KEY `orders_carts_FK` (`cart_id`),
  CONSTRAINT `orders_carts_FK` FOREIGN KEY (`cart_id`) REFERENCES `carts` (`id`) ON DELETE SET NULL ON UPDATE CASCADE
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_0900_ai_ci;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `orders`
--

LOCK TABLES `orders` WRITE;
/*!40000 ALTER TABLE `orders` DISABLE KEYS */;
/*!40000 ALTER TABLE `orders` ENABLE KEYS */;
UNLOCK TABLES;

--
-- Table structure for table `planned_sales`
--

DROP TABLE IF EXISTS `planned_sales`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!50503 SET character_set_client = utf8mb4 */;
CREATE TABLE `planned_sales` (
  `id` int NOT NULL AUTO_INCREMENT,
  `start_time` datetime NOT NULL,
  `end_time` datetime NOT NULL,
  `name` varchar(200) NOT NULL,
  `announcement_title` text,
  PRIMARY KEY (`id`)
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_0900_ai_ci;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `planned_sales`
--

LOCK TABLES `planned_sales` WRITE;
/*!40000 ALTER TABLE `planned_sales` DISABLE KEYS */;
/*!40000 ALTER TABLE `planned_sales` ENABLE KEYS */;
UNLOCK TABLES;

--
-- Table structure for table `users`
--

DROP TABLE IF EXISTS `users`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!50503 SET character_set_client = utf8mb4 */;
CREATE TABLE `users` (
  `id` int NOT NULL AUTO_INCREMENT,
  `first_name` varchar(200) NOT NULL,
  `last_name` varchar(200) NOT NULL,
  `phone_number` varchar(200) NOT NULL,
  `email` varchar(200) NOT NULL,
  `password` varchar(500) NOT NULL,
  `created_at` timestamp NOT NULL,
  `logged_in_at` timestamp NOT NULL,
  `is_admin` tinyint(1) DEFAULT NULL,
  PRIMARY KEY (`id`),
  UNIQUE KEY `users_UN` (`email`)
) ENGINE=InnoDB AUTO_INCREMENT=68 DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_0900_ai_ci;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `users`
--

LOCK TABLES `users` WRITE;
/*!40000 ALTER TABLE `users` DISABLE KEYS */;
INSERT INTO `users` VALUES (16,'balazs','string','string','string','$2b$10$uLWxS/bF0y7jd0S9OFrqY.DIxmDs72dOuGu8XEkhWCS7oBhstXyg.','2024-01-05 11:19:18','2024-01-05 11:19:18',NULL),(17,'balazs','string','string','string@mem.com','$2b$10$9TT5zRpEBD8oSVI/3mPa0.FbiONpRex1T5T.BPIruhzAOc6hi2.Se','2024-01-05 11:29:59','2024-01-05 11:29:59',NULL),(18,'balazs','string','string','string@mem.cweweom','$2b$10$3uN6w4g.ejsjcV1CS9VE1O/PVPgx6flzBTP5hI/A3ktP4jdmbp04y','2024-01-05 11:30:41','2024-01-05 11:30:41',NULL),(19,'balazs','string','string','string@mem.cweweommm','$2b$10$ui0LLeJ7RMhDO48rvwmgU.5fsPD.rY5kD3etLrwMkPu0caY47TQdq','2024-01-05 11:33:39','2024-01-05 11:33:39',NULL),(20,'Candace','Santos','+1 (183) 628-4225','zocu@mailinator.com','$2b$10$Ht9q2Ojh97KYwHsqbimFZ.b3hZjN2Yz.cGOKAjWK.buxp9hrC4wEq','2024-01-05 11:52:27','2024-01-05 11:52:27',NULL),(21,'Candace','Santos','+1 (183) 628-4225','zocu@mailinator.commm','$2b$10$TwfYkd4/m1QIeY8pCrjb5ONkFGMm9QTOTmzjMrQHjhg8xSGGPdnS2','2024-01-05 11:55:59','2024-01-05 11:55:59',NULL),(22,'Elliott','Black','+1 (552) 604-9207','ripenazod@mailinator.com','$2b$10$BESc3WrSOoE1d0fkO12MIOEbZL9YdW3Z/WN1hRnwVQ2Gv5/HmJske','2024-01-05 12:12:24','2024-01-05 12:12:24',NULL),(23,'Myles','Hardy','+1 (282) 148-8634','gocyba@mailinator.com','$2b$10$UpzGVTD6/wOUT0y/h2slh.wrW6BNSpCQ/rs84Tk1YKdc6pImJk4yi','2024-01-05 12:18:49','2024-01-05 12:18:49',NULL),(24,'Myles','Hardy','+1 (282) 148-8634','gocyba@mailinator.come435345','$2b$10$EwIGSIUPEnknCI6foHgg4.x4B4QHRXLw99phhPRUGkPu9sZ98tT6u','2024-01-05 12:19:10','2024-01-05 12:19:10',NULL),(25,'Myles','Hardy','+1 (282) 148-8634','gocyba@mailinator.come435345er','$2b$10$CCFV1AXjvF7ig//4UB7Yk.Thq3a6dvtV0aLPIb1.HrKDpcf6lN/NK','2024-01-05 12:19:37','2024-01-05 12:19:37',NULL),(26,'Myles','Hardy','+1 (282) 148-8634','gocyba@mailinator.come435345erwer','$2b$10$Jj/Z5nhjqf5qFRSYxd3C0.OqM93V19OiT9BlgDVD/QERxA3stof9e','2024-01-05 12:20:05','2024-01-05 12:20:05',NULL),(27,'','','','','$2b$10$peZzfYSGHjIaXoOtp6ApdOvqcFPbq9NchN5ZqxDp0UV8yRxXcifSO','2024-01-05 12:31:03','2024-01-05 12:31:03',NULL),(28,'Dana','Horton','+1 (277) 104-7941','mabecin@mailinator.com','$2b$10$cSDfofMOe00kEY25msJT6.15EbEDQCRM1w13852Wi30FRhma0DdQe','2024-01-05 12:32:22','2024-01-05 12:32:22',NULL),(29,'Francis','Torres','+1 (515) 197-7289','nelyvecu@mailinator.com','$2b$10$JMbE9DBM/Zuvjrn/MjIkquzkdT9EkY8CISddfgmIdA8gFyX9jmt2i','2024-01-05 13:12:10','2024-01-05 13:12:10',NULL),(30,'Autumn','Osborne','+1 (758) 918-4393','gedygyfo@mailinator.com','$2b$10$.IBcvotWJLS8sxne1Jd4P.5CnBrQRtyGbxWAy8H1rnEvfoF644qtu','2024-01-05 13:15:38','2024-01-05 13:15:38',NULL),(31,'Madeline','Alvarado','+1 (735) 677-3672','zegyvas@mailinator.com','$2b$10$4rDyIVP/lVnhLIpYL3DBieU2DXTizSJgfjNvDYVuu4tbviman1vAe','2024-01-05 13:23:27','2024-01-05 13:23:27',NULL),(32,'Rowan','Gutierrez','+1 (937) 604-3746','cacifohuw@mailinator.com','$2b$10$W6lKNMb02d38O3rqCUs1R.KwczekeDVyUiezkMK2PorLzAa/AhRBq','2024-01-05 13:24:16','2024-01-05 13:24:16',NULL),(33,'Chancellor','Rich','+1 (786) 283-7683','feveneqovu@mailinator.com','$2b$10$Fz/mgbduyuNcds0sYrwRkugl3XCBmqjV54dx9b4O.VZNWvcLhzjxe','2024-01-05 13:58:56','2024-01-05 13:58:56',NULL),(34,'Leroy','Trujillo','+1 (752) 963-9798','micepyw@mailinator.com','$2b$10$NZSgC/z9u9l6Kdl9TvcmreRPtrAbZKUTolGVF7kDG7oylrasitFCG','2024-01-05 14:37:34','2024-01-05 14:37:34',NULL),(35,'Iola','Raymond','+1 (885) 666-4053','tytegu@mailinator.com','$2b$10$SoHw4A.jQ.vNUJ.ASnZxUuWwYdDCHhQ2ekCO00ncu1uUJ24zU4yEC','2024-01-05 14:38:23','2024-01-05 14:38:23',NULL),(36,'Calvin','Graves','+1 (561) 364-9932','xiqa@mailinator.com','$2b$10$uHasWfTCv8av01MbT5pX3uhGO96QSv8zcuZ5Flp7WUeK2VWGWognG','2024-01-05 14:40:22','2024-01-05 14:40:22',NULL),(37,'Kibo','Lane','+1 (611) 727-3811','tazefabyzu@mailinator.com','$2b$10$/3tkPPe7etAHls5pLwQrz.J9fA8fOXvpsIrtJuJeD66s40zAC9W2q','2024-01-05 14:41:02','2024-01-05 14:41:02',NULL),(38,'Noelani','Bradford','+1 (234) 947-6999','degif@mailinator.com','$2b$10$ZgdiN3lqz4A9TGFrFp.Cteq0MeDOq7.1RLSpIdGBEuR6jMHbyOyvW','2024-01-05 14:44:19','2024-01-05 14:44:19',NULL),(39,'Malachi','Moss','+1 (933) 845-3657','vano@mailinator.com','$2b$10$iUpFRVtb8VmhCVhFaJxom.ueU3rObtaiovf0wCepIlHpd4vVQI3n2','2024-01-05 14:45:12','2024-01-05 14:45:12',NULL),(40,'Aspen','Stephens','+1 (326) 604-8855','rikesoxal@mailinator.com','$2b$10$Ep7VFkDnO6PIE.3AfreQeOxaLoBI1AnUMDq.I7W.pJHMbF7CVtfCe','2024-01-05 14:45:45','2024-01-05 14:45:45',NULL),(41,'Nigel','Shaffer','+1 (369) 127-6848','cikiza@mailinator.com','$2b$10$VtS.Dmju9J46.q1nV5Miv.KP8NZY/prJFQcpdsc8DhF06JfN6/ABu','2024-01-05 14:46:25','2024-01-05 14:46:25',NULL),(42,'Eliana','Gould','+1 (479) 153-8679','qagoceq@mailinator.com','$2b$10$FUYc.Gmhrd3ql/CJVxUfPebxcXoxOkVA0BU/VlturxdZP1aDRAbHK','2024-01-05 14:51:21','2024-01-05 14:51:21',NULL),(43,'Maya','Summers','+1 (483) 532-6687','subecycewe@mailinator.com','$2b$10$BMYsnpp8eGAxNUFvde.nMOvGWsEeAECuLQQ/NLiYqHA95tpppe3tS','2024-01-05 14:58:14','2024-01-05 14:58:14',NULL),(44,'Hilary','Ratliff','+1 (798) 905-1161','lagar@mailinator.com','$2b$10$nPl2dl6aCMsBlSzZByXOV.LF233w8RK6t41/dQdBgnmpvULeHeZrm','2024-01-05 15:00:58','2024-01-05 15:00:58',NULL),(45,'Thomas','Ashley','+1 (667) 502-8629','macomo@mailinator.com','$2b$10$AGOdKYTJFFvoLvLjC8Sii.bGeqpNmUGuuTD9fx3cauOIqAlvTxzVS','2024-01-05 15:22:24','2024-01-05 15:22:24',NULL),(46,'Sacha','Massey','+1 (658) 412-5613','baqofug@mailinator.com','$2b$10$Rql55qtF7zRh//2bRjbfFOm6WQmf79QAf1qmttPuGQBI6gauBAlw.','2024-01-05 15:34:18','2024-01-05 15:34:18',NULL),(47,'Gisela','Love','+1 (937) 562-5941','hepe@mailinator.com','$2b$10$Ho6Qu.ipTLXMGngZirKvEOYM2AawDECq7dsqVg63YniYvEJno.TJS','2024-01-05 15:35:51','2024-01-05 15:35:51',NULL),(48,'Jamalia','Chambers','+1 (234) 596-9797','gicul@mailinator.com','$2b$10$LnR66S1mcD8nVZSy7E09Y.f1Ujp5hz/4U/rDgXIw2/dNrfOkOb0qa','2024-01-05 15:40:59','2024-01-05 15:40:59',NULL),(49,'Balazs','Hevesi','0732','balazzz@gmail.com','$2b$10$q7/ZD9OYUHWk5Pq1l3OEhuToKC9/CZgCxfDC5NYI09m3/XVp/fvda','2024-01-05 15:52:57','2024-01-05 15:52:57',NULL),(50,'Balazs','Hevesi','0732','balazzz@gmail.come','$2b$10$QykethNLZLjkeY3BR3SeOuHSrGQd5O.Oy5qHPH6H13u3CX4nANeTi','2024-01-05 15:53:18','2024-01-05 15:53:18',NULL),(51,'Kieran','Dillard','+1 (516) 182-8101','fadixemev@mailinator.com','$2b$10$c9x7czmef.X0F4KkUXItx.L8oqgdCKlapMxQ3TwCuFguldAry22JC','2024-01-05 15:55:29','2024-01-05 15:55:29',NULL),(52,'Inga','Burks','+1 (193) 555-5869','nufoloqude@mailinator.com','$2b$10$yptTokvHgFWTgBflq87Ccuyr88nYS3QeEpor68n4hBneH7zKliCkS','2024-01-05 15:55:50','2024-01-05 15:55:50',NULL),(54,'Balazs','Hevesi','123','balazshevesi@gmail.com','$2b$10$OJxs70fma2LoLHlGaRP1GuRnNR.W3ebS4iPMwlRJBHn9A0klEpcXi','2024-01-05 17:04:31','2024-01-05 17:04:31',NULL),(55,'Balazs','Hevesi','+1 (564) 122-5122','balazshevesi13@gmail.commm','$2b$10$WDmxAzQMSE4XLYeeO8y1LeQUmGegtypsIlp4eYDoWn7GcnLhYBUCu','2024-01-05 17:18:57','2024-01-05 17:18:57',NULL),(56,'Balazs','Hevesi','123','balazshevesi13@gmail.commmmm','$2b$10$FO.jGnenr5tReYaHYif1M.vhzB12bnTHVYahP9VAwie/Hthu6JqMO','2024-01-05 17:21:09','2024-01-05 17:21:09',NULL),(57,'Balazs','Hevesi','123','balazshevesi13@gmai','$2b$10$XT8Lw9DHhZHXJLJZOWrPtOOX.EjXzWm.w4vOVj6Fq6tCMy679SgVq','2024-01-05 17:22:04','2024-01-05 17:22:04',NULL),(58,'Kenneth','Dale','+1 (951) 534-7106','wygowu@mailinator.com','$2b$10$uu3waZoWj6arDlH014IUQOLRa/s6sn79ZTWqkOpwbUB/WyHzE0HH.','2024-01-05 22:32:24','2024-01-05 22:32:24',NULL),(59,'Caleb','Park','+1 (589) 421-5979','subigunod@mailinator.com','$2b$10$GZUU0uaMVVCJYnh5QU9ibeZkI4rmwVhZFhPaZrQ64VYKGmOYcBJD2','2024-01-05 22:36:13','2024-01-05 22:36:13',NULL),(60,'Ashely','Smith','+1 (979) 148-9686','qazuzide@mailinator.com','$2b$10$5liS1vLx4g66yD12CuOQkOZPjUyGIFwvg8687H6s7u3ewNSwcYHHW','2024-01-05 22:57:47','2024-01-05 22:57:47',NULL),(66,'Balazs','Hevesi','123','balazshevesi13@gmail.com','$2b$10$bVBeQbSFpBvOBzK8OcVhHeYU7rSlsdNgsML3alxe3sSoeFESioyXS','2024-01-05 16:26:58','2024-01-05 16:26:58',1),(67,'Balazs','Hevesi','073','balazshevesi13@gmail.cmom','123','2024-01-05 10:57:46','2024-01-05 10:57:46',1);
/*!40000 ALTER TABLE `users` ENABLE KEYS */;
UNLOCK TABLES;

--
-- Dumping routines for database 'dump'
--
/*!40103 SET TIME_ZONE=@OLD_TIME_ZONE */;

/*!40101 SET SQL_MODE=@OLD_SQL_MODE */;
/*!40014 SET FOREIGN_KEY_CHECKS=@OLD_FOREIGN_KEY_CHECKS */;
/*!40014 SET UNIQUE_CHECKS=@OLD_UNIQUE_CHECKS */;
/*!40101 SET CHARACTER_SET_CLIENT=@OLD_CHARACTER_SET_CLIENT */;
/*!40101 SET CHARACTER_SET_RESULTS=@OLD_CHARACTER_SET_RESULTS */;
/*!40101 SET COLLATION_CONNECTION=@OLD_COLLATION_CONNECTION */;
/*!40111 SET SQL_NOTES=@OLD_SQL_NOTES */;

-- Dump completed on 2024-01-13 20:46:20
