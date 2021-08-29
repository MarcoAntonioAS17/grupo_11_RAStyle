insert into rastyle.categoriausuario
(id,Nombre) 
values
(1,'Admin'),
(2,'User'); 

INSERT INTO rastyle.categoria
(id,Nombre)
VALUES
(1,"Hombre"),
(2,"Mujer"),
(3,"Unisex"); 

INSERT INTO rastyle.colecciones 
(id,Nombre) 
Values 
(1,'Otoño'),
(2,'Verano'),
(3,'Invierno'),
(4,'Primavera'); 

INSERT INTO rastyle.subcategoria 
(id,Nombre) 
VALUES 
(1,'Tops'),
(2,'Sudaderas'),
(3,'Jeans'),
(4,'Zapatos'),
(5,'Vestidos'); 

INSERT INTO rastyle.tallas 
(id,Nombre) 
VALUES
(1,'XXL'),
(2,'XL'),
(3,'L'),
(4,'M'),
(5,'S'),
(6,'XS'); 

INSERT INTO rastyle.colores 
(id,Nombre) 
VALUES 
(1,'white'),
(2,'red'),
(3,'blue'),
(4,'black'),
(5,'pink'),
(6,'green'),
(7,'yellow'),
(8,'orange'),
(9,'brown'); 

INSERT INTO rastyle.productos 
(id, Nombre, Cantidad, precio, enOferta, precioOferta, hotSale, id_Colecciones, id_Categoria, id_Subcategoria, Descripcion) 
VALUES
('000001', "Vestido slip ajustado de viscosa", 10, 286, 0, 250, 0, 2, 2, 5, 
"Vestido elegante color negro con estampado liso y sin mangas. Corte ajustado con escote americano y cintura natural. Composición:	55% Viscosa, 40% Nylon, 5% Spandex."),
('000002', "Pantalón De Mezclilla Slim De Hombre", 7, 399, 1, 298, 1, 2, 1, 3, 
"Pantalón de mezclilla slim color azul medio de hombre con efecto lavado, es un 5 bolsillos con cierre cubierto por tapeta y botón metalizado. Tela con stretch, para dar mayor comodidad y proceso biowash, el cual es más amigable con el medio ambiente."),
('000003', "Vestido estilo camiseta de rayas de colores", 8, 153, 0, 130, 0, 4, 2, 5, 
"Vestido estilo camiseta a rayas, casual multicolor, estampado a rayas con ajuste rectangular y cuello redondo. Manga corta tipo murciélago. Composición:  95% Poliéster, 5% Spandex."),
('000004', "Playera Manga Corta Estampada De Hombre", 15, 99, 0, 90, 0, 4, 1, 1, 
"Playera manga corta color gris obscuro de hombre cuello redondo fit slim con estampado localizado al frente. Composición: ALGODÓN BCI 100%"),
('000005', "Sudadera corta con estampado de tie dye y letra", 9, 273, 1, 261, 0, 3, 2, 2, 
"Sudadera estilo casual con estampado. Sudadera corta tipo jersey con cordones. Tipo de ajuste overzise, manga larga, hombros caídos. Composición:	65% Algodón, 35% Poliéster."),
('000006', "Cazadora Estilo Biker Tipo Piel De Hombre", 3, 799, 0, 650, 0, 3, 1, 2, 
"Cazadora color negro de hombre. Largo: Talla M 68 cm ( Estos datos se obtuvieron de la medición manual del producto, las mediciones pueden variar de 2 a 3 CM.). Composición: POLIÉSTER 100%"),
('000007', "Blusas Geométrico Casual", 21, 142, 1, 135, 1, 1, 2, 1, 
"Blusas casuales multicolor, estampado geométrico de largo normal. Ajuste regular con escote en V, manga corta tipo murciélago y botonadura tipo Jersey. Composición:	95% Poliéster, 5% Spandex."),
('000008', "Tenis De Hombre Casual", 16, 499, 1, 424, 1, 4, 3, 4, 
"Tenis color blanco unisex, casual suela corte sintético horma redonda forro textil suela sintética. Composición: CORTE SINTETICO 80%,FORRO TEXTIL 10%,SUELA SINTETICA 10%"),
('000009', "Jeans Desgarro Liso", 9, 496, 1, 473, 0, 3, 2, 3, 
"Jeans corte ajustado, desgarro liso, lavado medio. Pantaló tipo pitillo con estampado liso, cintura natural. Composición:	75% Algodón, 23% Poliéster, 2% spandex."),
('000010', "Bermuda Confort De Mezclilla De Hombre", 17, 399, 0, 370, 0, 2, 1, 3, 
"Bermuda color azul claro de hombre confort con efecto lavado y destrucciones, es un 5 bolsillos con cierre cubierto por tapeta, botón metalizado y dobladillo fijo en bajos. Tela con stretch, para dar mayor comodidad. Composición: ALGODÓN 99%,ELASTANO 1%");

