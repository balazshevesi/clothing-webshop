DROP TABLE IF EXISTS cart_items;
DROP TABLE IF EXISTS carts;
DROP TABLE IF EXISTS guest_users;
DROP TABLE IF EXISTS users;
DROP TABLE IF EXISTS products;

CREATE TABLE products (
    id INT PRIMARY KEY AUTO_INCREMENT,
    added_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP,

    title VARCHAR(200) NOT NULL,
    price NUMERIC(10,2) NOT NULL,
    image_path VARCHAR(400) NOT NULL,
    description TEXT NOT NULL,
    category VARCHAR(50)
);

CREATE TABLE users (
    id INT PRIMARY KEY AUTO_INCREMENT,
    created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
    first_name VARCHAR(100) NOT NULL,
    last_name VARCHAR(100) NOT NULL,
    password VARCHAR(100) NOT NULL,
    email VARCHAR(150) NOT NULL UNIQUE,
    phone_number VARCHAR(20)
);

CREATE TABLE guest_users(
    id INT PRIMARY KEY AUTO_INCREMENT,
    created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP
);

CREATE TABLE carts (
    id INT PRIMARY KEY AUTO_INCREMENT,
    created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP,

    guest_user_id INT,
    FOREIGN KEY (guest_user_id) REFERENCES guest_users(id),
    user_id INT,
    FOREIGN KEY (user_id) REFERENCES users(id),
    
    CHECK ((user_id IS NOT NULL AND guest_user_id IS NULL) OR (user_id IS NULL AND guest_user_id IS NOT NULL))
);

CREATE TABLE cart_items (
    id INT PRIMARY KEY AUTO_INCREMENT,
    added_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP,

    quantity INT NOT NULL,
    
    cart_id INT,
    FOREIGN KEY (cart_id) REFERENCES carts(id),
    products_id INT,
    FOREIGN KEY (products_id) REFERENCES products(id)
);
