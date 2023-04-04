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
import { ApiBadRequestResponse, ApiNotFoundResponse, ApiOkResponse, ApiOperation, ApiTags } from '@nestjs/swagger';
import { FileInterceptor } from '@nestjs/platform-express';
import { DeleteResult } from 'typeorm';

import { CategoryEntity } from '@entities/Category';
import { CreateCategoryDTO } from '@dto/Category';
import { FSService } from '@services/FS';
import UndefinedResultInterceptor from '@interceptors/UndefinedResult';
import AffectedResultInterceptor from '@interceptors/AffectedResult';
import CategoryPrivateService from '@services/Category/private';

@Controller('adm/category')
@ApiTags('Category 🤵🏿‍♂️')
export default class CategoryPrivateController {
    constructor(private readonly categoryService: CategoryPrivateService) {}

    @Post()
    @UseInterceptors(FileInterceptor('icon', { fileFilter: FSService.fileFilterOption('svg') }))
    @ApiOperation({ summary: 'add new category' })
    @ApiBadRequestResponse({ description: 'some of fields are unique' })
    private addCategory(
        @Body(new ValidationPipe({ transform: true })) body: CreateCategoryDTO,
        @UploadedFile() icon: Express.Multer.File,
    ): Promise<CategoryEntity> {
        return this.categoryService.createCategory(body, icon);
    }

    // @Patch(':categoryID')
    // @UseInterceptors(FileInterceptor('icon', { fileFilter: FSService.fileFilterOption('svg') }))
    // @UseInterceptors(AffectedResultInterceptor('category not found'))
    // @ApiOperation({ summary: 'update category' })
    // @ApiBadRequestResponse({ description: 'some of fields are unique' })
    // updateCategory(
    //     @Param('categoryID') categoryID: number,
    //     @Body(new ValidationPipe({ transform: true })) body: CreateCategoryDTO,
    //     @UploadedFile() icon: Express.Multer.File,
    // ): Promise<UpdateResult> {
    //     return this.categoryService.updateCategory(categoryID, body, icon);
    // }

    @Get('list')
    @ApiOperation({ summary: 'get all categories' })
    @ApiOkResponse({ type: CategoryEntity, isArray: true })
    private getAllCategories(): Promise<CategoryEntity[]> {
        return this.categoryService.getCategoryList();
    }

    @Get(':categoryURL')
    @UseInterceptors(UndefinedResultInterceptor)
    @ApiOperation({ summary: 'get category info by URL' })
    @ApiOkResponse({ type: CategoryEntity, isArray: true })
    @ApiNotFoundResponse({ description: 'category not found' })
    private getCategory(@Param('categoryURL') categoryURL: string): Promise<CategoryEntity> {
        return this.categoryService.getCategory(categoryURL);
    }

    @Delete(':categoryID')
    @UseInterceptors(AffectedResultInterceptor('category not found'))
    @ApiOperation({ summary: 'delete category by ID' })
    @ApiOkResponse({ description: 'success' })
    @ApiNotFoundResponse({ description: 'category not found' })
    private deleteCategory(@Param('categoryID') categoryID: number): Promise<DeleteResult> {
        return this.categoryService.deleteCategory(categoryID);
    }
}
