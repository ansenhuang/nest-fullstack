import { Controller, Get, Post, Body, Patch, Delete, Param, Query } from '@nestjs/common';
import { FieldService } from './field.service';
import { CreateFieldDto } from './dto/create-entity.dto';
import { UpdateFieldDto } from './dto/update-entity.dto';

@Controller('field')
export class FieldController {
  constructor(private readonly fieldService: FieldService) {}

  @Post()
  create(@Body() createFieldDto: CreateFieldDto) {
    return this.fieldService.create(createFieldDto);
  }

  @Get()
  findAll(@Query() query) {
    return this.fieldService.findAll(query);
  }

  @Get(':id')
  findOne(@Param('id') id: string) {
    return this.fieldService.findOne(+id);
  }

  @Patch(':id')
  update(@Param('id') id: string, @Body() updateFieldDto: UpdateFieldDto) {
    return this.fieldService.update(+id, updateFieldDto);
  }

  @Delete(':id')
  remove(@Param('id') id: string) {
    return this.fieldService.remove(+id);
  }
}
