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

