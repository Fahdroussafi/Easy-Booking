import { Controller, Post, Body } from '@nestjs/common';
import { SignupDto, SigninDto } from './dto/auth.dto';
import { AuthService } from './auth.service';

@Controller('auth')
export class AuthController {
  constructor(private authService: AuthService) {}
  @Post('signup')
  signUp(@Body() dto: SignupDto) {
    return this.authService.signUp(dto);
  }

  @Post('signin')
  signIn(@Body() dto: SigninDto) {
    return this.authService.signIn(dto);
  }
}
