DROP DATABASE IF EXISTS bamazon_DB;

CREATE DATABASE bamazon_DB;

USE bamazon_DB;

CREATE TABLE products(
id INT NOT NULL AUTO_INCREMENT,
product VARCHAR(100) NOT NULL,
department VARCHAR(100) NOT NULL,
price DECIMAL(10,2) NULL,
quantity INT NULL,
PRIMARY KEY (id)
);


INSERT INTO products (product, department, price, quantity)
VALUES ("Poland Spring 24pk", "Drinks", 3, 50),
("Macbook Air", "Electronics", 1000, 15),
("Bulleit Rye Whiskey", "Alcohol", 50, 20),
("50in Vizio TV", "Electronics", 350, 10),
("George Foreman Grill", "Kitchen", 30, 30),
("Iphone X", "Electronicss", 1000, 20),
("Casamigos Tequila", "Alcohol", 40, 30),
("Apple Watch 4", "Electronics", 400, 40),
("Nike Air Vapormax", "Clothing", 190, 10),
("Apple Air Pods", "Electronics", 200, 25);


