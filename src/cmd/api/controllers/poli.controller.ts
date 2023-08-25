import {
  Body,
  Controller,
  Delete,
  Get,
  Param,
  Post,
  Put,
} from '@nestjs/common';
import { CreatePoliObatDto } from 'src/entities/dtos/poli-obat/poli-obat.dto';
import { CreatePoliDto, UpdatePoliDto } from 'src/entities/dtos/poli/poli.dto';
import { IPoliObatDelivery } from 'src/interfaces/deliveries/poli-obat.delivery.interface';
import { IPoliDelivery } from 'src/interfaces/deliveries/poli.delivery.interface';

@Controller('poli')
export class PoliController {
  constructor(
    private readonly poli_delivery: IPoliDelivery,
    private readonly poli_obat_delivery: IPoliObatDelivery,
  ) {}

  @Get()
  async getPolis(): Promise<any> {
    const [box, error] = await this.poli_delivery.inquiry({});
    if (error != null) {
      throw error;
    }
    return box;
  }

  @Post()
  async createPoli(@Body() data: CreatePoliDto): Promise<any> {
    const [box, error] = await this.poli_delivery.createPoli(data);
    if (error != null) {
      throw error;
    }
    return box;
  }

  @Delete(':id')
  async deletePoli(@Param('id') id: string): Promise<any> {
    const [box, error] = await this.poli_delivery.deletePoli({ id: id });
    if (error) {
      throw error;
    }
    return box;
  }

  @Put(':id')
  async updatePoli(
    @Param('id') id: string,
    @Body() data: UpdatePoliDto,
  ): Promise<any> {
    const [box, error] = await this.poli_delivery.updatePoli(
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

  @Get(':id/obat')
  async getAllObat(@Param('id') id: string): Promise<any> {
    const [box, error] = await this.poli_obat_delivery.getAllObat({
      poli_id: id,
    });
    if (error != null) {
      throw error;
    }
    return box;
  }

  @Post(':id/obat')
  async createObatPoli(
    @Param('id') id: string,
    @Body() create: CreatePoliObatDto,
  ): Promise<any> {
    const [box, error] = await this.poli_obat_delivery.createNewObat({
      ...create,
      poli_id: id,
    });
    if (error != null) {
      throw error;
    }
    return box;
  }
}
