import { InquiryPoliPasienDto } from 'src/entities/dtos/poli-pasien/poli-pasien.dto';
import { IPoliPasienSchema } from 'src/interfaces/schemas/poli-pasien.schema.interface';
import { Repository } from 'typeorm';

export abstract class IPoliPasienRepository extends Repository<IPoliPasienSchema> {
  this: Repository<IPoliPasienSchema>;
  abstract findActivePasienBy(
    inquiry: InquiryPoliPasienDto,
  ): Promise<IPoliPasienSchema[]>;
  abstract findLatestPasienBy(
    inquiry: InquiryPoliPasienDto,
  ): Promise<IPoliPasienSchema>;
}
