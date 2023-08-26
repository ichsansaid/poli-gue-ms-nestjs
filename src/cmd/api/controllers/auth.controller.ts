import { Body, Controller, Post } from '@nestjs/common';
import { IAuthDelivery } from 'src/interfaces/deliveries/auth.delivery.interface';
import { LoginDto, TokenDto } from 'src/entities/dtos/auth/auth.dto';

@Controller('auth')
export class AuthController {
  constructor(private readonly user_delivery: IAuthDelivery) {}

  @Post('verify-token')
  async verifyToken(@Body() data: TokenDto): Promise<any> {
    const [box, error] = await this.user_delivery.verifyToken(data);
    if (error != null) {
      throw error;
    }
    return box;
  }

  @Post('generate-token')
  async generateToken(@Body() data: LoginDto): Promise<any> {
    const [box, error] = await this.user_delivery.login(data);
    if (error != null) {
      throw error;
    }
    return box;
  }
}
