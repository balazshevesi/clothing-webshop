-- Current sql file was generated after introspecting the database
-- If you want to run this migration please uncomment this code before executing migrations
/*
CREATE TABLE `article_images` (
	`id` int AUTO_INCREMENT NOT NULL,
	`image_path` varchar(100),
	`alt_text` varchar(100),
	`article_id` int NOT NULL,
	CONSTRAINT `article_images_id` PRIMARY KEY(`id`)
);
--> statement-breakpoint
CREATE TABLE `article_listing_relations` (
	`id` int NOT NULL,
	`article_id` int NOT NULL,
	`listing_id` int NOT NULL,
	CONSTRAINT `article_listing_relations_id` PRIMARY KEY(`id`),
	CONSTRAINT `article_listing_relations_UN` UNIQUE(`article_id`,`listing_id`)
);
--> statement-breakpoint
CREATE TABLE `article_planned_sales_relation` (
	`id` int AUTO_INCREMENT NOT NULL,
	`article_id` int NOT NULL,
	`planned_sale_id` int NOT NULL,
	CONSTRAINT `article_planned_sales_relation_id` PRIMARY KEY(`id`),
	CONSTRAINT `article_planned_sales_relation_UN` UNIQUE(`article_id`,`planned_sale_id`)
);
--> statement-breakpoint
CREATE TABLE `article_properties` (
	`id` int AUTO_INCREMENT NOT NULL,
	`size` enum('XS','S','M','L','XL'),
	`color` varchar(100),
	CONSTRAINT `article_properties_id` PRIMARY KEY(`id`)
);
--> statement-breakpoint
CREATE TABLE `articles` (
	`id` int NOT NULL,
	`name` varchar(200) NOT NULL,
	`brand_id` int,
	`category_id` int,
	`properties_id` int,
	`price` decimal(10,2) NOT NULL,
	`quantity_in_stock` int NOT NULL,
	CONSTRAINT `articles_id` PRIMARY KEY(`id`),
	CONSTRAINT `articles_UN` UNIQUE(`name`,`brand_id`)
);
--> statement-breakpoint
CREATE TABLE `brands` (
	`id` int AUTO_INCREMENT NOT NULL,
	`name` varchar(200) NOT NULL,
	`description` text NOT NULL,
	`image` varchar(400),
	CONSTRAINT `brands_id` PRIMARY KEY(`id`)
);
--> statement-breakpoint
CREATE TABLE `cart_items` (
	`id` int AUTO_INCREMENT NOT NULL,
	`cart_id` int NOT NULL,
	`article_id` int NOT NULL,
	`quantity` smallint,
	`added_at` timestamp NOT NULL,
	CONSTRAINT `cart_items_id` PRIMARY KEY(`id`)
);
--> statement-breakpoint
CREATE TABLE `carts` (
	`id` int AUTO_INCREMENT NOT NULL,
	`user_id` int,
	`guest_user_id` int,
	CONSTRAINT `carts_id` PRIMARY KEY(`id`),
	CONSTRAINT `carts_UN` UNIQUE(`user_id`)
);
--> statement-breakpoint
CREATE TABLE `categories` (
	`id` int AUTO_INCREMENT NOT NULL,
	`name` varchar(200) NOT NULL,
	`description` text NOT NULL,
	`image` varchar(400),
	CONSTRAINT `categories_id` PRIMARY KEY(`id`)
);
--> statement-breakpoint
CREATE TABLE `guest_users` (
	`id` int AUTO_INCREMENT NOT NULL,
	`created_at` timestamp NOT NULL,
	`logged_in_at` timestamp NOT NULL,
	CONSTRAINT `guest_users_id` PRIMARY KEY(`id`)
);
--> statement-breakpoint
CREATE TABLE `listings` (
	`id` int AUTO_INCREMENT NOT NULL,
	`title` varchar(200) NOT NULL,
	`description` text NOT NULL,
	`article_id_default` int,
	`image_path` varchar(400),
	CONSTRAINT `listings_id` PRIMARY KEY(`id`)
);
--> statement-breakpoint
CREATE TABLE `order_items` (
	`id` int AUTO_INCREMENT NOT NULL,
	`order_id` int NOT NULL,
	`quantity` smallint NOT NULL,
	`article_id` int,
	CONSTRAINT `order_items_id` PRIMARY KEY(`id`)
);
--> statement-breakpoint
CREATE TABLE `orders` (
	`id` int AUTO_INCREMENT NOT NULL,
	`ordered_at` timestamp NOT NULL,
	`cart_id` int,
	`notes` text,
	`adress` varchar(400) NOT NULL,
	`payment_method` varchar(400) NOT NULL,
	`estimated_delivery_at` timestamp,
	CONSTRAINT `orders_id` PRIMARY KEY(`id`)
);
--> statement-breakpoint
CREATE TABLE `planned_sales` (
	`id` int AUTO_INCREMENT NOT NULL,
	`start_time` datetime NOT NULL,
	`end_time` datetime NOT NULL,
	`name` varchar(200) NOT NULL,
	`announcement_title` text,
	CONSTRAINT `planned_sales_id` PRIMARY KEY(`id`)
);
--> statement-breakpoint
CREATE TABLE `users` (
	`id` int AUTO_INCREMENT NOT NULL,
	`first_name` varchar(200) NOT NULL,
	`last_name` varchar(200) NOT NULL,
	`phone_number` varchar(200) NOT NULL,
	`email` varchar(200) NOT NULL,
	`password` varchar(500) NOT NULL,
	`created_at` timestamp NOT NULL,
	`logged_in_at` timestamp NOT NULL,
	`is_admin` tinyint,
	CONSTRAINT `users_id` PRIMARY KEY(`id`),
	CONSTRAINT `users_UN` UNIQUE(`email`)
);
--> statement-breakpoint
ALTER TABLE `article_images` ADD CONSTRAINT `article_images_articles_FK` FOREIGN KEY (`article_id`) REFERENCES `articles`(`id`) ON DELETE cascade ON UPDATE cascade;--> statement-breakpoint
ALTER TABLE `article_listing_relations` ADD CONSTRAINT `article_listing_relations_articles_FK` FOREIGN KEY (`article_id`) REFERENCES `articles`(`id`) ON DELETE cascade ON UPDATE cascade;--> statement-breakpoint
ALTER TABLE `article_listing_relations` ADD CONSTRAINT `article_listing_relations_listings_FK` FOREIGN KEY (`listing_id`) REFERENCES `listings`(`id`) ON DELETE cascade ON UPDATE cascade;--> statement-breakpoint
ALTER TABLE `article_planned_sales_relation` ADD CONSTRAINT `article_planned_sales_relation_articles_FK` FOREIGN KEY (`planned_sale_id`) REFERENCES `articles`(`id`) ON DELETE cascade ON UPDATE cascade;--> statement-breakpoint
ALTER TABLE `article_planned_sales_relation` ADD CONSTRAINT `article_planned_sales_relation_planned_sales_FK` FOREIGN KEY (`planned_sale_id`) REFERENCES `planned_sales`(`id`) ON DELETE cascade ON UPDATE cascade;--> statement-breakpoint
ALTER TABLE `articles` ADD CONSTRAINT `articles_article_properties_FK` FOREIGN KEY (`properties_id`) REFERENCES `article_properties`(`id`) ON DELETE set null ON UPDATE cascade;--> statement-breakpoint
ALTER TABLE `articles` ADD CONSTRAINT `articles_brands_FK` FOREIGN KEY (`brand_id`) REFERENCES `brands`(`id`) ON DELETE set null ON UPDATE no action;--> statement-breakpoint
ALTER TABLE `articles` ADD CONSTRAINT `articles_categories_FK` FOREIGN KEY (`category_id`) REFERENCES `categories`(`id`) ON DELETE set null ON UPDATE cascade;--> statement-breakpoint
ALTER TABLE `cart_items` ADD CONSTRAINT `cart_items_articles_FK` FOREIGN KEY (`article_id`) REFERENCES `articles`(`id`) ON DELETE cascade ON UPDATE cascade;--> statement-breakpoint
ALTER TABLE `cart_items` ADD CONSTRAINT `cart_items_carts_FK` FOREIGN KEY (`cart_id`) REFERENCES `carts`(`id`) ON DELETE cascade ON UPDATE cascade;--> statement-breakpoint
ALTER TABLE `carts` ADD CONSTRAINT `carts_guest_users_FK` FOREIGN KEY (`guest_user_id`) REFERENCES `guest_users`(`id`) ON DELETE set null ON UPDATE cascade;--> statement-breakpoint
ALTER TABLE `carts` ADD CONSTRAINT `carts_users_FK` FOREIGN KEY (`user_id`) REFERENCES `users`(`id`) ON DELETE set null ON UPDATE cascade;--> statement-breakpoint
ALTER TABLE `listings` ADD CONSTRAINT `listings_articles_FK` FOREIGN KEY (`article_id_default`) REFERENCES `articles`(`id`) ON DELETE set null ON UPDATE cascade;--> statement-breakpoint
ALTER TABLE `order_items` ADD CONSTRAINT `order_items_articles_FK` FOREIGN KEY (`article_id`) REFERENCES `articles`(`id`) ON DELETE set null ON UPDATE cascade;--> statement-breakpoint
ALTER TABLE `order_items` ADD CONSTRAINT `order_items_orders_FK` FOREIGN KEY (`order_id`) REFERENCES `orders`(`id`) ON DELETE cascade ON UPDATE cascade;--> statement-breakpoint
ALTER TABLE `orders` ADD CONSTRAINT `orders_carts_FK` FOREIGN KEY (`cart_id`) REFERENCES `carts`(`id`) ON DELETE set null ON UPDATE cascade;
*/