import {
  InquiryPoliPasienDto,
  PoliPasienStatus,
} from 'src/entities/dtos/poli-pasien/poli-pasien.dto';
import { IPoliPasienRepository } from 'src/interfaces/repositories/type-orm/poli-pasien.repository.interface';
import { IPoliPasienSchema } from 'src/interfaces/schemas/poli-pasien.schema.interface';
import { In, Not } from 'typeorm';

export const PoliPasienRepository: Pick<IPoliPasienRepository, any> = {
  async findActivePasienBy(
    inquiry: InquiryPoliPasienDto,
  ): Promise<IPoliPasienSchema[]> {
    const poli_pasien = await this.find({
      where: {
        ...inquiry,
        status: Not(In([PoliPasienStatus.CANCEL, PoliPasienStatus.DONE])),
      },
      take: 1,
    });
    return poli_pasien;
  },
  async findLatestPasienBy(
    inquiry: InquiryPoliPasienDto,
  ): Promise<IPoliPasienSchema> {
    const [poli_pasien] = await this.find({
      order: {
        arrived_at: 'DESC',
      },
      where: {
        pasien_id: inquiry.pasien_id,
        poli_id: inquiry.poli_id,
      },
      take: 1,
    });
    return poli_pasien;
  },
};
