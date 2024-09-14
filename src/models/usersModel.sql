create table products(
    id serial primary key,
    productName varchar(150),
    productPrice int,
    productDesc text
);

create table users(
    id serial primary key,
    fullName text,
    email text,
    password text,
    userName text,
    phoneNumber text
);