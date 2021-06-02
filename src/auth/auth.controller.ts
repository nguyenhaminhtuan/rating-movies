import {
  Body,
  ClassSerializerInterceptor,
  Controller,
  Get,
  HttpCode,
  Post,
  UseInterceptors,
} from '@nestjs/common';
import { AuthService } from './auth.service';
import { UsersService } from '../users/users.service';
import { SignInDto } from './dto/signin.dto';
import { SignUpDto } from './dto/signup.dto';
import { Auth } from '../common/decorators/auth.decorator';
import { CurrentUser } from '../common/decorators/current-user.decorator';
import { ApiResponse } from '../common/dto/response.dto';
import { User } from '../users/user.entity';

@UseInterceptors(ClassSerializerInterceptor)
@Controller('auth')
export class AuthController {
  constructor(
    private authService: AuthService,
    private usersService: UsersService,
  ) {}

  @Post('signup')
  async signUp(@Body() signUpDto: SignUpDto): Promise<ApiResponse<User>> {
    const response = await this.authService.signUp(signUpDto);

    return new ApiResponse(response);
  }

  @HttpCode(200)
  @Post('signin')
  async ignIn(
    @Body() signInDto: SignInDto,
  ): Promise<ApiResponse<{ tokenType: string; accessToken: string }>> {
    const response = await this.authService.signIn(signInDto);

    return new ApiResponse(response);
  }

  @Auth()
  @Get('me')
  async getCurrentUser(
    @CurrentUser('id') userId: string,
  ): Promise<ApiResponse<User>> {
    const me = await this.usersService.findById(userId);

    return new ApiResponse(me);
  }
}
