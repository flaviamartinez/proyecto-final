CREATE DATABASE skincare;

\c skincare;

CREATE TABLE users (
	id 				SERIAL PRIMARY KEY,
	email 			TEXT NOT NULL UNIQUE,
	name 			VARCHAR(100) NOT NULL,
	last_name 		VARCHAR(100) NOT NULL,
	address 		TEXT NOT NULL,
	phone_number 	VARCHAR(20) NOT NULL,
	rol 			VARCHAR(10) NOT NULL CHECK (rol IN ('admin', 'user')),
	password 		TEXT NOT NULL,
	img_url 		TEXT
);

CREATE TABLE category (
	id 		SERIAL PRIMARY KEY,
	name 	VARCHAR(30) NOT NULL
);

CREATE TABLE products (
	id 			SERIAL PRIMARY KEY,
	name 		VARCHAR(200) NOT NULL,
	description TEXT NOT NULL,
	price 		INTEGER NOT NULL,
	img_url 	TEXT NOT NULL,
	category_id INTEGER NOT NULL,
	FOREIGN KEY (category_id) REFERENCES category(id)
);


CREATE TABLE inventory (
  product_id    INTEGER PRIMARY KEY REFERENCES products(id) ON DELETE CASCADE,
  stock         INTEGER NOT NULL DEFAULT 0 CHECK (stock >= 0),
  last_update   TIMESTAMPTZ NOT NULL DEFAULT now()
);

CREATE TABLE orders (
  id             SERIAL PRIMARY KEY,
  user_id        INTEGER NOT NULL,
  total          INTEGER NOT NULL CHECK (total >= 0),
  creation_date  TIMESTAMPTZ NOT NULL DEFAULT now(),
  FOREIGN KEY (user_id) REFERENCES users(id) ON DELETE CASCADE
);

CREATE TABLE order_items (
  id         SERIAL PRIMARY KEY,
  order_id   INTEGER NOT NULL,
  product_id INTEGER NOT NULL,
  quantity   INTEGER NOT NULL CHECK (quantity > 0),
  FOREIGN KEY (order_id) REFERENCES orders(id) ON DELETE CASCADE,
  FOREIGN KEY (product_id) REFERENCES products(id)
);