FROM node:23-alpine

WORKDIR /app

COPY index.js .

EXPOSE 3000
CMD ["node", "index.js"]

# dentro de la carpeta -> docker build -t lab09:api .
# se ejecuta con docker run -itd -p 4006:3000 lab09:api
# docker run -itd -p