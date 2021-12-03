import { Injectable } from '@nestjs/common';
import { UserRepository } from './user.repository';
import { InjectRepository } from '@nestjs/typeorm';
import { User } from './user.entity';
import { UpdateUserDto } from '../auth/dto/update-user.dto';

@Injectable()
export class UserService {
  constructor(
    @InjectRepository(UserRepository) private userRepository: UserRepository,
  ) {}

  async getUsers(): Promise<User[]> {
    return await this.userRepository.find();
  }

  async getOneUser(id: number): Promise<User> {
    return await this.userRepository.findOne({ id });
  }

  async updateUser(id: number, updateUserDto: UpdateUserDto): Promise<User> {
    updateUserDto.id = id;
    return await this.userRepository.save(updateUserDto);
  }

  async deleteUser(id: number): Promise<void> {
    await this.userRepository.delete(id);
  }
}
