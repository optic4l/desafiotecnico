# API para obtener data sismologica

## Introduccion

Esta es una API desarrollada en Ruby on Rails para obtener información sobre eventos sísmicos. La API se conecta con un backend en Rails y persiste los datos en una base de datos PostgreSQL.

## Requisitos

- Ruby 3.3.0

- Rails 7.1.3

- PostgreSQL

## Uso

### Obtener todas las features

Para obtener datos sismológicos, realiza una solicitud GET a la siguiente URL:

```bash
http://127.0.0.1:3000/api/features?page=1&per_page=2

```

Ajustar los parametros "page" y "per_page" segun sea necesario.
Considerar que el maximo permitido para "per_page" es de 1000. En caso de filtrar por un valor mayor la consulta se realizara igualmente pero usando el maximo de 1000 per page y no el valor mayor que se ingreso.

### Filtrar por tipo de magnitud

Puedes filtrar los eventos sísmicos por magnitud usando el parámetro mag_type. Por ejemplo:

```bash
    http://127.0.0.1:3000/api/features?page=1&per_page=2&mag_type[]=ml
```

En caso de querer filtrar por mas de un mag_type, se puede agregar de la siguiente manera:

```bash
    http://127.0.0.1:3000/api/features?page=1&per_page=2&mag_type[]=ml&mag_type[]=md
```