INSERT INTO rastyle.clientes 
(id, firstName, lastname, email, clientes.password, id_CategoriaUsuario, image, cp, calle, num, num_inter, ciudad, estado, pais, tel) 
VALUES
('000001', 'Marco', 'Arcos', 'arcos@gmail.com', 'paSs123', 1, "", 91710, "", "", "", "Veracruz", "Veracruz", "México", "1234567890"),
('000002', 'Carlos', 'Sandoval', 'carlos31sandoval98@gmail.com', 'CdSp#1234', 1, "", 44460, "Salvador Lopez", "1750", "201", "Guadalajara", "Jalisco", "México", "3461029024"),
('000003', 'Daniel', 'Puentes', 'puentes03@gmail.com', 'AlGo#1234', 2, "", 99900, "", "", "", "Zacatecas", "Zacatecas", "México", "4617284908"),
('000004', 'Juan', 'Perez', 'algo.algomas123@gmail.com', 'paSsWord#1234', 2, "", 94210, "Miguel Hidalgo", "45", "", "Puebla", "Puebla", "México", "5467388921"),
('000005', 'Luis Enrique', 'Gonzalez Gonzalez', 'luisE@hotmail.com', 'Contraseña123', 2, "", 98610, "", "", "", "Ciudad de México", "Ciudad de México", "México", "5556789204"),
('000006', 'Javier', 'Zapata', 'zjvier@gmail.com', 'ZzJj1234', 2, "", 45627, "Independencia", "234", "5", "Guadalajara", "Jalisco", "México", "7890356712"),
('000007', 'Miguel', 'Cervantes', 'cerMi@hotmail.com', 'mig4321#', 2, "", 23654, "", "", "", "Merida", "Yucatan", "México", "5673895492"),
('000008', 'Maricela', 'Ramirez', 'maricela@gmail.com', 'password@4321', 2, "", 46758, "", "", "", "Tijuana", "Baja California", "México", "1452789345"),
('000009', 'Brenda', 'Hernandez', 'brender@gmail.com', 'secure$43', 2, "", 34561, "Ocampo", "12", "3", "Monterrey", "Nuevo Leon", "México", "6453687923"),
('000010', 'Leslie', 'Oliva', 'leslieOliva@gmail.com', 'cont@12345', 2, "", 67325, "Revolución", "1500", "23", "Aguascalientes", "Aguascalientes", "México", "6654897230");

INSERT INTO rastyle.tallasproductos 
(Tallas_id, Productos_id)
VALUES
(1, '000001'), (2, '000001'), (4, '000001'), (5, '000001'), (6, '000001'),
(2, '000002'), (3, '000002'), (4, '000002'), (5, '000002'), (6, '000002'),
(1, '000003'), (3, '000003'), (4, '000003'), (5, '000003'), (6, '000003'),
(3, '000004'), (4, '000004'), (5, '000004'),
(1, '000005'), (2, '000005'), (5, '000005'), (6, '000005'),
(1, '000006'), (2, '000006'), (3, '000006'), (4, '000006'), (5, '000006'), (6, '000006'),
(2, '000007'), (3, '000007'), (4, '000007'), (5, '000007'),
(3, '000008'), (4, '000008'),
(1, '000009'), (3, '000009'), (5, '000009'),
(2, '000010'), (3, '000010'), (4, '000010'), (5, '000010'), (6, '000010');

INSERT INTO rastyle.coloresproductos
(Colores_id, productos_id)
VALUES
(1, '000001'), (2, '000001'), (5, '000001'), (7, '000001'), (8, '000001'),  (9, '000001'),
(2, '000002'), (3, '000002'), (6, '000002'), (5, '000002'),
(3, '000003'), (1, '000003'), (7, '000003'), (9, '000003'), (4, '000003'),
(1, '000004'), (2, '000004'), (3, '000004'), (4, '000004'), (5, '000004'), (6, '000004'),
(4, '000005'), (5, '000005'), (7, '000005'), (9, '000005'),
(1, '000006'), (2, '000006'), (3, '000006'), (4, '000006'), (7, '000006'), (8, '000006'), (9, '000006'),
(2, '000007'), (3, '000007'), (4, '000007'), (5, '000007'), (6, '000007'), (7, '000007'), (8, '000007'), (9, '000007'),
(1, '000008'), (4, '000008'), (5, '000008'),
(1, '000009'), (3, '000009'), (4, '000009'), (5, '000009'), (9, '000009'),
(2, '000010'), (3, '000010'), (4, '000010'), (5, '000010'), (6, '000010'), (8, '000010'), (1, '000010');

INSERT INTO rastyle.ventas
(id, id_Clientes, enCarrito)
VALUES
(1, '000001', 0), (2, '000001', 1), (3, '000002', 0), (4, '000003', 1),
(5, '000004', 0), (6, '000006', 0), (7, '000007', 0), (8, '000007', 1),
(9, '000007', 0), (10, '000009', 0), (11, '000010', 0);

INSERT INTO rastyle.detalleventas
(id_Ventas, id_Productos, cantidad, precio)
VALUES
(1, '000001', 2, 572), (1, '000003', 1, 153), (1, '000005', 1, 261), (1, '000007', 1, 135), 
(2, '000005', 1, 273), 
(3, '000002', 1, 298), (3, '000004', 3, 297), 
(4, '000005', 2, 522), (4, '000006', 1, 799), (4, '000007', 1, 142), 
(5, '000006', 1, 799), (5, '000004', 1, 99), 
(6, '000010', 1, 399), 
(7, '000009', 1, 473), 
(8, '000008', 1, 424), (8, '000004', 2, 198), (8, '000002', 2, 596), (8, '000010', 1, 399), 
(9, '000006', 1, 799), (9, '000003', 3, 459), 
(10, '000001', 3, 858), (10, '000002', 1, 399), (10, '000007', 2, 270), 
(11, '000007', 2, 270);
