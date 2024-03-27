import { Controller, Post, Body } from '@nestjs/common';
import { SignupDto, SigninDto } from './dto/auth.dto';
import { ApiTags, ApiBearerAuth } from '@nestjs/swagger';
import { AuthService } from './auth.service';
import { Public } from 'src/common/decorators/Public';

@ApiBearerAuth('Autorization')
@ApiTags('auth')
@Controller('auth')
export class AuthController {
  constructor(private readonly authService: AuthService) {}

  @Public()
  @Post('signup')
  signUp(@Body() dto: SignupDto) {
    return this.authService.signUp(dto);
  }

  @Public()
  @Post('signin')
  signIn(@Body() dto: SigninDto) {
    return this.authService.signIn(dto);
  }
}
