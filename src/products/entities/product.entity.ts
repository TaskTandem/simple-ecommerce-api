import { Category } from "../../categories/entities/category.entity";
import { BeforeInsert, BeforeUpdate, Column, Entity, ManyToMany, JoinTable, PrimaryGeneratedColumn } from "typeorm";

@Entity({ name: 'products' })
export class Product {

    @PrimaryGeneratedColumn('uuid')
    id:string;

    @Column('text', {
        unique: true,
    })
    name: string;

    @Column('float', {
        default: null,
        nullable: true,
    })
    pricePesos: number;

    @Column('float', {
        default: null,
        nullable: true
    })
    promotionalPricePesos: number;

    @Column('float', {
        default: null,
        nullable: true,
    })
    priceDollar: number;

    @Column('float', {
        default: null,
        nullable: true
    })
    promotionalPriceDollar: number;

    @Column('boolean', {
        default: false,
    })
    isOnPromotionPesos: boolean;

    @Column('boolean', {
        default: false,
    })
    isOnPromotionDollar: boolean;

    @Column({
        type: 'text',
        nullable: true
    })
    description: string;

    @Column('text', {
        unique: true,
    })
    slug: string;

    @Column('int', {
        default: 0
    })
    stock: number;

    @Column('text', {
        array: true,
        default: []
    })
    images?: string[];

    @Column('boolean', {
        default: false,
    })
    isAvailable: boolean;

    @Column('date', {
        default: new Date(),
    })
    createdAt: Date;

    @Column('date', {
        default: new Date(),
    })
    updatedAt: Date;

    @ManyToMany(
        () => Category, 
        category => category.products,
        { onDelete: 'NO ACTION', onUpdate: 'NO ACTION' }
    )
    @JoinTable({
        name: 'product_category',
        joinColumn: {
            name: 'productId',
            referencedColumnName: 'id',
        },
        inverseJoinColumn: {
            name: 'categoryId',
            referencedColumnName: 'id',
        },
    })
    categories?: Category[];



    @BeforeInsert()
    checkSlugInsert(){
        if ( !this.slug ) this.slug = this.name;
        this.slug = this.slug
            .toLowerCase()
            .replaceAll(' ', '_')
            .replaceAll("'",'')
            .replaceAll('`','')
            .replaceAll('´','');
    }

    @BeforeUpdate()
    checkSlugUpdate(){ 
        this.slug = this.slug
            .toLowerCase()
            .replaceAll(' ', '_')
            .replaceAll("'",'')
            .replaceAll('`','')
            .replaceAll('´','');

        this.updatedAt = new Date();
    }

}
