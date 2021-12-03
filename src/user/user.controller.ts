import {
  Body,
  Controller,
  Delete,
  Get,
  Param,
  Patch,
  UseGuards,
  ValidationPipe,
} from '@nestjs/common';
import { AuthGuard } from '@nestjs/passport';
import { User } from './user.entity';
import { UserService } from './user.service';
import { UpdateUserDto } from '../auth/dto/update-user.dto';
import { ApiBearerAuth } from '@nestjs/swagger';

@Controller('user')
export class UserController {
  constructor(private userService: UserService) {}

  @UseGuards(AuthGuard())
  @ApiBearerAuth()
  @Get()
  async getUsers(): Promise<User[]> {
    return await this.userService.getUsers();
  }

  @UseGuards(AuthGuard())
  @ApiBearerAuth()
  @Get('/:id')
  async getUser(@Param('id') id: number): Promise<User> {
    return await this.userService.getOneUser(id);
  }

  @UseGuards(AuthGuard())
  @ApiBearerAuth()
  @Patch('/:id')
  async updateUser(
    @Param('id') id: number,
    @Body(ValidationPipe) updateUserDto: UpdateUserDto,
  ): Promise<User> {
    return await this.userService.updateUser(id, updateUserDto);
  }

  @UseGuards(AuthGuard())
  @ApiBearerAuth()
  @Delete('/:id')
  async deleteUser(@Param('id') id: number): Promise<void> {
    await this.userService.deleteUser(id);
  }
}
