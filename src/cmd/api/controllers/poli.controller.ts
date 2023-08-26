import {
  Body,
  Controller,
  Delete,
  Get,
  Param,
  Post,
  Put,
  Query,
} from '@nestjs/common';
import { CreatePoliObatDto } from 'src/entities/dtos/poli-obat/poli-obat.dto';
import { ObatPasienDto } from 'src/entities/dtos/poli-pasien-obat/poli-pasien-obat.dto';
import { TindakanPasienDto } from 'src/entities/dtos/poli-pasien-tindakan/poli-pasien-tindakan.dto';
import {
  AssignDokterIdDto,
  CreatePoliPasienDto,
  FilterPoliPasienBy,
} from 'src/entities/dtos/poli-pasien/poli-pasien.dto';
import { CreatePoliTindakanDto } from 'src/entities/dtos/poli-tindakan/poli-tindakan.dto';
import {
  CreatePoliUserDto,
  FilterPoliUser,
} from 'src/entities/dtos/poli-user/poli-user.dto';
import { CreatePoliDto, UpdatePoliDto } from 'src/entities/dtos/poli/poli.dto';
import { IPoliObatDelivery } from 'src/interfaces/deliveries/poli-obat.delivery.interface';
import { IPoliPasienObatDelivery } from 'src/interfaces/deliveries/poli-pasien-obat.delivery.interface';
import { IPoliPasienTindakanDelivery } from 'src/interfaces/deliveries/poli-pasien-tindakan.delivery.interface';
import { IPoliPasienDelivery } from 'src/interfaces/deliveries/poli-pasien.delivery.interface';
import { IPoliTindakanDelivery } from 'src/interfaces/deliveries/poli-tindakan.delivery.interface';
import { IPoliUserDelivery } from 'src/interfaces/deliveries/poli-user.delivery.interface';
import { IPoliDelivery } from 'src/interfaces/deliveries/poli.delivery.interface';

