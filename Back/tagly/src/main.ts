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


async function bootstrap() {
  const app = await NestFactory.create(AppModule);
  app.enableCors();
  await app.listen(process.env.PORT ?? 3000);
}
bootstrap();
