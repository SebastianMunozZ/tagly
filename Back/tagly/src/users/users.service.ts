import { Injectable } from '@nestjs/common';
import Gun from 'gun';

@Injectable()
export class UsersService {
    private gun;

  constructor() {
    // Conectar a GunDB en el backend (por defecto, usa WebSocket en localhost)
    this.gun = Gun(['http://localhost:8765/gun']);  // Si estás utilizando una URL diferente, cámbiala
  }

  // Método para obtener usuarios desde GunDB
  getUsers(): Promise<{ id: string; name?: string; email?: string }[]> {
    return new Promise((resolve, reject) => {
      const usersArray: { id: string; name?: string; email?: string }[] = [];
  
      this.gun.get('users').map().once((data: any, key: string) => {
        if (data && key !== '_') {
            delete data._;
            usersArray.push({ id: key, ...data });
        }
      });
  
      setTimeout(() => {
        if (usersArray.length > 0) {
          resolve(usersArray);
        } else {
          reject('No se encontraron usuarios');
        }
      }, 500);
    });
  }

  // Guardar un usuario en GunDB
  createUser(userData: { username: string; email: string }) {
    return new Promise((resolve, reject) => {
      if (!userData ||!userData.username || !userData.email) {
        reject('Faltan datos del usuario');
        return;
      }

      const userRef = this.gun.get('users').set(userData);
      resolve({ message: 'Usuario guardado', data: userData });
    });
  }

  async deleteUser(userId: string): Promise<string> {
    return new Promise((resolve, reject) => {
      this.gun.get('users').get(userId).put(null, (ack) => {
        if (ack.err) {
          reject('Error al eliminar el usuario');
        } else {
          resolve(`Usuario ${userId} eliminado correctamente`);
        }
      });
    });
  }
}
