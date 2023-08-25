import {
  Body,
  Controller,
  Delete,
  Get,
  Param,
  Post,
  Put,
} from '@nestjs/common';
import { CreateObatDto, UpdateObatDto } from 'src/entities/dtos/obat/obat.dto';
import { IObatDelivery } from 'src/interfaces/deliveries/obat.delivery.interface';

@Controller('obat')
export class ObatController {
  constructor(private readonly obat_delivery: IObatDelivery) {}
  @Get()
  async getObats(): Promise<any> {
    const [box, error] = await this.obat_delivery.getAllObat();
    if (error != null) {
      throw error;
    }
    return box;
  }

  @Post()
  async createObat(@Body() data: CreateObatDto): Promise<any> {
    const [box, error] = await this.obat_delivery.createObat(data);
    if (error != null) {
      throw error;
    }
    return box;
  }

  @Delete(':id')
  async deleteObat(@Param('id') id: string): Promise<any> {
    const [box, error] = await this.obat_delivery.deleteObat({ id: id });
    if (error) {
      throw error;
    }
    return box;
  }

  @Put(':id')
  async updateObat(
    @Param('id') id: string,
    @Body() data: UpdateObatDto,
  ): Promise<any> {
    const [box, error] = await this.obat_delivery.updateObat(
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
