import { Body, Controller, Delete, Get, Param, Post, UseInterceptors, ValidationPipe } from '@nestjs/common';
import { ApiNotFoundResponse, ApiOperation, ApiResponse, ApiTags } from '@nestjs/swagger';
import { DeleteResult } from 'typeorm';

import { CreateLabelDTO } from '@dto/Label';
import { LabelEntity } from '@entities/Label';
import { LabelService } from '@services/Label';
import { AffectedInterceptor } from '@interceptors/responce';
import { ILabel } from '@interfaces/Label';

@Controller('adm/label')
@ApiTags('Label (admin)')
export class LabelAdminController {
    constructor(private readonly labelService: LabelService) {}

    @Post()
    @ApiOperation({ summary: 'create new label' })
    createLabel(@Body(new ValidationPipe({ transform: true })) body: CreateLabelDTO): Promise<void> {
        return this.labelService.createLabel(body);
    }

    @Get('list')
    @ApiOperation({ summary: 'get all labels' })
    @ApiResponse({ type: LabelEntity, isArray: true })
    getAllLabels(): Promise<ILabel[]> {
        return this.labelService.getAllLabels();
    }

    @Delete(':label')
    @UseInterceptors(AffectedInterceptor)
    @ApiOperation({ summary: 'delete label by ID' })
    @ApiNotFoundResponse()
    deleteLabel(@Param('label') label: number): Promise<DeleteResult> {
        return this.labelService.deleteLabel(label);
    }
}
