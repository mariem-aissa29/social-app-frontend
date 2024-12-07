import { Component, OnInit } from '@angular/core';
import { PostService } from 'src/app/shared/services/post.service';

@Component({
  selector: 'app-posts',
  templateUrl: './posts.component.html',
  styleUrls: ['./posts.component.css']
})
export class PostsComponent implements OnInit {
  posts: any[] = [];
  newPostContent: string = '';
  newComment: { [key: string]: string } = {};

  constructor(private postService: PostService) {}

  ngOnInit(): void {
    this.fetchPosts();
  }

  // Charger les posts
  fetchPosts(): void {
    this.postService.getPosts().subscribe((data) => {
      this.posts = data;
    });
  }

  // Créer un nouveau post
  createPost(): void {
    if (this.newPostContent.trim()) {
      this.postService.createPost(this.newPostContent).subscribe(() => {
        this.newPostContent = '';
        this.fetchPosts();
      });
    }
  }

  // Liker un post
  likePost(postId: string): void {
    this.postService.likePost(postId).subscribe(() => {
      this.fetchPosts();
    });
  }

  // Ajouter un commentaire
  addComment(postId: string): void {
    if (this.newComment[postId]?.trim()) {
      this.postService.addComment(postId, this.newComment[postId]).subscribe(() => {
        this.newComment[postId] = '';
        this.fetchPosts();
      });
    }
  }
}
