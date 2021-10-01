import { ApiProperty } from '@nestjs/swagger';
import {
    Column, CreateDateColumn, Entity, JoinColumn, JoinTable, ManyToMany, ManyToOne,
    OneToMany, PrimaryGeneratedColumn
} from 'typeorm';
import { CategoryEntity } from '@entities/Category';
import { IProduct } from '@interfaces/Product';
import { ImageEntity } from '@entities/Image';
import { ICategory } from '@interfaces/Category';
import { LabelEntity } from '@entities/Label';
import { ILabel } from '@interfaces/Label';
import { IProperty } from '@interfaces/Property';
import { PropertyEntity } from '@entities/Property';

export class ProductBaseEntity implements IProduct {
    @PrimaryGeneratedColumn('uuid')
    @ApiProperty()
    id: string;

    @CreateDateColumn()
    @ApiProperty({ required: false })
    created_at: Date;

    @Column()
    @ApiProperty({ required: true })
    title: string;

    @Column({ default: false })
    @ApiProperty({ required: false })
    is_public: boolean;

    @Column({ default: true })
    @ApiProperty({ required: false })
    is_available: boolean;

    @Column()
    @ApiProperty()
    price: number;

    @OneToMany(
        () => ImageEntity,
        ({ product }) => product,
        { eager: true }
    )
    @ApiProperty({ type: ImageEntity, isArray: true })
    images: string[];

    @ManyToMany(
        () => LabelEntity,
        { eager: true, cascade: true }
    )
    @JoinTable({
        name: '_products_to_labels',
        joinColumn: {
            name: 'product_id',
            referencedColumnName: 'id'
        },
        inverseJoinColumn: {
            name: 'label_id',
            referencedColumnName: 'id'
        }
    })
    @ApiProperty({
        type: LabelEntity,
        required: false,
        isArray: true
    })
    labels: ILabel[];

    @Column({ default: 0 })
    @ApiProperty({
        required: false,
        default: 0,
        description: 'product rating by sellering'
    })
    rating: number;

    @Column({ nullable: true })
    @ApiProperty({
        required: false,
        description: 'short product description'
    })
    description: string;
}

@Entity('product')
export class ProductEntity extends ProductBaseEntity implements IProduct {
    @ManyToOne(
        () => CategoryEntity,
        ({ products }) => products,
        { onDelete: 'NO ACTION' }
    )
    @JoinColumn({ name: 'category', referencedColumnName: 'id' })
    @ApiProperty({ type: () => CategoryEntity })
    category: ICategory;

    @ManyToMany(
        () => PropertyEntity,
        ({ id }) => id,
        { eager: true, cascade: true }
    )
    @JoinTable({
        name: '_products_to_properties',
        joinColumn: { name: 'product_id' },
        inverseJoinColumn: { name: 'property_id' }
    })
    @ApiProperty({
        type: PropertyEntity,
        required: true,
        isArray: true
    })
    properties: Array<IProperty>;
}

// @EventSubscriber()
// export class ProductEntitySubscriber implements EntitySubscriberInterface<ProductEntity> {
//     constructor(connection: Connection) {
//         connection.subscribers.push(this);
//     }

//     listenTo() {
//         return ProductEntity;
//     }

//     afterRemove(e: RemoveEvent<ProductEntity>) {
//         console.log(`AFTER ENTITY WITH ID ${e.entityId} REMOVED: `, e.entity);
//     }
// }
