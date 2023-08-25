import {
  Body,
  Controller,
  Delete,
  Get,
  Param,
  Post,
  Put,
} from '@nestjs/common';
import {
  CreatePasienDto,
  UpdatePasienDto,
} from 'src/entities/dtos/pasien/pasien.dto';
import { IPasienDelivery } from 'src/interfaces/deliveries/pasien.delivery.interface';

@Controller('pasien')
export class PasienController {
  constructor(private readonly pasien_delivery: IPasienDelivery) {}
  @Get()
  async getPasiens(): Promise<any> {
    const [box, error] = await this.pasien_delivery.getAllPasien();
    if (error != null) {
      throw error;
    }
    return box;
  }

  @Post()
  async createPasien(@Body() data: CreatePasienDto): Promise<any> {
    const [box, error] = await this.pasien_delivery.createPasien(data);
    if (error != null) {
      throw error;
    }
    return box;
  }

  @Delete(':id')
  async deletePasien(@Param('id') id: string): Promise<any> {
    const [box, error] = await this.pasien_delivery.deletePasien({ id: id });
    if (error) {
      throw error;
    }
    return box;
  }

  @Put(':id')
  async updatePasien(
    @Param('id') id: string,
    @Body() data: UpdatePasienDto,
  ): Promise<any> {
    const [box, error] = await this.pasien_delivery.updatePasien(
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
