import { Controller, Get } from '@nestjs/common';
import { Post } from '@prisma/client';
import { PostsService } from './posts.service';

@Controller('posts')
export class PostsController {
  constructor(private readonly postService: PostsService) {}

  @Get()
  getPosts(): Promise<Post[]> {
    return this.postService.getPosts();
  }
}
