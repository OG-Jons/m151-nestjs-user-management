import { Injectable } from '@nestjs/common';
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
    return await this.userRepository.findOne(id);
  }

  async update(id: number, updateUserDto: UpdateUserDto): Promise<User> {
    return this.userRepository.save(updateUserDto);
  }

  remove(id: number) {
    return `This action removes a #${id} user`;
  }
}
