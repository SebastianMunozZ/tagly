import { Injectable, HttpException, HttpStatus } from '@nestjs/common';
import Gun from 'gun';
import * as bcrypt from 'bcryptjs';

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

  //Obtener un usuario por su tag
  getUserByTag(tag: string): Promise <any> {
    return new Promise((resolve, reject) => {
      let found = false;
      this.gun.get('users').map().once((user) => {
        if (user?.username === tag && !found) {
          found = true;
          console.log('Usuario existente: ', user);
          resolve(user);
        }
      });

      setTimeout(() => {
        if (!found) {
          reject('El usuario no existe');
        }
      }, 500);
    })
  }

  // Guardar un usuario en GunDB
  createUser(userData: { name: string; surname: string; username: string; email: string; password: string }) {
    return new Promise((resolve, reject) => {
      // Validación de campos obligatorios
      if (!userData.name || !userData.surname || !userData.username || !userData.email || !userData.password) {
        return reject(new HttpException('Faltan datos del usuario', HttpStatus.BAD_REQUEST));
      }
  
      const usersRef = this.gun.get('users');
      let emailExists = false;
      let usernameExists = false;

      usersRef.map().once((user: any) => {
        if (user?.email === userData.email) {
          emailExists = true;
        }
        if (user?.username === userData.username) {
          usernameExists = true;
        }
      });

      setTimeout(() => {
        if (emailExists) {
          reject(new HttpException('El correo ya está registrado.', HttpStatus.CONFLICT));
        } else if (usernameExists) {
          reject(new HttpException('El nombre de usuario ya está en uso.', HttpStatus.CONFLICT));
        } else {
          try {
            userData.password = bcrypt.hashSync(userData.password, 10);
            usersRef.set(userData);
            resolve({ message: 'Usuario guardado exitosamente', data: userData });
          } catch (error) {
            reject(new HttpException('Error al hashear la contraseña', HttpStatus.INTERNAL_SERVER_ERROR));
          }
          
        }
      }, 1000);
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

  async deleteAllUser(): Promise<string> {
    return new Promise((resolve, reject) => {
      const userRef = this.gun.get('users');

      userRef.map().once((data,key) => {
        if(data) {
          userRef.get(key).put(null)
        }
      });

      setTimeout(() => {
        userRef.once((data) => {
          console.log(data);
          if (data) {
            reject('Error: Algunos usuarios no se eliminaron correctamente.');
          } else {
            resolve('Todos los usuarios eliminados correctamente');
          }
        });
      }, 1000); // Espera de 1 segundo para confirmar
    });
  }
}
