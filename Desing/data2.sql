INSERT INTO rastyle.productos 
(id, Nombre, Cantidad, precio, enOferta, precioOferta, hotSale, id_Colecciones, id_Categoria, id_Subcategoria, Descripcion) 
VALUES
('000012', "Último producto creado", 17, 399, 0, 370, 0, 2, 1, 3, 
"Producto de prueba para probar las fechas");

INSERT INTO rastyle.clientes 
(id, firstName, lastname, email, clientes.password, id_CategoriaUsuario, image, cp, calle, num, num_inter, ciudad, estado, pais, tel) 
VALUES
('000012', 'Ernesto', 'Pardo', 'ernesto123@gmail.com', 'con23t@12345', 2, "", 67325, "Revolución", "1500", "23", "Zapopan", "Jalisco", "México", "7483029485");

INSERT INTO rastyle.tallasproductos 
(Tallas_id, Productos_id)
VALUES
(5, '000012'), (6, '000012');

INSERT INTO rastyle.coloresproductos
(Colores_id, productos_id)
VALUES
(4, '000012'), (5, '000012'), (9, '000012');

