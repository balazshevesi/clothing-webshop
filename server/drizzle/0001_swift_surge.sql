ALTER TABLE `article_images` DROP FOREIGN KEY `article_images_articles_FK`;
--> statement-breakpoint
ALTER TABLE `article_listing_relations` DROP FOREIGN KEY `article_listing_relations_articles_FK`;
--> statement-breakpoint
ALTER TABLE `article_listing_relations` DROP FOREIGN KEY `article_listing_relations_listings_FK`;
--> statement-breakpoint
ALTER TABLE `article_planned_sales_relations` DROP FOREIGN KEY `article_planned_sales_relation_articles_FK`;
--> statement-breakpoint
ALTER TABLE `article_planned_sales_relations` DROP FOREIGN KEY `article_planned_sales_relation_planned_sales_FK`;
--> statement-breakpoint
ALTER TABLE `article_properties` DROP FOREIGN KEY `article_properties_articles_FK`;
--> statement-breakpoint
ALTER TABLE `articles` DROP FOREIGN KEY `articles_brands_FK`;
--> statement-breakpoint
ALTER TABLE `articles` DROP FOREIGN KEY `articles_categories_FK`;
--> statement-breakpoint
ALTER TABLE `cart_items` DROP FOREIGN KEY `cart_items_articles_FK`;
--> statement-breakpoint
ALTER TABLE `cart_items` DROP FOREIGN KEY `cart_items_carts_FK`;
--> statement-breakpoint
ALTER TABLE `carts` DROP FOREIGN KEY `carts_guest_users_FK`;
--> statement-breakpoint
ALTER TABLE `carts` DROP FOREIGN KEY `carts_users_FK`;
--> statement-breakpoint
ALTER TABLE `listings` DROP FOREIGN KEY `listings_articles_FK`;
--> statement-breakpoint
ALTER TABLE `order_items` DROP FOREIGN KEY `order_items_articles_FK`;
--> statement-breakpoint
ALTER TABLE `order_items` DROP FOREIGN KEY `order_items_orders_FK`;
--> statement-breakpoint
ALTER TABLE `orders` DROP FOREIGN KEY `orders_carts_FK`;
--> statement-breakpoint
ALTER TABLE `article_images` ADD CONSTRAINT `article_images_article_id_articles_id_fk` FOREIGN KEY (`article_id`) REFERENCES `articles`(`id`) ON DELETE cascade ON UPDATE cascade;--> statement-breakpoint
ALTER TABLE `article_listing_relations` ADD CONSTRAINT `article_listing_relations_article_id_articles_id_fk` FOREIGN KEY (`article_id`) REFERENCES `articles`(`id`) ON DELETE cascade ON UPDATE cascade;--> statement-breakpoint
ALTER TABLE `article_listing_relations` ADD CONSTRAINT `article_listing_relations_listing_id_listings_id_fk` FOREIGN KEY (`listing_id`) REFERENCES `listings`(`id`) ON DELETE cascade ON UPDATE cascade;--> statement-breakpoint
ALTER TABLE `article_planned_sales_relations` ADD CONSTRAINT `article_planned_sales_relations_article_id_articles_id_fk` FOREIGN KEY (`article_id`) REFERENCES `articles`(`id`) ON DELETE cascade ON UPDATE cascade;--> statement-breakpoint
ALTER TABLE `article_planned_sales_relations` ADD CONSTRAINT `article_planned_sales_relations_planned_sale_id_planned_sales_id_fk` FOREIGN KEY (`planned_sale_id`) REFERENCES `planned_sales`(`id`) ON DELETE cascade ON UPDATE cascade;--> statement-breakpoint
ALTER TABLE `article_properties` ADD CONSTRAINT `article_properties_article_id_articles_id_fk` FOREIGN KEY (`article_id`) REFERENCES `articles`(`id`) ON DELETE cascade ON UPDATE cascade;--> statement-breakpoint
ALTER TABLE `articles` ADD CONSTRAINT `articles_brand_id_brands_id_fk` FOREIGN KEY (`brand_id`) REFERENCES `brands`(`id`) ON DELETE set null ON UPDATE no action;--> statement-breakpoint
ALTER TABLE `articles` ADD CONSTRAINT `articles_category_id_categories_id_fk` FOREIGN KEY (`category_id`) REFERENCES `categories`(`id`) ON DELETE set null ON UPDATE cascade;--> statement-breakpoint
ALTER TABLE `cart_items` ADD CONSTRAINT `cart_items_cart_id_carts_id_fk` FOREIGN KEY (`cart_id`) REFERENCES `carts`(`id`) ON DELETE cascade ON UPDATE cascade;--> statement-breakpoint
ALTER TABLE `cart_items` ADD CONSTRAINT `cart_items_article_id_articles_id_fk` FOREIGN KEY (`article_id`) REFERENCES `articles`(`id`) ON DELETE cascade ON UPDATE cascade;--> statement-breakpoint
ALTER TABLE `carts` ADD CONSTRAINT `carts_user_id_users_id_fk` FOREIGN KEY (`user_id`) REFERENCES `users`(`id`) ON DELETE set null ON UPDATE cascade;--> statement-breakpoint
ALTER TABLE `carts` ADD CONSTRAINT `carts_guest_user_id_guest_users_id_fk` FOREIGN KEY (`guest_user_id`) REFERENCES `guest_users`(`id`) ON DELETE set null ON UPDATE cascade;--> statement-breakpoint
ALTER TABLE `listings` ADD CONSTRAINT `listings_article_id_default_articles_id_fk` FOREIGN KEY (`article_id_default`) REFERENCES `articles`(`id`) ON DELETE set null ON UPDATE cascade;--> statement-breakpoint
ALTER TABLE `order_items` ADD CONSTRAINT `order_items_order_id_orders_id_fk` FOREIGN KEY (`order_id`) REFERENCES `orders`(`id`) ON DELETE cascade ON UPDATE cascade;--> statement-breakpoint
ALTER TABLE `order_items` ADD CONSTRAINT `order_items_article_id_articles_id_fk` FOREIGN KEY (`article_id`) REFERENCES `articles`(`id`) ON DELETE set null ON UPDATE cascade;--> statement-breakpoint
ALTER TABLE `orders` ADD CONSTRAINT `orders_cart_id_carts_id_fk` FOREIGN KEY (`cart_id`) REFERENCES `carts`(`id`) ON DELETE set null ON UPDATE cascade;