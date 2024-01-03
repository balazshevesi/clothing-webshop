-- Inserting sample data into the products table
INSERT INTO products (title, price, image_path, description, category) VALUES
('T-Shirt', 19.99, '/images/tshirt.jpg', 'Comfortable cotton t-shirt', 'Apparel'),
('Running Shoes', 59.99, '/images/shoes.jpg', 'High-quality running shoes', 'Footwear'),
('Coffee Mug', 12.99, '/images/mug.jpg', 'Ceramic coffee mug', 'Home'),
('Backpack', 49.99, '/images/backpack.jpg', 'Durable backpack for travel', 'Accessories'),
('Sunglasses', 15.99, '/images/sunglasses.jpg', 'Stylish sunglasses', 'Accessories'),
('Water Bottle', 8.99, '/images/waterbottle.jpg', 'Insulated water bottle', 'Home'),
('Yoga Mat', 20.99, '/images/yogamat.jpg', 'Eco-friendly yoga mat', 'Fitness'),
('Bluetooth Speaker', 30.99, '/images/speaker.jpg', 'Portable Bluetooth speaker', 'Electronics'),
('Smartwatch', 199.99, '/images/smartwatch.jpg', 'Latest smartwatch model', 'Electronics'),
('Desk Lamp', 35.99, '/images/desklamp.jpg', 'LED desk lamp', 'Home'),
('Wireless Headphones', 89.99, '/images/headphones.jpg', 'Noise-cancelling headphones', 'Electronics'),
('Novel "The Great Adventure"', 14.99, '/images/novel.jpg', 'Bestselling adventure novel', 'Books'),
('Running Shorts', 25.99, '/images/shorts.jpg', 'Lightweight running shorts', 'Apparel'),
('Hoodie', 29.99, '/images/hoodie.jpg', 'Comfortable hoodie', 'Apparel'),
('Sports Watch', 49.99, '/images/sportswatch.jpg', 'Water-resistant sports watch', 'Electronics'),
('Gym Bag', 39.99, '/images/gymbag.jpg', 'Spacious gym bag', 'Accessories'),
('Sneakers', 79.99, '/images/sneakers.jpg', 'Stylish sneakers', 'Footwear'),
('Travel Pillow', 19.99, '/images/travelpillow.jpg', 'Comfortable travel pillow', 'Travel'),
('Hand Sanitizer', 4.99, '/images/handsanitizer.jpg', 'Kills 99.9% of germs', 'Health'),
('Face Mask', 9.99, '/images/facemask.jpg', 'Reusable face mask', 'Health');

-- Inserting sample data into the users table
INSERT INTO users (first_name, last_name, password, email, phone_number) VALUES
('John', 'Doe', 'johnpassword', 'john.doe@example.com', '555-1234'),
('Jane', 'Smith', 'janepassword', 'jane.smith@example.com', '555-5678');

-- Inserting sample data into the guest_users table
INSERT INTO guest_users (id) VALUES
(1);

-- Inserting sample data into the carts table
-- Cart for a registered user (John Doe)
INSERT INTO carts (user_id) VALUES
((SELECT id FROM users WHERE email = 'john.doe@example.com'));

-- Cart for a guest user
INSERT INTO carts (guest_user_id) VALUES
((SELECT id FROM guest_users WHERE id = 1));

-- Inserting sample data into the cart_items table
-- Assuming product IDs 1 and 2 exist
INSERT INTO cart_items (quantity, cart_id, products_id) VALUES
(2, 1, 1), -- 2 T-Shirts in John's cart
(1, 2, 3); -- 1 Coffee Mug in guest's cart
