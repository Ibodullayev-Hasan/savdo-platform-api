create table products(
    id serial primary key,
    productName varchar(150),
    productImg text,
    productMade varchar(200),
    availableForSale int
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


create table users_img(
    id serial primary key,
    userid int references users(id),
    imglink text
);
