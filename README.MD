# Jenkins Pipeline Básico - Hello World

Este repositorio contiene segun enunciado un ejemplo básico de pipeline para Jenkins que muestra un mensaje "Hello World" en la consola.

---

## Contenido

- `Jenkinsfile`: Pipeline básico que imprime "Hello World - Curso IAC - S09" en la salida de Jenkins.

---

## Cómo usar

1. **Se sube el Jenkinsfile al repositorio en GitHub.**
https://github.com/luisguanilo/balanceo-carga-api.git

2. **Configurar Jenkins:**

   - se instala el jenkinsfile
   - Creamos un nuevo proyecto tipo *Pipeline*.
   - En la configuración del proyecto, seleccionamos *Pipeline script from SCM*.
   - Elegimos Git y pegamos la URL del repositorio que esta en el punto.
   - Guardamos y ejecutamos el pipeline.

3. **Ver resultados:**

   Al ejecutar el pipeline, en la consola Jenkins deberías ver:
   "Hello World - Curso IAC - S09"

**Requisitos**
- Jenkins instalado y funcionando.
- Acceso al repositorio con el Jenkinsfile.



# Balanceo de Carga para API REST con Node.js, Docker y NGINX
Este proyecto implementa una estrategia de balanceo de carga para un API REST simple usando dos contenedores Node.js sin dependencias, orquestados con Docker Compose, y balanceados con NGINX.

---

## Estructura del proyecto
````
LAB-S09
├── api/
│ ├── Dockerfile
│ └── index.js
├── docker-compose.yml
├── nginx.conf
├── Jenkinsfile
└── README.md
````

## Descripción

- Dos instancias de un API simple en Node.js, cada una corriendo en un contenedor Docker diferente.
- NGINX actúa como balanceador de carga distribuyendo las peticiones entre ambas APIs.
- Los logs de los contenedores muestran la distribución de peticiones, evidenciando el balanceo.
- No se usan dependencias externas en Node.js, solo el módulo `http`.

---

## Requisitos

- Docker
- Docker Compose

---

## Cómo levantar el proyecto

1. Clonar el repositorio:

```
https://github.com/luisguanilo/balanceo-carga-api.git

```
## Construir y levantar los contenedores:
```
docker-compose up --build
```

## Archivos principales
- `api/index.js:` Servidor Node.js básico que responde con un mensaje y puerto.

- `api/Dockerfile:` Imagen Docker para el servidor Node.js.

- `nginx.conf:` Configuración de NGINX para balanceo de carga.

- `docker-compose.yml:` Orquestación de los contenedores API y NGINX.


## Notas
- Los puertos mapeados son:

    - `API1: localhost:3001` → contenedor puerto 3000

    - `API2: localhost:3002` → contenedor puerto 3000

    - `NGINX: localhost:8080` → balanceo a API1 y API2

## Podemos detener los contenedores con:
`docker-compose down`