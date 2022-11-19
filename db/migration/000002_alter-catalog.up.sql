alter table products drop column catalog_id;
alter table products
add column created_by uuid;
alter table products
add constraint fk_created_by foreign key (created_by) REFERENCES users(user_id);
drop table catalogs;