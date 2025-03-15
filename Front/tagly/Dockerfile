# Usamos una imagen oficial de Node.js 18 como base
FROM node:18

# Definimos el directorio de trabajo dentro del contenedor
WORKDIR /app

# Copiamos el archivo package.json y package-lock.json para instalar dependencias
COPY package*.json ./

# Instalamos las dependencias
RUN npm install

# Verificamos la versión de Node.js y npm para asegurarnos de que están disponibles
RUN node -v && npm -v

# Copiamos todo el proyecto al contenedor
COPY . .

# Exponemos el puerto 4200
EXPOSE 4200

# Iniciamos el servidor de desarrollo de Angular
CMD ["npm", "run", "start", "--", "--host", "0.0.0.0", "--poll=2000", "--live-reload"]


