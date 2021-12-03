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
    const users: User[] = await this.userRepository.find();
    users.forEach((user) => {
      delete user.password;
    });
    return users;
  }

  async getOneUser(id: number): Promise<User> {
    const user = await this.userRepository.findOne({ id });
    delete user.password;
    return user;
  }

  async updateUser(id: number, updateUserDto: UpdateUserDto): Promise<User> {
    updateUserDto.id = parseInt(String(id));
    const user = await this.userRepository.findOne({ id });
    for (const key in updateUserDto) {
      user[key] = updateUserDto[key];
    }
    const updatedUser = await this.userRepository.save(user);
    delete updatedUser.password;
    return updatedUser;
  }

  async deleteUser(id: number): Promise<void> {
    await this.userRepository.delete(id);
  }
}
