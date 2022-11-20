import {
    Controller,
    Get,
    Param,
    Body,
    UseInterceptors,
    Delete,
    Post,
    UploadedFile,
    ValidationPipe,
} from '@nestjs/common';
import {
    ApiCreatedResponse,
    ApiNotFoundResponse,
    ApiOkResponse,
    ApiOperation,
    ApiTags,
    OmitType,
} from '@nestjs/swagger';
import { FileInterceptor } from '@nestjs/platform-express';
import { DeleteResult } from 'typeorm';

import CategoryService from '@services/Category';
import { CategoryEntity } from '@entities/Category';
import { CreateCategoryDTO } from '@dto/Category';
import { FSService } from '@services/FS';
import { CategoryI } from '@interfaces/Category';
import UndefinedResultInterceptor from '@interceptors/UndefinedResult';
import AffectedResultInterceptor from '@interceptors/AffectedResult';

const TCategoryAdmin = OmitType(CategoryEntity, ['products']);

@Controller('adm/category')
@ApiTags('Category 🤵🏿‍♂️')
export default class CategoryAdminController {
    constructor(private readonly categoryService: CategoryService) {}

    @Post()
    @UseInterceptors(FileInterceptor('icon', { fileFilter: FSService.fileFilterOption('svg') }))
    @ApiOperation({ summary: 'add new category' })
    @ApiCreatedResponse({ description: 'success added' })
    addCategory(
        @Body(new ValidationPipe({ transform: true })) body: CreateCategoryDTO,
        @UploadedFile() icon: Express.Multer.File,
    ): Promise<void> {
        return this.categoryService.createCategory(body, icon);
    }

    @Get('list')
    @ApiOperation({ summary: 'get all categories' })
    @ApiOkResponse({ type: TCategoryAdmin, isArray: true })
    getAllCategories(): Promise<CategoryI[]> {
        return this.categoryService.getAdminCategories();
    }

    @Get(':category')
    @UseInterceptors(UndefinedResultInterceptor)
    @ApiOperation({ summary: 'get category info by URL' })
    @ApiOkResponse({ type: TCategoryAdmin })
    @ApiNotFoundResponse({ description: 'category not found' })
    getCategory(@Param('category') category: string): Promise<CategoryI> {
        return this.categoryService.getAdminCategory(category);
    }

    @Delete(':category')
    @UseInterceptors(AffectedResultInterceptor('category not found'))
    @ApiOperation({ summary: 'delete category by ID' })
    @ApiOkResponse({ description: 'success' })
    @ApiNotFoundResponse({ description: 'category not found' })
    deleteCategory(@Param('category') categoryId: number): Promise<DeleteResult> {
        return this.categoryService.deleteCategory(categoryId);
    }
}
