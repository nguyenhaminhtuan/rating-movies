import {
  ConflictException,
  ForbiddenException,
  Injectable,
  Logger,
  UnauthorizedException,
} from '@nestjs/common';
import { JwtService } from '@nestjs/jwt';
import { User } from '../users/user.entity';
import { SignUpDto } from './dto/signup.dto';
import { SignInDto } from './dto/signin.dto';
import { UsersService } from '../users/users.service';
import { JwtPayload } from './interfaces/payload.interface';
import { UserStatus } from '../users/users.enum';

@Injectable()
export class AuthService {
  private readonly logger = new Logger(AuthService.name);

  constructor(
    private usersService: UsersService,
    private jwtService: JwtService,
  ) {}

  async signUp(signUpDto: SignUpDto): Promise<User> {
    const { email, password, fullName } = signUpDto;
    const isExisted = await this.usersService.findByEmail(email);

    if (isExisted) {
      throw new ConflictException('Email already taken');
    }

    const user = await this.usersService.create({
      email,
      password,
      fullName,
    });
    this.logger.debug({ user });

    return user;
  }

  async signIn(
    signInDto: SignInDto,
  ): Promise<{ tokenType: string; accessToken: string }> {
    const { email, password } = signInDto;
    const user = await this.usersService.findByEmail(email);

    if (!user) {
      throw new UnauthorizedException('Email or password incorrect');
    }

    const isMatched = await user.comparePassword(password);

    if (!isMatched) {
      throw new UnauthorizedException('Email or password incorrect');
    }

    if (user.status === UserStatus.Deactive) {
      throw new ForbiddenException('User has been deactived');
    }

    const payload: JwtPayload = { email: user.email, role: user.role };
    this.logger.log(`User ${user.id} logged in`);

    return {
      tokenType: 'Bearer',
      accessToken: this.jwtService.sign(payload, { subject: user.id }),
    };
  }
}
