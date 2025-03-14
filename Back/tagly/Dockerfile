# Usamos una imagen oficial de Node.js como base
FROM node:20

# Establecemos el directorio de trabajo dentro del contenedor
WORKDIR /app

# Copiamos los archivos de configuración de npm
COPY package*.json ./

# Instalamos las dependencias de la aplicación
RUN npm install

# Copiamos todo el proyecto al contenedor
COPY . .

# Exponemos el puerto que usará la aplicación (por defecto NestJS usa el puerto 3000)
EXPOSE 3000

# Iniciamos la aplicación NestJS
CMD ["npm", "run", "start:dev"]

