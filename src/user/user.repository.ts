import { EntityRepository, Repository } from 'typeorm';
import { User } from './user.entity';
import { AuthCredentialsDto } from '../auth/dto/auth-credentials.dto';
import {
  ConflictException,
  InternalServerErrorException,
  Logger,
} from '@nestjs/common';
import * as bcrypt from 'bcrypt';
import { CreateUserDto } from '../auth/dto/create-user.dto';
import { JwtPayload } from '../auth/jwt-payload.interface';

@EntityRepository(User)
export class UserRepository extends Repository<User> {
  private readonly logger = new Logger(UserRepository.name);
  async signUp(createUserDto: CreateUserDto): Promise<void> {
    const { username, password, lastName, firstName, email } = createUserDto;

    const user = new User();
    user.username = username;
    user.password = await UserRepository.hashPassword(password, 10);
    user.lastName = lastName;
    user.firstName = firstName;
    user.email = email;
    // TODO: implement role auth
    // user.role = role;

    try {
      await user.save();
    } catch (e) {
      if (e.code === 'SQLITE_CONSTRAINT') {
        throw new ConflictException('That email or username already exists');
      } else {
        throw new InternalServerErrorException();
      }
    }
  }

  async validateUserPassword(
    authCredentials: AuthCredentialsDto,
  ): Promise<JwtPayload> {
    const { username, password } = authCredentials;
    const user = await this.findOne({ username });

    if (user && (await user.validatePassword(password))) {
      return { username: user.username };
    }
    return null;
  }

  private static async hashPassword(
    password: string,
    rounds: number,
  ): Promise<string> {
    return await bcrypt.hash(password, rounds);
  }
}
