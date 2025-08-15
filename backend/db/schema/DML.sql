INSERT INTO category (name) VALUES
('Limpiadores'),
('Tónicos'),
('Sérums'),
('Hidratantes'),
('Protector solar'),
('Exfoliantes'),
('Mascarillas faciales');

--- Crear usuario de admin
CREATE EXTENSION IF NOT EXISTS pgcrypto;

INSERT INTO users (email, name, last_name, address, phone_number, rol, password)
VALUES (
  'admin@skincare.com',
  'Admin',
  'Admin',
  'Oficina Central',
  '99999999',
  'admin',
  crypt('PasswordAdmin', gen_salt('bf', 12))
);

--- Crear productos 
INSERT INTO products (name, description, price, img_url, category_id) VALUES
('Limpiador micelar', 'Solución micelar que limpia y tonifica sin enjuague.', 13500, 'https://www.evolvebeauty.com/cdn/shop/files/Deep_Clean_Micellar_Water_190ml_PDP.jpg?v=1748441271', 1),
('Jabón facial hidratante', 'Limpieza suave con extractos de aloe vera.', 12500, 'https://imageskincare.com/cdn/shop/files/VITALC-hydratingcleanser-PDP-DS01.jpg?v=1691064640', 1),
('Gel limpiador detox', 'Elimina impurezas con carbón activado.', 15000, 'https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcR-pwkkfSvTC3GPK_yZGe1qazBGj9XLFqmqsQ&s', 1),

('Tónico antioxidante', 'Protege contra radicales libres y rejuvenece.', 15500, 'https://www.beautystore.cl/wp-content/uploads/2024/05/IMG_7950_1800x1800.webp', 2),
('Tónico refrescante de pepino', 'Refresca y revitaliza instantáneamente.', 13000, 'https://static.salcobrandonline.cl/spree/products/92268/large_webp/504086-s.webp?1683149806', 2),
('Sérum retinol', 'Favorece la renovación celular y mejora la textura.', 30000, 'https://shop-rebel.cl/cdn/shop/products/RecoveryBoost.jpg?v=1664307471', 3),
('Sérum colágeno', 'Aporta firmeza y elasticidad a la piel.', 28000, 'https://premiercosmetics.cl/wp-content/uploads/2023/12/blend-30-ml.jpg', 3),
('Sérum anti-manchas', 'Reduce la apariencia de manchas oscuras.', 29000, 'https://www.lasserre.cl/img/EnD3sVNb6SIi.webp', 3),
('Sérum revitalizante nocturno', 'Restaura la piel mientras duermes.', 31000, 'https://dbs.cl/media/catalog/product/e/s/essence-ee-33879.jpg?optimize=low&bg-color=255,255,255&fit=bounds&height=&width=', 3),
('Crema nutritiva intensa', 'Fórmula rica para piel seca.', 23000, 'https://www.evolvebeauty.com/cdn/shop/files/Daily_Renew_Facial_Cream_60ml_PDP.jpg?v=1748441429', 4),
('Loción hidratante diaria', 'Ligera y de rápida absorción.', 20000, 'https://www.doctorrogers.com/cdn/shop/files/NEW_FC-2.jpg?v=1741971789&width=1946', 4),
('Crema con ceramidas', 'Repara la barrera cutánea y retiene la hidratación.', 24000, 'https://www.fresh.com/on/demandware.static/-/Sites-fresh_master_catalog/default/dw3664ccba/product_images/H00006118_plp.jpg', 4),
('Protector solar con color', 'Unifica el tono y protege.', 21000, 'https://www.drsheths.com/cdn/shop/files/1_Website_b94bf3ba-3f6e-488f-aba9-4c0491de6fc2.jpg?v=1747650041', 5),
('Protector solar en spray SPF 50', 'Fácil aplicación y rápida absorción.', 22000, 'https://www.britishcosmetics.com/cdn/shop/files/WhatsApp-Image-2024-10-14-at-08.34.37.jpg?v=1741499240', 5),
('Exfoliante con café', 'Estimula la circulación y suaviza.', 16000, 'https://majen.cl/cdn/shop/products/exfoliante-energizante.jpg?v=1675639239', 6),
('Exfoliante de azúcar', 'Deja la piel lisa y luminosa.', 15000, 'https://thebodyshop.cl/wp-content/uploads/2020/07/22594_1.jpg-scaled.jpg', 6),

('Mascarilla de miel', 'Hidrata y calma la piel irritada.', 18000, 'https://www.sephora.com/productimages/sku/s2614394-main-zoom.jpg?imwidth=315', 7),
('Mascarilla de colágeno', 'Firmeza y elasticidad al instante.', 22000, 'https://www.calyxta.com/wp-content/uploads/2018/08/Laneige-Water-Sleeping-Mask-70ml.jpg', 7),
('Mascarilla de aloe vera', 'Refrescante y calmante.', 17000, 'https://kmartau.mo.cloudinary.net/e5bbec10-136f-4188-8c7e-37bca9d672ff.jpg?tx=w_3840,h_3840', 7);


--- Crear inventario
INSERT INTO inventory (product_id, stock)
VALUES
(1, 45),
(2, 30),
(3, 20),
(4, 50),
(5, 25),
(6, 60),
(7, 35),
(8, 40),
(9, 22),
(10, 55),
(11, 33),
(12, 48),
(13, 28),
(14, 38),
(15, 26),
(16, 31),
(17, 29),
(18, 34);

