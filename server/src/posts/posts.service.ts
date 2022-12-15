import { PrismaService } from '@/prisma/prisma.service';
import {
  ForbiddenException,
  Injectable,
  UnauthorizedException,
} from '@nestjs/common';
import { Post } from '@prisma/client';
import { CreatePostDto } from './dto/create-post';
import { UpdatePostDto } from './dto/update-post';

@Injectable()
export class PostsService {
  constructor(private readonly prismaService: PrismaService) {}

  getPosts(): Promise<Post[]> {
    return this.prismaService.post.findMany();
  }

  async getMyPostById(postId: string): Promise<Post | null> {
    return await this.prismaService.post.findUnique({
      where: {
        id: postId,
      },
    });
  }

  async getMyPosts(userId: string): Promise<Post[]> {
    return await this.prismaService.post.findMany({
      where: {
        userId,
      },
    });
  }

  async createPost(dto: CreatePostDto, userId?: string): Promise<Post> {
    if (!userId) throw new UnauthorizedException('User not found');
    return await this.prismaService.post.create({
      data: {
        userId,
        ...dto,
      },
    });
  }

  async updatePost(
    postId: string,
    dto: UpdatePostDto,
    userId?: string
  ): Promise<Post> {
    if (!userId) throw new UnauthorizedException('User not found');
    const post = await this.prismaService.post.findUnique({
      where: {
        id: postId,
      },
    });

    if (!post || post.userId !== userId)
      throw new ForbiddenException('permission denied');

    return await this.prismaService.post.update({
      where: {
        id: postId,
      },
      data: {
        ...dto,
      },
    });
  }
}
