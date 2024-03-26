import {
  Body,
  Controller,
  InternalServerErrorException,
  Logger,
  Post,
  UseGuards,
} from '@nestjs/common';
import { ApiBody, ApiTags, ApiResponse } from '@nestjs/swagger';
import { loginUserDto } from '../auth/dto/user-login.dto';
import { AuthService } from '../auth/auth.service';
import { LoginAuthGuard } from './guards/login-auth.guard';
import { UsersLoginEntity } from './entities/user-login-entity';
import { LoginService } from '../login/login.service';
import { AmountLoginDTO } from '../login/dto/login.dto';

@Controller('auth')
@ApiTags('auth')
export class AuthController {
  private readonly logger = new Logger(AuthController.name);
  constructor(
    private readonly authService: AuthService,
    private readonly loginService: LoginService,
  ) {}

  @Post('login')
  @UseGuards(LoginAuthGuard)
  @ApiBody({
    type: loginUserDto,
  })
  @ApiResponse({
    status: 200,
    type: UsersLoginEntity,
  })
  async loginUser(
    @Body() body: loginUserDto,
    payload: AmountLoginDTO = { amountLogin: 1 },
  ) {
    const { email, password } = body;
    try {
      const auth = await this.authService.loginUser(email, password);
      if (auth) {
        await this.loginService.updateAmountLogin(payload);
      }
      return auth;
    } catch (e) {
      throw new InternalServerErrorException({
        message: e?.message ?? e,
      });
    }
  }
}
