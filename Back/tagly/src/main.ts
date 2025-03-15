import { NestFactory } from '@nestjs/core';
import { AppModule } from './app.module';
import * as http from 'http';
import Gun from 'gun';  // Asegúrate de usar esta importación

// Crea un servidor HTTP
const server = http.createServer();

// Configura GunDB para que use el servidor HTTP que creaste
const gun = Gun({ web: server });

// Inicia el servidor en el puerto 8765
server.listen(8765, () => {
  console.log('GunDB está corriendo en http://localhost:8765');
});

// Interactúa con GunDB
const users = gun.get('users');  // Obtener un nodo de datos (en este caso, 'user')

users.put({ name: 'Sebastian', age: 30 });  // Escribir datos en el nodo 'user'

// Escuchar los cambios en el nodo 'user'
users.on((data) => {
  console.log('Datos actualizados en el nodo user:', data);
});

async function bootstrap() {
  const app = await NestFactory.create(AppModule);
  await app.listen(process.env.PORT ?? 3000);
}
bootstrap();
