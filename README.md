## Estructura del Proyecto

```
root/
├── backend/              # Servidor Express
│   ├── src/
│   │   ├── controllers/  # Lógica de controladores
│   │   ├── middlewares/  # Middlewares personalizados
│   │   ├── models/       # Modelos de datos
│   │   ├── routes/       # Rutas de la API
│   │   ├── services/     # Funciones reutilizables
│   ├── tests/            # Tests del backend
│   ├── app.js            # Configuración principal de Express
│   ├── index.js          # Punto de entrada del backend
│   ├── .env / .env.local # Variables de entorno
│
├── frontend/             # Cliente React + Vite
│   ├── src/
│   │   ├── assets/       # Archivos estáticos
│   │   ├── components/   # Componentes reutilizables
│   │   ├── layouts/      # Plantillas/layouts
│   │   ├── pages/        # Vistas principales
│   │   ├── routes/       # Sistema de rutas
│   │   ├── store/        # Estado global
│   │   ├── utils/        # Funciones utilitarias
│   ├── App.jsx           # Componente raíz
│   ├── main.jsx          # Punto de entrada
│   ├── main.css          # Estilos globales
│   ├── index.html        # HTML base
│
├── package.json          # Dependencias raíz
├── README.md             # Este archivo
```


## Instalación

1. Clona el repositorio:
```bash
git clone https://github.com/flaviamartinez/proyecto-final
```

2. Instala dependencias:

	**Backend:**
	```bash
	cd backend
	npm install
	```

	**Frontend:**
	```bash
	cd ../frontend
	npm install
	```

	**Base de Datos**

	Antes de iniciar el backend, asegúrate de crear las tablas y cargar los datos iniciales en tu base de datos. Para ello:

	+ Abre tu cliente de base de datos (por ejemplo, pgAdmin).

	+ Copia y ejecuta el contenido del archivo DDL.sql ubicado en backend/db/ para crear las tablas necesarias.

	+ Luego, copia y ejecuta el contenido de DML.sql para insertar los datos iniciales.

	Asegúrate de ejecutar ambos scripts en la base de datos correspondiente antes de iniciar el servidor backend.

## Configuración

### Variables de entorno

**Backend:**

Crea un archivo `.env.local` y define:

```
PORT=3000
HOST=...
USER=...
PASSWORD=...
DATABASE=...
JWT_SECRET=...
```

## Comandos útiles

### Backend

- Ejecutar en desarrollo:  
  ```bash
  npm run dev
  ```

- Ejecutar pruebas:  
  ```bash
  npm run test:ui
  ```

### Frontend

- Ejecutar en desarrollo:  
  ```bash
  npm run dev
  ```

## API

Endpoints:

```
POST   /register       # Registro de usuario (middleware: checkRegisterUser)
POST   /login          # Login de usuario (middleware: checkLoginUser)
GET    /me             # Obtener usuario autenticado (middleware: verifyToken)

GET    /categories     # Obtener categorías de productos
GET    /products       # Obtener productos
POST   /products       # Crear nuevo producto (middleware: checkAllFields)
POST   /buy            # Crear orden de compra (middleware: checkEmptyCart)
```

---

