alter table products drop constraint fk_created_by;
alter table products drop column created_by;
alter table products
add column catalog_id uuid;
-- catalog is an index for catalog item created by sellers. It has WITH ONE TO ONE RELATION
CREATE TABLE CATALOGS (
    CATALOG_ID uuid default uuid_generate_v4() PRIMARY KEY,
    CATALOG_NAME VARCHAR(100) UNIQUE NOT NULL,
    CREATED_BY UUID REFERENCES USERS(USER_ID) ON DELETE CASCADE UNIQUE,
    CREATED_AT TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
    UPDATED_AT TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
    STATUS row_status
);
alter table products
add constraint fk_catalog_id foreign key (catalog_id) REFERENCES catalogs(catalog_id);