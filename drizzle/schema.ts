import { mysqlTable, mysqlSchema, AnyMySqlColumn, foreignKey, primaryKey, int, text, varchar, unique, mysqlEnum, decimal, smallint, timestamp, datetime, tinyint } from "drizzle-orm/mysql-core"
import { sql } from "drizzle-orm"


export const articleImages = mysqlTable("article_images", {
	id: int("id").autoincrement().notNull(),
	imagePath: text("image_path"),
	altText: varchar("alt_text", { length: 100 }),
	articleId: int("article_id").notNull().references(() => articles.id, { onDelete: "cascade", onUpdate: "cascade" } ),
},
(table) => {
	return {
		articleImagesId: primaryKey({ columns: [table.id], name: "article_images_id"}),
	}
});

export const articleListingRelations = mysqlTable("article_listing_relations", {
	id: int("id").notNull(),
	articleId: int("article_id").notNull().references(() => articles.id, { onDelete: "cascade", onUpdate: "cascade" } ),
	listingId: int("listing_id").notNull().references(() => listings.id, { onDelete: "cascade", onUpdate: "cascade" } ),
},
(table) => {
	return {
		articleListingRelationsId: primaryKey({ columns: [table.id], name: "article_listing_relations_id"}),
		articleListingRelationsUn: unique("article_listing_relations_UN").on(table.articleId, table.listingId),
	}
});

export const articlePlannedSalesRelation = mysqlTable("article_planned_sales_relation", {
	id: int("id").autoincrement().notNull(),
	articleId: int("article_id").notNull().references(() => articles.id, { onDelete: "cascade", onUpdate: "cascade" } ),
	plannedSaleId: int("planned_sale_id").notNull().references(() => plannedSales.id, { onDelete: "cascade", onUpdate: "cascade" } ),
},
(table) => {
	return {
		articlePlannedSalesRelationId: primaryKey({ columns: [table.id], name: "article_planned_sales_relation_id"}),
		articlePlannedSalesRelationUn: unique("article_planned_sales_relation_UN").on(table.articleId, table.plannedSaleId),
	}
});

export const articleProperties = mysqlTable("article_properties", {
	id: int("id").autoincrement().notNull(),
	size: mysqlEnum("size", ['XS','S','M','L','XL']),
	color: varchar("color", { length: 100 }),
	articleId: int("article_id").references(() => articles.id, { onDelete: "cascade", onUpdate: "cascade" } ),
},
(table) => {
	return {
		articlePropertiesId: primaryKey({ columns: [table.id], name: "article_properties_id"}),
	}
});

export const articles = mysqlTable("articles", {
	id: int("id").autoincrement().notNull(),
	name: varchar("name", { length: 200 }).notNull(),
	brandId: int("brand_id").references(() => brands.id, { onDelete: "set null" } ),
	categoryId: int("category_id").references(() => categories.id, { onDelete: "set null", onUpdate: "cascade" } ),
	price: decimal("price", { precision: 10, scale: 2 }).notNull(),
	quantityInStock: int("quantity_in_stock").notNull(),
	description: text("description"),
	garmentCare: text("garment_care"),
},
(table) => {
	return {
		articlesId: primaryKey({ columns: [table.id], name: "articles_id"}),
		articlesUn: unique("articles_UN").on(table.name, table.brandId),
	}
});

export const brands = mysqlTable("brands", {
	id: int("id").autoincrement().notNull(),
	name: varchar("name", { length: 200 }).notNull(),
	description: text("description").notNull(),
	image: text("image"),
},
(table) => {
	return {
		brandsId: primaryKey({ columns: [table.id], name: "brands_id"}),
		brandsUn: unique("brands_UN").on(table.name),
	}
});

export const cartItems = mysqlTable("cart_items", {
	id: int("id").autoincrement().notNull(),
	cartId: int("cart_id").notNull().references(() => carts.id, { onDelete: "cascade", onUpdate: "cascade" } ),
	articleId: int("article_id").notNull().references(() => articles.id, { onDelete: "cascade", onUpdate: "cascade" } ),
	quantity: smallint("quantity"),
	addedAt: timestamp("added_at", { mode: 'string' }).notNull(),
},
(table) => {
	return {
		cartItemsId: primaryKey({ columns: [table.id], name: "cart_items_id"}),
	}
});

