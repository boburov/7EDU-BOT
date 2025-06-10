import { PartialType } from '@nestjs/mapped-types';
import { CreateTelegrammDto } from './create-telegramm.dto';

export class UpdateTelegrammDto extends PartialType(CreateTelegrammDto) {}
