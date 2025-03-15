import { Injectable } from '@nestjs/common';
import Gun from 'gun';

@Injectable()
export class GunService {
  private gun;

  constructor() {
    // Conectar a GunDB en el backend (por defecto, usa WebSocket en localhost)
    this.gun = Gun(['http://localhost:8765/gun']);  // Si estás utilizando una URL diferente, cámbiala
  }

  // Método para obtener usuarios desde GunDB
  getUsers() {
    return new Promise((resolve, reject) => {
      this.gun.get('users').once((data) => {
        if (data) {
          resolve(data);
        } else {
          reject('No se encontraron usuarios');
        }
      });
    });
  }
}
