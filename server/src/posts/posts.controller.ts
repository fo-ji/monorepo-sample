import {
  Body,
  Controller,
  Delete,
  Get,
  HttpCode,
  HttpStatus,
  Param,
  ParseIntPipe,
  Patch,
  Post,
  Query,
  Req,
  UseGuards,
} from '@nestjs/common';
import { AuthGuard } from '@nestjs/passport';
import { Post as PostModel } from '@prisma/client';
import { Request } from 'express';
import { CreatePostDto } from './dto/create-post';
import { UpdatePostDto } from './dto/update-post';
import { PostsService } from './posts.service';

@Controller('posts')
export class PostsController {
  constructor(private readonly postService: PostsService) {}

  @Get()
  getPosts(
    @Query('take', ParseIntPipe) take: number,
    @Query('cursorId') cursorId: string
  ): Promise<PostModel[]> {
    return this.postService.getPosts(take, cursorId);
  }

  @Get(':id')
  getMyPostById(@Param('id') postId: string): Promise<PostModel | null> {
    return this.postService.getMyPostById(postId);
  }

  @UseGuards(AuthGuard('jwt'))
  @Get('me/:userId')
  getMyPosts(
    @Param('userId') userId: string,
    @Query('keyword') keyword: string
  ): Promise<PostModel[]> {
    return this.postService.getMyPosts(userId, keyword);
  }

  @UseGuards(AuthGuard('jwt'))
  @Post('new')
  createPost(
    @Req() req: Request,
    @Body() dto: CreatePostDto
  ): Promise<PostModel> {
    return this.postService.createPost(dto, req.user?.id);
  }

  @UseGuards(AuthGuard('jwt'))
  @Patch(':id')
  updatePost(
    @Req() req: Request,
    @Param('id') postId: string,
    @Body() dto: UpdatePostDto
  ): Promise<PostModel> {
    return this.postService.updatePost(postId, dto, req.user?.id);
  }

  @UseGuards(AuthGuard('jwt'))
  @HttpCode(HttpStatus.NO_CONTENT)
  @Delete(':id')
  deletePost(@Req() req: Request, @Param('id') postId: string): Promise<void> {
    return this.postService.deletePost(postId, req.user?.id);
  }
}
