import {
    Controller, Get, Param, Body, UseInterceptors, Post, UploadedFile, ValidationPipe, UseGuards, Patch, Delete,
} from '@nestjs/common';
import {
    ApiBadRequestResponse, ApiBody, ApiNotFoundResponse, ApiOkResponse, ApiOperation, ApiTags,
} from '@nestjs/swagger';
import { FileInterceptor } from '@nestjs/platform-express';

import CategoryService from '@common/category/category.service';
import { UserRoleGuard } from '@common/user/user.guard';
import { AuthJWTAccessGuard } from '@guards/auth.guard';
import { UserRoleDecorator } from '@common/user/user.decorator';
import { UserRole } from '@gen/user';
import { CategoryCUSchema, CategoryPreviewSchema, CategorySchema, CategoryUpdateSchema } from './category.schema';
import { Category } from '@gen/category';
import { Empty } from '@gen/google/protobuf/empty';
import { CategoryPreview } from '@gen/category_preview';

@Controller('category')
@UseGuards(AuthJWTAccessGuard, UserRoleGuard)
@ApiTags('Category')
export default class CategoryController {
    constructor(private readonly categoryService: CategoryService) { }

    @Post()
    @UserRoleDecorator(UserRole.ADMIN)
    @UseInterceptors(FileInterceptor('icon'))
    @ApiOperation({ summary: 'add new category' })
    @ApiBadRequestResponse({ description: 'some of fields are unique' })
    private addCategory(
        @Body(new ValidationPipe({ transform: true })) body: CategoryCUSchema,
        @UploadedFile() icon: Express.Multer.File,
    ): Promise<CategoryPreview> {
        return this.categoryService.createCategory(body, icon);
    }

    @Patch(':categoryID')
    @UserRoleDecorator(UserRole.ADMIN)
    @UseInterceptors(FileInterceptor('icon'))
    @ApiOperation({ summary: 'update category' })
    @ApiBody({ type: CategoryUpdateSchema })
    updateCategory(
        @Param('categoryID') categoryID: number,
        @Body(new ValidationPipe({ transform: true })) updates: CategoryUpdateSchema,
        // @UploadedFile() icon: Express.Multer.File,
    ): Promise<Empty> {
        return this.categoryService.updateCategory(categoryID, updates);
    }

    @Get('list')
    @UserRoleDecorator(UserRole.SUPPORT)
    @ApiOperation({ summary: 'get all categories' })
    @ApiOkResponse({ type: CategoryPreviewSchema, isArray: true })
    private getAllCategories(): Promise<CategoryPreview[]> {
        return this.categoryService.getCategoryPrivateList();
    }

    @Get(':categoryURL')
    @UserRoleDecorator(UserRole.SUPPORT)
    @ApiOperation({ summary: 'get category by URL' })
    @ApiOkResponse({ type: CategorySchema })
    @ApiNotFoundResponse({ description: 'category not found' })
    private getCategory(@Param('categoryURL') categoryUrl: string): Promise<Category> {
        return this.categoryService.getCategoryPrivate(categoryUrl);
    }

    // @Delete(':categoryID')
    // @UserRoleDecorator(UserRole.ADMIN)
    // @ApiOperation({ summary: 'delete category by ID' })
    // @ApiOkResponse({ description: 'success' })
    // @ApiNotFoundResponse({ description: 'category not found' })
    // private deleteCategory(@Param('categoryID') categoryID: number): Promise<void> {
    //     return this.categoryService.deleteCategory(categoryID);
    // }
}
