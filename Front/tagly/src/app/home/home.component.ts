import { Component } from '@angular/core';
import { AuthService } from '../services/auth.service';
import { FormBuilder, FormGroup, ReactiveFormsModule } from '@angular/forms';
import { PostService } from '../services/post.service';

@Component({
  selector: 'app-home',
  imports: [ReactiveFormsModule],
  templateUrl: './home.component.html',
  styleUrl: './home.component.css'
})
export class HomeComponent {
  postForm!: FormGroup;

  constructor(private authService: AuthService, private fb: FormBuilder, private PostService: PostService) { }

  ngOnInit() {
    this.postForm = this.fb.group({
      status: ['']
    });
  }

  publishPost(): void {
    const status = this.postForm.get('status')?.value;
    this.PostService.createPost({ status }).subscribe();
    console.log(status);
  }

  logOut(): void {
    this.authService.logout();
  }
}
