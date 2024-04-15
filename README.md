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

#### Obtener todas las features

Para obtener datos sismológicos, realiza una solicitud GET a la siguiente URL:

```bash
http://127.0.0.1:3000/api/features?page={current_page}&per_page={per_page}

```

Ejemplo:

```bash
    curl -X GET \
    '127.0.0.1:3000/api/features?page=1&per_page=2' \
    -H 'Content-Type: application/vnd.api+json'\
    -H 'cache-control: no-cache'
```

Ajustar los parametros "page" y "per_page" segun sea necesario.
Considerar que el maximo permitido para "per_page" es de 1000. En caso de filtrar por un valor mayor la consulta se realizara igualmente pero usando el maximo de 1000 per page y no el valor mayor que se ingreso.

#### Filtrar por tipo de magnitud

Puedes filtrar los eventos sísmicos por magnitud usando el parámetro mag_type.

```bash
    http://127.0.0.1:3000/api/features?page=1&per_page=2&mag_type[]=ml
```

Ejemplo:

```bash
    curl -X GET \
    '127.0.0.1:3000/api/features?page=1&per_page=2&mag_type[]=ml' \
    -H 'Content-Type: application/vnd.api+json'\
    -H 'cache-control: no-cache'
```

En caso de querer filtrar por mas de un mag_type, se puede agregar de la siguiente manera:

```bash
    http://127.0.0.1:3000/api/features?page=1&per_page=2&mag_type[]=ml&mag_type[]=md
```

#### Publicar comentario

Para publicar un comentario a cierta feature, realizar una peticion POST al siguiente endpoint:

```bash
    http://127.0.0.1:3000/api/features/{id_feature}/comments
```

Ejemplo:

```bash
    curl --request POST \
--url 127.0.0.1:3000/api/features/1/comments \
--header 'content-type: application/json' \
--data '{"body": "This is a comment" }'
```

### Frontend

El frontend permite visualizar y comentar eventos sísmicos. Se puede acceder a la aplicación web visitando la URL `http://localhost:5173`.

Se establecio para la paginacion un valor para "per_page" de 10.

Para realizar un comentario a cierto evento, ingresar a su vista de detalle clickeando en el link "Detalles" que se encuentra del todo a la derecha para cada evento.
