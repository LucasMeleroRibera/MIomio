# Plan de Desarrollo - Ejercicio ReservaHoteles (MVC)

Fecha de creación: 23/02/2026

------------------------------------------------------------------------

## 1. Análisis del ejercicio

-   Leer todos los requisitos.
-   Identificar funcionalidades principales:
    -   Autenticación
    -   Gestión de hoteles y habitaciones
    -   Gestión de reservas
-   Identificar requisitos técnicos obligatorios:
    -   POO
    -   MVC
    -   Sesiones
    -   Cookies
    -   Consultas preparadas
    -   Manejo de excepciones

------------------------------------------------------------------------

## 2. Diseño de Base de Datos

### Tablas necesarias:

-   usuarios
-   hoteles
-   habitaciones (relacionada con hoteles)
-   reservas (relacionada con usuarios y habitaciones)

Verificar: - Claves primarias - Claves foráneas - Tipos de datos
correctos

------------------------------------------------------------------------

## 3. Estructura del Proyecto (MVC)

Carpetas recomendadas: - /config - /models - /views - /controllers -
/public

Archivo principal: index.php

------------------------------------------------------------------------

## 4. Implementación por fases

### Fase 1: Conexión a Base de Datos

-   Crear clase de conexión usando PDO.
-   Configurar modo de errores con excepciones.
-   Usar consultas preparadas.

### Fase 2: Autenticación

-   Crear formulario de login.
-   Verificar usuario en base de datos.
-   Crear sesión al iniciar sesión correctamente.
-   Crear cookie de última visita.
-   Implementar logout.

### Fase 3: Gestión de Hoteles

-   Mostrar listado de hoteles.
-   Mostrar detalle de hotel.
-   Mostrar habitaciones asociadas.

### Fase 4: Gestión de Reservas

-   Crear reserva.
-   Guardar reserva en base de datos.
-   Mostrar listado de reservas del usuario.
-   Mostrar detalle de reserva.

------------------------------------------------------------------------

## 5. Manejo de Errores

-   Usar try-catch.
-   Lanzar excepciones con throw new Exception.
-   Mostrar mensajes controlados.

------------------------------------------------------------------------

## 6. Revisión Final

Checklist: - Proyecto organizado correctamente. - MVC bien aplicado. -
POO correcta (propiedades privadas, métodos públicos). - Sesiones
funcionando. - Cookie funcionando. - Consultas preparadas. - Código
tabulado y comentado. - Sin lógica de negocio en las vistas.

------------------------------------------------------------------------

Fin del documento.
