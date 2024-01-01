--* reset db
DROP TABLE IF EXISTS cart_items;
DROP TABLE IF EXISTS carts;
DROP TABLE IF EXISTS product_variant_images;
DROP TABLE IF EXISTS product_variants;
DROP TABLE IF EXISTS guest_users;
DROP TABLE IF EXISTS users;
DROP TABLE IF EXISTS products;

--* create design for storing produts
CREATE TABLE products (
    id INT PRIMARY KEY AUTO_INCREMENT,
    added_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP,

    title VARCHAR(200) NOT NULL,
    image_path VARCHAR(400) NOT NULL,
    description TEXT NOT NULL,
    category VARCHAR(50)
);

CREATE TABLE product_variants (
    id INT PRIMARY KEY AUTO_INCREMENT,

    description TEXT NOT NULL,
    color VARCHAR(50),
    size VARCHAR(50),
    price DECIMAL(10, 2),
    stock INT NOT NULL,

    product_id INT,
    FOREIGN KEY (product_id) REFERENCES products(id)
);

CREATE TABLE product_variant_images (
    id INT PRIMARY KEY AUTO_INCREMENT,

    variant_image_path VARCHAR(300) NOT NULL,

    variant_id INT,
    FOREIGN KEY (variant_id) REFERENCES product_variants(id)
);

--* create design for storing users
CREATE TABLE users (
    id INT PRIMARY KEY AUTO_INCREMENT,
    created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP,

    first_name VARCHAR(100) NOT NULL,
    last_name VARCHAR(100) NOT NULL,
    password VARCHAR(100) NOT NULL,
    email VARCHAR(150) NOT NULL UNIQUE,
    phone_number VARCHAR(20),
);

CREATE TABLE guest_users(
    id INT PRIMARY KEY AUTO_INCREMENT,

    created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP
);

--* create design for storing carts
CREATE TABLE carts (
    id INT PRIMARY KEY AUTO_INCREMENT,
    created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP,

    guest_user_id INT,
    FOREIGN KEY (guest_user_id) REFERENCES guest_users(id),

    user_id INT,
    FOREIGN KEY (user_id) REFERENCES users(id)

    -- checks to make sure that the cart either has a guest_user or a user
    CHECK ((user_id IS NOT NULL AND guest_user_id IS NULL) OR (user_id IS NULL AND guest_user_id IS NOT NULL))
);

-- pretty much works as an intermediate between cart and product variant, for a many-to-many relationship
CREATE TABLE cart_items (
    id INT PRIMARY KEY AUTO_INCREMENT,
    added_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP,

    quantity INT NOT NULL,

    cart_id INT,
    FOREIGN KEY (cart_id) REFERENCES carts(id),

    product_variant_id INT,
    FOREIGN KEY (product_variant_id) REFERENCES product_variants(id)
);
