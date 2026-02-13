# API de Concesionario

Esta es una API REST para gestionar un concesionario de vehículos, construida con Node.js, Express y Sequelize.

## Instalación

1. Clona el repositorio o descarga los archivos.
2. Instala las dependencias: `npm install`
3. Configura la base de datos MySQL:
   - Crea una base de datos llamada `concesionario`.
   - Importa el archivo `concesionario.sql` en tu base de datos.
4. Configura las variables de entorno en `.env`:
   - DB_HOST=localhost
   - DB_USER=tu_usuario
   - DB_PASSWORD=tu_password
   - DB_NAME=concesionario
   - JWT_SECRET=tu_clave_secreta
   - PORT=3000
5. Ejecuta el servidor: `npm start`

## Endpoints

### Usuarios
- POST /api/usuarios/register - Registrar un nuevo usuario
- POST /api/usuarios/login - Iniciar sesión

### Clientes (requiere token)
- POST /api/clientes - Crear cliente
- GET /api/clientes - Obtener todos los clientes

### Vehículos (requiere token)
- POST /api/vehiculos - Crear vehículo
- GET /api/vehiculos - Obtener todos los vehículos
- GET /api/vehiculos/:nombre - Obtener vehículo por nombre
- PUT /api/vehiculos/:id - Actualizar vehículo
- DELETE /api/vehiculos/:id - Eliminar vehículo

### Fabricantes (requiere token)
- POST /api/fabricantes - Crear fabricante
- GET /api/fabricantes/:id/vehiculos - Obtener vehículos de un fabricante

### Compras (requiere token)
- POST /api/compras - Crear compra
- GET /api/compras - Obtener todas las compras con detalles

## Autenticación
Usa el token JWT obtenido en el login en el header: `Authorization: Bearer <token>`

El token expira en 8 horas.