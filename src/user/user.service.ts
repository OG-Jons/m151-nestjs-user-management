import { Injectable, NotFoundException } from '@nestjs/common';
import { CreateUserDto } from './dto/create-user.dto';
import { UpdateUserDto } from './dto/update-user.dto';
import { InjectRepository } from '@nestjs/typeorm';
import { UserRepository } from './user.repository';
import { User } from './entities/user.entity';

@Injectable()
export class UserService {
  constructor(
    @InjectRepository(UserRepository)
    private userRepository: UserRepository,
  ) {}

  async create(createUserDto: CreateUserDto): Promise<User> {
    return this.userRepository.save(createUserDto);
  }

  async findAll(): Promise<User[]> {
    return await this.userRepository.find();
  }

  async findOne(id: number) {
    const found = await this.userRepository.findOne(id);
    if (!found) throw new NotFoundException(`User with ID: ${id} not found`);
    return found;
  }

  async update(id: number, updateUserDto: UpdateUserDto): Promise<User> {
    const oldUser = await this.findOne(id);
    const updatedUser = await this.userRepository.save({
      ...oldUser,
      ...updateUserDto,
    });
    delete updatedUser.password;
    return updatedUser;
  }

  async remove(id: number) {
    const result = await this.userRepository.delete(id);

    if (result.affected === 0) {
      throw new NotFoundException(`User with ID '${id}' not found`);
    }
  }
}
