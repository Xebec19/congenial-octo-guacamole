CREATE EXTENSION IF NOT EXISTS "uuid-ossp";
CREATE TYPE user_type AS ENUM('buyer', 'seller');
CREATE TYPE row_status AS ENUM('active', 'inactive');
CREATE TYPE order_status AS ENUM('pending', 'cancelled', 'inprogress', 'served');
-- users table holds records of logged in users whether they are buyer or seller
CREATE TABLE USERS (
    USER_ID uuid default uuid_generate_v4() primary key,
    username varchar(100) unique not null,
    password varchar(100) not null,
    type user_type,
    created_at timestamp default CURRENT_TIMESTAMP,
    updated_at timestamp default CURRENT_TIMESTAMP,
    STATUS row_status
);
-- catalog is an index for catalog item created by sellers. It has WITH ONE TO ONE RELATION
CREATE TABLE CATALOGS (
    CATALOG_ID uuid default uuid_generate_v4() PRIMARY KEY,
    CATALOG_NAME VARCHAR(100) UNIQUE NOT NULL,
    CREATED_BY UUID REFERENCES USERS(USER_ID) ON DELETE CASCADE UNIQUE,
    CREATED_AT TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
    UPDATED_AT TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
    STATUS row_status
);
-- PRODUCT holds items in catalogs. It has MANY TO ONE relation to CATALOGS
CREATE TABLE PRODUCTS (
    PRODUCT_ID uuid default uuid_generate_v4() PRIMARY KEY,
    PRODUCT_NAME VARCHAR(200) NOT NULL,
    PRODUCT_PRICE NUMERIC DEFAULT 0,
    CATALOG_ID UUID REFERENCES CATALOGS(CATALOG_ID) ON DELETE CASCADE
);
-- ORDER gives overview of orders for a seller
CREATE TABLE ORDERS (
    ORDER_ID uuid default uuid_generate_v4() PRIMARY KEY,
    ORDER_BY UUID REFERENCES USERS(USER_ID) ON DELETE NO ACTION,
    ORDER_FOR UUID REFERENCES USERS(USER_ID) ON DELETE NO ACTION,
    CREATED_ON TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
    STATUS order_status
);
-- ORDER ITEMS lists PRODUCTS in the ORDER
CREATE TABLE ORDER_ITEMS (
    ORDER_ID UUID REFERENCES ORDERS(ORDER_ID) ON DELETE NO ACTION,
    PRODUCT_ID UUID REFERENCES PRODUCTS(PRODUCT_ID) ON DELETE NO ACTION,
    QUANTITY NUMERIC DEFAULT 1,
    IN_STOCK row_status,
    PRIMARY KEY(ORDER_ID, PRODUCT_ID)
)