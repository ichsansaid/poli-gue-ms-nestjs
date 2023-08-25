import {
  Body,
  Controller,
  Delete,
  Get,
  Param,
  Post,
  Put,
  UseGuards,
} from '@nestjs/common';
import {
  CreateUserDto,
  EnumUserType,
  UpdateUserDto,
} from 'src/entities/dtos/user/user.dto';
import { IUserDelivery } from 'src/interfaces/deliveries/user.delivery.interface';
import { AuthGuard } from '../guards/auth.guard';
import { RoleGuard, Roles } from '../guards/role.guard';

@Controller('users')
export class UserController {
  constructor(private readonly user_delivery: IUserDelivery) {}

  @Get()
  @Roles(EnumUserType.DOKTER)
  @UseGuards(AuthGuard, RoleGuard)
  async getUsers(): Promise<any> {
    const [box, error] = await this.user_delivery.inquiry({});
    if (error != null) {
      throw error;
    }
    return box;
  }

  @Post()
  async createUser(@Body() data: CreateUserDto): Promise<any> {
    const [box, error] = await this.user_delivery.createUser(data);
    if (error != null) {
      throw error;
    }
    return box;
  }

  @Delete(':id')
  async deleteUser(@Param('id') id: string): Promise<any> {
    const [box, error] = await this.user_delivery.deleteUser({ id: id });
    if (error) {
      throw error;
    }
    return box;
  }

  @Put(':id')
  async updateUser(
    @Param('id') id: string,
    @Body() data: UpdateUserDto,
  ): Promise<any> {
    const [box, error] = await this.user_delivery.updateUser(
      {
        id: id,
      },
      data,
    );
    if (error != null) {
      throw error;
    }
    return box;
  }
}
