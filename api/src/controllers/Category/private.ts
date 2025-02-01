import {
    Controller, Get, Param, Body, UseInterceptors, Delete, Post, UploadedFile, ValidationPipe, Patch, UseGuards,
} from '@nestjs/common';
import {
    ApiBadRequestResponse, ApiBody, ApiNotFoundResponse, ApiOkResponse, ApiOperation, ApiTags,
} from '@nestjs/swagger';
import { FileInterceptor } from '@nestjs/platform-express';
import { DeleteResult, UpdateResult } from 'typeorm';

import { CategoryEntity } from '@entities/Category';
import { FSService } from '@services/FS';
import NotFoundInterceptor from '@interceptors/UndefinedResult';
import AffectedResultInterceptor from '@interceptors/AffectedResult';
import CategoryPrivateService from '@services/Category/private';
import { CategoryCreateDTO, CategoryUpdateDTO } from '@dto/Category/private';
import { CategoryI, CategoryPreviewI } from '@interfaces/Category';
import { AuthJWTAccessGuard } from '@guards/Auth';
import { UserRoleDecorator } from '@decorators/UserRole';
import { UserRoleGuard } from '@guards/UserRole';
import { UserRole } from '@enums/User';

@Controller('adm/category')
@UseGuards(AuthJWTAccessGuard, UserRoleGuard)
@ApiTags('Category 🤵🏿‍♂️')
export default class CategoryPrivateController {
    constructor(private readonly categoryService: CategoryPrivateService) { }

    @Post()
    @UserRoleDecorator(UserRole.ADMIN)
    @UseInterceptors(FileInterceptor('icon', { fileFilter: FSService.fileFilterOption('svg') }))
    @ApiOperation({ summary: 'add new category' })
    @ApiBadRequestResponse({ description: 'some of fields are unique' })
    private addCategory(
        @Body(new ValidationPipe({ transform: true })) body: CategoryCreateDTO,
        @UploadedFile() icon: Express.Multer.File,
    ): Promise<CategoryI> {
        return this.categoryService.createCategory(body, icon);
    }

    @Patch(':categoryID')
    @UserRoleDecorator(UserRole.ADMIN)
    @UseInterceptors(FileInterceptor('icon', { fileFilter: FSService.fileFilterOption('svg') }))
    @UseInterceptors(AffectedResultInterceptor('category not found'))
    @ApiOperation({ summary: 'update category' })
    @ApiBody({ type: CategoryUpdateDTO })
    updateCategory(
        @Param('categoryID') categoryID: number,
        @Body(new ValidationPipe({ transform: true })) updates: CategoryUpdateDTO,
        // @UploadedFile() icon: Express.Multer.File,
    ): Promise<UpdateResult> {
        return this.categoryService.updateCategory(categoryID, updates);
    }

    @Get('list')
    @UserRoleDecorator(UserRole.SUPPORT)
    @ApiOperation({ summary: 'get all categories' })
    @ApiOkResponse({ type: CategoryEntity, isArray: true })
    private getAllCategories(): Promise<CategoryPreviewI[]> {
        return this.categoryService.getCategoryList();
    }

    @Get(':categoryURL')
    @UserRoleDecorator(UserRole.SUPPORT)
    @UseInterceptors(NotFoundInterceptor)
    @ApiOperation({ summary: 'get category by URL' })
    @ApiOkResponse({ type: CategoryEntity, isArray: true })
    @ApiNotFoundResponse({ description: 'category not found' })
    private getCategory(@Param('categoryURL') categoryUrl: string): Promise<CategoryI | null> {
        return this.categoryService.getCategory(categoryUrl);
    }

    @Delete(':categoryID')
    @UserRoleDecorator(UserRole.ADMIN)
    @UseInterceptors(AffectedResultInterceptor('category not found'))
    @ApiOperation({ summary: 'delete category by ID' })
    @ApiOkResponse({ description: 'success' })
    @ApiNotFoundResponse({ description: 'category not found' })
    private deleteCategory(@Param('categoryID') categoryID: number): Promise<DeleteResult> {
        return this.categoryService.deleteCategory(categoryID);
    }
}