export const carts = mysqlTable("carts", {
	id: int("id").autoincrement().notNull(),
	userId: int("user_id").references(() => users.id, { onDelete: "set null", onUpdate: "cascade" } ),
	guestUserId: int("guest_user_id").references(() => guestUsers.id, { onDelete: "set null", onUpdate: "cascade" } ),
},
(table) => {
	return {
		cartsId: primaryKey({ columns: [table.id], name: "carts_id"}),
		cartsUn: unique("carts_UN").on(table.userId),
	}
});

export const categories = mysqlTable("categories", {
	id: int("id").autoincrement().notNull(),
	name: varchar("name", { length: 200 }).notNull(),
	description: text("description").notNull(),
	image: varchar("image", { length: 400 }),
},
(table) => {
	return {
		categoriesId: primaryKey({ columns: [table.id], name: "categories_id"}),
		categoriesUn: unique("categories_UN").on(table.name),
	}
});

export const guestUsers = mysqlTable("guest_users", {
	id: int("id").autoincrement().notNull(),
	createdAt: timestamp("created_at", { mode: 'string' }).notNull(),
	loggedInAt: timestamp("logged_in_at", { mode: 'string' }).notNull(),
},
(table) => {
	return {
		guestUsersId: primaryKey({ columns: [table.id], name: "guest_users_id"}),
	}
});

export const listings = mysqlTable("listings", {
	id: int("id").autoincrement().notNull(),
	title: varchar("title", { length: 200 }).notNull(),
	description: text("description").notNull(),
	articleIdDefault: int("article_id_default").references(() => articles.id, { onDelete: "set null", onUpdate: "cascade" } ),
	imagePath: varchar("image_path", { length: 400 }),
},
(table) => {
	return {
		listingsId: primaryKey({ columns: [table.id], name: "listings_id"}),
	}
});

export const orderItems = mysqlTable("order_items", {
	id: int("id").autoincrement().notNull(),
	orderId: int("order_id").notNull().references(() => orders.id, { onDelete: "cascade", onUpdate: "cascade" } ),
	quantity: smallint("quantity").notNull(),
	articleId: int("article_id").references(() => articles.id, { onDelete: "set null", onUpdate: "cascade" } ),
},
(table) => {
	return {
		orderItemsId: primaryKey({ columns: [table.id], name: "order_items_id"}),
	}
});

export const orders = mysqlTable("orders", {
	id: int("id").autoincrement().notNull(),
	orderedAt: timestamp("ordered_at", { mode: 'string' }).notNull(),
	cartId: int("cart_id").references(() => carts.id, { onDelete: "set null", onUpdate: "cascade" } ),
	notes: text("notes"),
	adress: varchar("adress", { length: 400 }).notNull(),
	paymentMethod: varchar("payment_method", { length: 400 }).notNull(),
	estimatedDeliveryAt: timestamp("estimated_delivery_at", { mode: 'string' }),
},
(table) => {
	return {
		ordersId: primaryKey({ columns: [table.id], name: "orders_id"}),
	}
});

export const plannedSales = mysqlTable("planned_sales", {
	id: int("id").autoincrement().notNull(),
	startTime: datetime("start_time", { mode: 'string'}).notNull(),
	endTime: datetime("end_time", { mode: 'string'}).notNull(),
	name: varchar("name", { length: 200 }).notNull(),
	announcementTitle: text("announcement_title"),
},
(table) => {
	return {
		plannedSalesId: primaryKey({ columns: [table.id], name: "planned_sales_id"}),
	}
});

export const users = mysqlTable("users", {
	id: int("id").autoincrement().notNull(),
	firstName: varchar("first_name", { length: 200 }).notNull(),
	lastName: varchar("last_name", { length: 200 }).notNull(),
	phoneNumber: varchar("phone_number", { length: 200 }).notNull(),
	email: varchar("email", { length: 200 }).notNull(),
	password: varchar("password", { length: 500 }).notNull(),
	createdAt: timestamp("created_at", { mode: 'string' }).notNull(),
	loggedInAt: timestamp("logged_in_at", { mode: 'string' }).notNull(),
	isAdmin: tinyint("is_admin"),
},
(table) => {
	return {
		usersId: primaryKey({ columns: [table.id], name: "users_id"}),
		usersUn: unique("users_UN").on(table.email),
	}
});