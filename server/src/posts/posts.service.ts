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

  getPosts(take: number, cursorId: string): Promise<Post[]> {
    if (cursorId) {
      return this.prismaService.post.findMany({
        take,
        skip: 1,
        cursor: {
          id: cursorId,
        },
        orderBy: {
          id: 'asc',
        },
      });
    } else {
      return this.prismaService.post.findMany({
        take,
        orderBy: {
          id: 'asc',
        },
      });
    }
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

  async deletePost(postId: string, userId?: string): Promise<void> {
    const post = await this.prismaService.post.findUnique({
      where: {
        id: postId,
      },
    });

    if (!post || post.userId !== userId)
      throw new ForbiddenException('permission error');

    await this.prismaService.post.delete({
      where: {
        id: postId,
      },
    });
  }
}
