import { Body, Controller, Delete, Get, Param, Post, UseInterceptors, ValidationPipe } from "@nestjs/common";
import { ApiNotFoundResponse, ApiOperation, ApiResponse, ApiTags } from "@nestjs/swagger";
import { DeleteResult } from "typeorm";

import { CreateLabelDTO } from "./index.dto";
import { LabelEntity } from "./index.entity";
import { LabelService } from "./index.service";
import { AffectedInterceptor } from "@interceptors/DB";

@Controller('label')
@ApiTags('Label')
export class LabelController {
    constructor(private readonly labelService: LabelService) {}

    @Post()
    @ApiOperation({ summary: 'create new label' })
    createLabel(@Body(new ValidationPipe({ transform: true })) body: CreateLabelDTO) {
        this.labelService.createLabel(body);
    }

    @Get('list')
    @ApiOperation({ summary: 'get all labels' })
    @ApiResponse({ type: LabelEntity, isArray: true })
    getAllLabels(): Promise<LabelEntity[]> {
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
