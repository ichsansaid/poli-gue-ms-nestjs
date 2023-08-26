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
import { CreatePoliPasienDto } from 'src/entities/dtos/poli-pasien/poli-pasien.dto';
import { CreatePoliDto, UpdatePoliDto } from 'src/entities/dtos/poli/poli.dto';
import { IPoliObatDelivery } from 'src/interfaces/deliveries/poli-obat.delivery.interface';
import { IPoliPasienDelivery } from 'src/interfaces/deliveries/poli-pasien.delivery.interface';
import { IPoliDelivery } from 'src/interfaces/deliveries/poli.delivery.interface';

@Controller('poli')
export class PoliController {
  constructor(
    private readonly poli_delivery: IPoliDelivery,
    private readonly poli_obat_delivery: IPoliObatDelivery,
    private readonly poli_pasien_delivery: IPoliPasienDelivery,
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

  @Get(':id/pasien')
  async getAllPasien(@Param('id') id: string): Promise<any> {
    const [box, error] = await this.poli_pasien_delivery.getAllPasien({
      poli_id: id,
    });
    if (error != null) {
      throw error;
    }
    return box;
  }

  @Post(':id/pasien')
  async createPasienPoli(
    @Param('id') id: string,
    @Body() create: CreatePoliPasienDto,
  ): Promise<any> {
    const [box, error] = await this.poli_pasien_delivery.createNewPasien({
      ...create,
      poli_id: id,
    });
    if (error != null) {
      throw error;
    }
    return box;
  }
}
