import { Injectable } from '@nestjs/common';
import Gun from 'gun';
import { CreatePostDto } from './dto/create-post.dto';
import { UpdatePostDto } from './dto/update-post.dto';

@Injectable()
export class PostsService {
    private gun:any = Gun();

    async create(createPostDto: CreatePostDto) {
        const timestamp = Date.now();
        const postId = `${createPostDto.author}-${Date.now()}`; // ID único
    
        const newPost = {
          content: createPostDto.content,
          author: createPostDto.author,
          timestamp,
        };
    
        this.gun.get('posts').get(postId).put(newPost);
        this.gun.get('users').get(createPostDto.author).get('posts').set(postId);
    
        return { message: 'Post creado con éxito', postId };
    }
    
    async findAll() {
        return new Promise((resolve) => {
            const posts:any = [];
            this.gun.get('posts').map().once((post) => {
                if (post) posts.push(post);
            });
    
            setTimeout(() => resolve(posts), 500); // Esperamos para recolectar todos los posts
        });
    }
    
    async update(postId: string, updatePostDto: UpdatePostDto) {
        const postRef = this.gun.get('posts').get(postId);
    
        postRef.once((post) => {
            const updatedPost = { ...post, ...updatePostDto };
            postRef.put(updatedPost);
        });
    
        return { message: 'Post actualizado con éxito' };
    }
    
    async delete(postId: string) {
        this.gun.get('posts').get(postId).put(null); // Marcamos como nulo para eliminarlo
        return { message: 'Post eliminado con éxito' };
    }
}
