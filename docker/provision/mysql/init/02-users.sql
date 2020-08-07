CREATE USER 'nestjs_demo'@'%' IDENTIFIED WITH mysql_native_password BY '123456';

GRANT ALL PRIVILEGES ON nestjs_demo.* TO 'nestjs_demo'@'%';

-- GRANT ALL PRIVILEGES ON nestjs_demo_e2e_test.* TO 'nestjs_demo'@'%';

FLUSH PRIVILEGES;