@Controller('poli')
export class PoliController {
  constructor(
    private readonly poli_delivery: IPoliDelivery,
    private readonly poli_obat_delivery: IPoliObatDelivery,
    private readonly poli_pasien_delivery: IPoliPasienDelivery,
    private readonly poli_tindakan_delivery: IPoliTindakanDelivery,
    private readonly poli_user_delivery: IPoliUserDelivery,
    private readonly poli_pasien_tindakan_delivery: IPoliPasienTindakanDelivery,
    private readonly poli_pasien_obat_delivery: IPoliPasienObatDelivery,
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
  async getAllPasien(
    @Param('id') id: string,
    @Query() filter: FilterPoliPasienBy,
  ): Promise<any> {
    const [box, error] = await this.poli_pasien_delivery.getAllPasien({
      poli_id: id,
      ...filter,
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

  @Get(':id/pasien/:pasien_id/dokter')
  async getPasienDokter(
    @Param('id') id: string,
    @Param('pasien_id') pasien_id: string,
  ): Promise<any> {
    const [box, error] = await this.poli_pasien_delivery.getCurrentDokter({
      poli_id: id,
      pasien_id: pasien_id,
    });
    if (error != null) {
      throw error;
    }
    return box;
  }

  @Post(':id/pasien/:pasien_id/dokter')
  async assignPasienDokter(
    @Param('id') id: string,
    @Param('pasien_id') pasien_id: string,
    @Body() assign: AssignDokterIdDto,
  ): Promise<any> {
    const [box, error] = await this.poli_pasien_delivery.assignDokter({
      poli_id: id,
      pasien_id: pasien_id,
      dokter_id: assign.dokter_id,
    });
    if (error != null) {
      throw error;
    }
    return box;
  }

  @Get(':id/pasien/:pasien_id/tindakan')
  async getResepTindakan(
    @Param('id') id: string,
    @Param('pasien_id') pasien_id: string,
  ): Promise<any> {
    const [box, error] =
      await this.poli_pasien_tindakan_delivery.getAllTindakan({
        poli_id: id,
        pasien_id: pasien_id,
      });
    if (error != null) {
      throw error;
    }
    return box;
  }

  @Post(':id/pasien/:pasien_id/tindakan')
  async addTindakan(
    @Param('id') id: string,
    @Param('pasien_id') pasien_id: string,
    @Body() tindakan: TindakanPasienDto,
  ): Promise<any> {
    const [box, error] = await this.poli_pasien_tindakan_delivery.addTindakan({
      poli_id: id,
      pasien_id: pasien_id,
      tindakan_id: tindakan.tindakan_id,
    });
    if (error != null) {
      throw error;
    }
    return box;
  }

  @Delete(':id/pasien/:pasien_id/tindakan/:tindakan_id')
  async removeTindakan(
    @Param('id') id: string,
    @Param('pasien_id') pasien_id: string,
    @Param('tindakan_id') tindakan_id: string,
  ): Promise<any> {
    const [box, error] =
      await this.poli_pasien_tindakan_delivery.removeTindakan({
        poli_id: id,
        pasien_id: pasien_id,
        tindakan_id: tindakan_id,
      });
    if (error != null) {
      throw error;
    }
    return box;
  }

  @Get(':id/pasien/:pasien_id/obat')
  async getResepObat(
    @Param('id') id: string,
    @Param('pasien_id') pasien_id: string,
  ): Promise<any> {
    const [box, error] = await this.poli_pasien_obat_delivery.getAllObat({
      poli_id: id,
      pasien_id: pasien_id,
    });
    if (error != null) {
      throw error;
    }
    return box;
  }

  @Post(':id/pasien/:pasien_id/obat')
  async addObat(
    @Param('id') id: string,
    @Param('pasien_id') pasien_id: string,
    @Body() obat: ObatPasienDto,
  ): Promise<any> {
    const [box, error] = await this.poli_pasien_obat_delivery.addObat({
      poli_id: id,
      pasien_id: pasien_id,
      obat_id: obat.obat_id,
    });
    if (error != null) {
      throw error;
    }
    return box;
  }

  @Delete(':id/pasien/:pasien_id/obat/:obat_id')
  async removeObat(
    @Param('id') id: string,
    @Param('pasien_id') pasien_id: string,
    @Param('obat_id') obat_id: string,
  ): Promise<any> {
    const [box, error] = await this.poli_pasien_obat_delivery.removeObat({
      poli_id: id,
      pasien_id: pasien_id,
      obat_id: obat_id,
    });
    if (error != null) {
      throw error;
    }
    return box;
  }

  @Get(':id/user')
  async getAllUser(
    @Param('id') id: string,
    @Query() filter: FilterPoliUser,
  ): Promise<any> {
    const [box, error] = await this.poli_user_delivery.getUser(
      {
        poli_id: id,
      },
      filter.status,
    );
    if (error != null) {
      throw error;
    }
    return box;
  }

  @Post(':id/user')
  async createUserPoli(
    @Param('id') id: string,
    @Body() create: CreatePoliUserDto,
  ): Promise<any> {
    const [box, error] = await this.poli_user_delivery.addPoliUser({
      ...create,
      poli_id: id,
    });
    if (error != null) {
      throw error;
    }
    return box;
  }

  @Delete(':id/user/:user_id')
  async removeUserPoli(
    @Param('id') id: string,
    @Param('user_id') user_id: string,
  ): Promise<any> {
    const [box, error] = await this.poli_user_delivery.removePoliUser({
      poli_id: id,
      user_id: user_id,
    });
    if (error != null) {
      throw error;
    }
    return box;
  }

  @Get(':id/tindakan')
  async getAllTindakan(@Param('id') id: string): Promise<any> {
    const [box, error] = await this.poli_tindakan_delivery.getAllTindakan({
      poli_id: id,
    });
    if (error != null) {
      throw error;
    }
    return box;
  }

  @Post(':id/tindakan')
  async createTindakanPoli(
    @Param('id') id: string,
    @Body() create: CreatePoliTindakanDto,
  ): Promise<any> {
    const [box, error] = await this.poli_tindakan_delivery.createNewTindakan({
      ...create,
      poli_id: id,
    });
    if (error != null) {
      throw error;
    }
    return box;
  }
}
