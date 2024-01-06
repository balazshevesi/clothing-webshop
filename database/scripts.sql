-- @block
DROP PROCEDURE e_commerce.sign_up 

-- @block
CALL create_user('Balazs','Hevesi','073','balazshevesiii@gmail.com','123');

-- @block
CALL get_user_id_from_email('balazshevesiii@gmail.com')

-- @block
CALL get_user_info('balazshevesi@gmail.com')

-- @block
DELETE FROM users WHERE email = 'balazshevesi@gmail.com'

-- @block
CALL create_guest()

-- @block
DELETE FROM users;
DELETE FROM guest_users;
DELETE FROM carts;

-- @block
CALL login_stamp_guest_user('8')

-- @block
UPDATE users SET is_admin = true WHERE email = 'balazshevesi@gmail.com'

-- @block
INSERT INTO guest_users (created_at, logged_in_at) VALUES (NOW(), NOW());
SELECT LAST_INSERT_ID();


-- @block
SET time_zone = '+01:00'; -- For UTC