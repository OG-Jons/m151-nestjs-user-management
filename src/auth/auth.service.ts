import { Injectable, Logger, UnauthorizedException } from '@nestjs/common';
import { UserRepository } from '../user/user.repository';
import { InjectRepository } from '@nestjs/typeorm';
import { AuthCredentialsDto } from './dto/auth-credentials.dto';
import { JwtService } from '@nestjs/jwt';
import { JwtPayload } from './jwt-payload.interface';
import { CreateUserDto } from './dto/create-user.dto';

@Injectable()
export class AuthService {
  constructor(
    @InjectRepository(UserRepository)
    private userRepository: UserRepository,
    private jwtService: JwtService,
  ) {}

  async signUp(createUserDto: CreateUserDto): Promise<void> {
    return await this.userRepository.signUp(createUserDto);
  }

  async signIn(
    authCredentialsDto: AuthCredentialsDto,
  ): Promise<{ accessToken: string }> {
    const result = await this.userRepository.validateUserPassword(
      authCredentialsDto,
    );
    if (!result) {
      throw new UnauthorizedException('Invalid credentials');
    }

    const payload: JwtPayload = { username: result.username };
    const accessToken = this.jwtService.sign(payload);
    return { accessToken };
  }
}
