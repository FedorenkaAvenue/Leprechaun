import {
    Controller, Get, Param, Body, UseInterceptors, Delete, Post, UploadedFile, ValidationPipe, Patch, UseGuards,
} from '@nestjs/common';
import {
    ApiBadRequestResponse, ApiBody, ApiNotFoundResponse, ApiOkResponse, ApiOperation, ApiTags,
} from '@nestjs/swagger';
import { FileInterceptor } from '@nestjs/platform-express';
import { DeleteResult, UpdateResult } from 'typeorm';

import CategoryService from './category.service';
import { CategoryCreateDTO, CategoryUpdateDTO } from './category.dto';
import { CategoryPreviewI } from './category.interface';
import CategoryEntity from '@core/category/category.entity';
import { UserRole } from '@core/user/user.enum';
import { AuthJWTAccessGuard } from '@core/auth/auth.guard';
import { CategoryI } from '@core/category/category.interface';
import { UserRoleGuard } from '@core/user/user.guard';
import { UserRoleDecorator } from '@core/user/user.decorator';
import FSService from '@core/FS/FS.service';
import AffectedResultInterceptor from '@shared/interceptors/affectedResult.interceptor';
import NotFoundInterceptor from '@shared/interceptors/notFound.interceptor';

@Controller('category')
@UseGuards(AuthJWTAccessGuard, UserRoleGuard)
@ApiTags('Category')
export default class CategoryController {
    constructor(private readonly categoryService: CategoryService) { }

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
