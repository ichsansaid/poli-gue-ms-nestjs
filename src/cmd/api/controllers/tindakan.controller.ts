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
  CreateTindakanDto,
  UpdateTindakanDto,
} from 'src/entities/dtos/tindakan/tindakan.dto';
import { ITindakanDelivery } from 'src/interfaces/deliveries/tindakan.delivery.interface';

@Controller('tindakan')
export class TindakanController {
  constructor(private readonly tindakan_delivery: ITindakanDelivery) {}
  @Get()
  async getTindakans(): Promise<any> {
    const [box, error] = await this.tindakan_delivery.getAllTindakan();
    if (error != null) {
      throw error;
    }
    return box;
  }

  @Post()
  async createTindakan(@Body() data: CreateTindakanDto): Promise<any> {
    const [box, error] = await this.tindakan_delivery.createTindakan(data);
    if (error != null) {
      throw error;
    }
    return box;
  }

  @Delete(':id')
  async deleteTindakan(@Param('id') id: string): Promise<any> {
    const [box, error] = await this.tindakan_delivery.deleteTindakan({
      id: id,
    });
    if (error) {
      throw error;
    }
    return box;
  }

  @Put(':id')
  async updateTindakan(
    @Param('id') id: string,
    @Body() data: UpdateTindakanDto,
  ): Promise<any> {
    const [box, error] = await this.tindakan_delivery.updateTindakan(
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
