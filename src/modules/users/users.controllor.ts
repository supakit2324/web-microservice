import {
  Body,
  Controller,
  Get,
  InternalServerErrorException,
  Logger,
  Post,
  Put,
  UseGuards,
} from '@nestjs/common';
import { ApiBody, ApiTags, ApiBearerAuth, ApiResponse } from '@nestjs/swagger';
import { UsersService } from './users.service';
import { createUserDto } from './dto/create-users.dto';
import { JwtAuthGuard } from '../auth/guards/jwt-auth.guard';
import { userEntyty } from './entities/user.entity';
import ReqUser from 'src/decorators/req-user.decorator';
import { usersInterface } from './interfaces/users.interface';
import { changePasswordDto } from './dto/change-password.dto';
import { ChangePasswordUserValidationPipe } from './pipes/change-password-user-validation.pipe';
import { ChangePasswordEntyty } from './entities/change-password.entity';
import { updateUserDto } from './dto/update-user.dto';
import { updateUserEntyty } from './entities/update-user.entity';
import { UseRoles } from 'src/decorators/role.decorator';
import { rolesUserEnum } from './enum/roles-user.enum';
import { registerUserValidationPipe } from './pipes/register-user-validation.pipe';
import { JwtRoleGuard } from '../auth/guards/jwt-role.guard';

@Controller('users')
@ApiTags('user')
export class UsersController {
  private readonly logger = new Logger(UsersController.name);
  constructor(private readonly usersService: UsersService) {}

  @Post('register')
  @ApiBody({
    type: createUserDto,
  })
  async createUser(
    @Body(registerUserValidationPipe) body: createUserDto,
  ): Promise<void> {
    try {
      await this.usersService.registerUser(body);
    } catch (e) {
      this.logger.error(
        `catch on changePassword: ${e?.message ?? JSON.stringify(e)}`,
      );
      throw new InternalServerErrorException({
        message: e?.message ?? e,
      });
    }
  }

  @Get('me')
  @ApiBearerAuth()
  @UseRoles(rolesUserEnum.USER, rolesUserEnum.ADMIN)
  @UseGuards(JwtAuthGuard, JwtRoleGuard)
  async getMe(@ReqUser() user: usersInterface): Promise<userEntyty> {
    return user;
  }

  @Put('update')
  @ApiBody({
    type: updateUserDto,
  })
  @ApiBearerAuth()
  @UseRoles(rolesUserEnum.USER, rolesUserEnum.ADMIN)
  @UseGuards(JwtAuthGuard, JwtRoleGuard)
  @ApiResponse({
    status: 200,
    type: updateUserEntyty,
  })
  async updateUser(
    @ReqUser() user: usersInterface,
    @Body() update: updateUserDto,
  ): Promise<void> {
    try {
      await this.usersService.updateUser(user.userId, update);
    } catch (e) {
      this.logger.error(
        `catch on changePassword: ${e?.message ?? JSON.stringify(e)}`,
      );
      throw new InternalServerErrorException({
        message: e?.message ?? e,
      });
    }
  }

  @Put('change-password')
  @ApiBody({
    type: changePasswordDto,
  })
  @ApiBearerAuth()
  @UseRoles(rolesUserEnum.USER, rolesUserEnum.ADMIN)
  @UseGuards(JwtAuthGuard, JwtRoleGuard)
  @ApiResponse({
    status: 200,
    type: ChangePasswordEntyty,
  })
  async changePassword(
    @ReqUser() user: usersInterface,
    @Body(ChangePasswordUserValidationPipe) body: changePasswordDto,
  ): Promise<void> {
    try {
      await this.usersService.changePasswordUser(
        user.userId,
        body.hashPassword,
      );
    } catch (e) {
      this.logger.error(
        `catch on changePassword: ${e?.message ?? JSON.stringify(e)}`,
      );
      throw new InternalServerErrorException({
        message: e?.message ?? e,
      });
    }
  }
}
