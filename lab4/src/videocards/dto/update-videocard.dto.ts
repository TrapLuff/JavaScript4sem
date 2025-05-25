import { PartialType } from '@nestjs/mapped-types';
import { CreateVideocardDto } from './create-videocard.dto';

export class UpdateVideocardDto extends PartialType(CreateVideocardDto) {}