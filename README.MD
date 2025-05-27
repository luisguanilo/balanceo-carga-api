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
docker compose up --build -d
```

## Archivos principales
- `api/index.js:` Servidor Node.js básico que responde con un mensaje y puerto.

- `api/Dockerfile:` Imagen Docker para el servidor Node.js.

- `nginx.conf:` Configuración de NGINX para balanceo de carga.

- `docker-compose.yml:` Orquestación de los contenedores API y NGINX.


## Notas
- Los puertos mapeados son:

    - `API1: localhost:3002` → contenedor puerto 3000

    - `API2: localhost:3003` → contenedor puerto 3000

    - `NGINX: localhost:8080` → balanceo a API1 y API2

## Podemos detener los contenedores con:
`docker compose down`

## Balanceo de carga con NGINX y cómo identificar el backend

Este laboratorio utiliza NGINX como balanceador de carga para distribuir las peticiones entre dos servicios backend: `api1` y `api2`. Ambos corren en contenedores Docker diferentes y escuchan en el puerto 3000.

### Identificación de backend en los logs de NGINX

En los logs de NGINX, cada petición derivada a un backend se registra con la IP y puerto del contenedor destino, por ejemplo:

`upstream: 172.18.0.2:3000`

`upstream: 172.18.0.3:3000`

```
CONTAINER ID   IMAGE          COMMAND                  CREATED          STATUS         PORTS                    NAMES
9ef55e24047c   lab-s09-api2   "docker-entrypoint.s…"   6 minutes ago    Up 5 minutes   0.0.0.0:3002->3000/tcp   api2
5162260ab4d2   lab-s09-api1   "docker-entrypoint.s…"   6 minutes ago    Up 5 minutes   0.0.0.0:3001->3000/tcp   api1
6b042bbe5858   nginx:latest   "/docker-entrypoint.…"   14 minutes ago   Up 5 minutes   0.0.0.0:80->80/tcp       nginx
```

Estas IP corresponden a los contenedores Docker de `api1` y `api2` respectivamente.

Para saber qué IP corresponde a cada contenedor, usamos:

```bash
docker inspect api1 | Select-String "IPAddress"

y la respuesta en consola es la siguiente:

 "SecondaryIPAddresses": null,
            "IPAddress": "",
                    "IPAddress": "172.18.0.2",
```

```bash
docker inspect api2 | Select-String "IPAddress"
y la respuesta en consola es la siguiente:

 "SecondaryIPAddresses": null,
            "IPAddress": "",
                    "IPAddress": "172.18.0.3",
```

## Visualizar logs
usamos el siguiente comando:

`docker logs nginx`

el cual nos da la siguiente respuesta en consola

````
172.18.0.1 - - [27/May/2025:00:43:18 +0000] "GET / HTTP/1.1" 200 32 "-" "Mozilla/5.0 (Windows NT; Windows NT 10.0; es-PE) WindowsPowerShell/5.1.26100.4061" upstream: 172.18.0.2:3000
172.18.0.1 - - [27/May/2025:00:43:22 +0000] "GET / HTTP/1.1" 200 32 "-" "Mozilla/5.0 (Windows NT; Windows NT 10.0; es-PE) WindowsPowerShell/5.1.26100.4061" upstream: 172.18.0.3:3000
172.18.0.1 - - [27/May/2025:00:43:23 +0000] "GET / HTTP/1.1" 200 32 "-" "Mozilla/5.0 (Windows NT; Windows NT 10.0; es-PE) WindowsPowerShell/5.1.26100.4061" upstream: 172.18.0.2:3000
172.18.0.1 - - [27/May/2025:00:43:24 +0000] "GET / HTTP/1.1" 200 32 "-" "Mozilla/5.0 (Windows NT; Windows NT 10.0; es-PE) WindowsPowerShell/5.1.26100.4061" upstream: 172.18.0.3:3000
172.18.0.1 - - [27/May/2025:00:43:26 +0000] "GET / HTTP/1.1" 200 32 "-" "Mozilla/5.0 (Windows NT; Windows NT 10.0; es-PE) WindowsPowerShell/5.1.26100.4061" upstream: 172.18.0.2:3000
172.18.0.1 - - [27/May/2025:00:43:28 +0000] "GET / HTTP/1.1" 200 32 "-" "Mozilla/5.0 (Windows NT; Windows NT 10.0; es-PE) WindowsPowerShell/5.1.26100.4061" upstream: 172.18.0.3:3000`
````

al final de cada linea observamos 172.18.0.3:300 ó 172.18.0.2:3000 como se menciona un poco antes. esto nos indica que hay peticiones desde el backend y se direcciona hacia un api o hacia otro api


## Arquitectura del sistema

```plaintext
     Cliente
        │
        ▼
   +-----------+
   |  NGINX LB |
   +-----------+
    /         \
   /           \
▼               ▼
API 1 (Node.js)  API 2 (Node.js)
172.18.0.2:3000  172.18.0.3:3000
```
## Descripción del funcionamiento
- **Cliente**: Hace peticiones HTTP.

- **NGINX LB**: Recibe las peticiones y las distribuye en balanceo *round-robin* entre `api1` y `api2`.

- **API 1 / API 2**: Contenedores Node.js escuchando en el puerto `3000`, respondiendo `"Servidor corriendo desde 3000"`.