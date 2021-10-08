INSERT INTO rastyle.productos 
(id, Nombre, Cantidad, precio, enOferta, precioOferta, hotSale, id_Colecciones, id_Categoria, id_Subcategoria, Descripcion) 
VALUES
('000011', "Penultimo producto creado", 17, 399, 0, 370, 0, 2, 1, 3, 
"Producto de prueba para probar las fechas");

INSERT INTO rastyle.clientes 
(id, firstName, lastname, email, clientes.password, id_CategoriaUsuario, image, cp, calle, num, num_inter, ciudad, estado, pais, tel) 
VALUES
('000011', 'Ramon', 'Corona', 'ramonC123@gmail.com', 'co3nt@12345', 2, "", 67325, "Revolución", "1500", "23", "Aguascalientes", "Aguascalientes", "México", "6654897230");

INSERT INTO rastyle.tallasproductos 
(Tallas_id, Productos_id)
VALUES
(2, '000011'), (3, '000011'), (4, '000011');

INSERT INTO rastyle.coloresproductos
(Colores_id, productos_id)
VALUES
(1, '000011'), (3, '000011');

