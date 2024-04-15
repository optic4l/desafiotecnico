# Desafio Tecnico Frogmi

Esta es la solucion al desafio tecnico planteado, incluye una API desarrollada en Ruby on Rails y un frontend construido con React, Vite y Tailwind CSS. La solucion permite obtener y persistir datos relacionados con eventos sísmicos, y comentar los eventos.

## Estructura del Repositorio

- `api/`: Contiene el código fuente de la API desarrollada en Ruby on Rails.
- `front/`: Contiene el código fuente del frontend desarrollado con React, Vite y Tailwind CSS.

## Tecnologías Utilizadas

- **Backend**

  - Ruby on Rails
  - PostgreSQL

- **Frontend**
  - React
  - Tailwind CSS

## Requisitos

- Ruby 3.3.0
- Rails 7.1.3
- Node.js
- Npm
- PostgreSQL

## Instalación

### Backend (API)

1. Navegar hasta la carpeta `api/`:

   ```bash
   cd api/
   ```

2. Instalar las dependencias:

   ```bash
   bundle install
   ```

3. Configurar la base de datos:

   ```bash
   rails db:create
   rails db:migrate
   ```

4. Lanzar task para obtener y persistir data sismologica:

   ```bash
   rake obtener_datos:ejecutar
   ```

5. Iniciar el servidor:

   ```bash
   rails server
   ```

### Frontend

1. Navegar hasta la carpeta `front/`:

   ```bash
   cd front/
   ```

2. Instalar las dependencias:

   ```bash
   npm install
   ```

3. Iniciar el servidor de desarrollo:

   ```bash
   npm run dev
   ```

## Uso

### API

La API expone endpoints para mostrar datos de eventos sísmicos y persistir comentarios relacionados a los eventos.

### Frontend

El frontend permite visualizar y comentar eventos sísmicos. Se puede acceder a la aplicación web visitando la URL `http://localhost:5173`.
