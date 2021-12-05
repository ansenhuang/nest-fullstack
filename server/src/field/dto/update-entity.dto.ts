import { PartialType } from '@nestjs/mapped-types';
import { CreateFieldDto } from './create-entity.dto';

export class UpdateFieldDto extends PartialType(CreateFieldDto) {}
