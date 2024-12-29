import { Exclude } from "class-transformer";
import { User } from "src/auth/entities/user.entity";
import { Category } from "src/category/entities/category.entity";
import { Personaldetail } from "src/personaldetails/entities/personaldetail.entity";
import { Column, Entity, JoinColumn, ManyToOne, OneToOne, PrimaryGeneratedColumn } from "typeorm";

@Entity('posts')
export class Post {
    @PrimaryGeneratedColumn()
    id:number;
    @Column()
    price:number;
    @Column()
    specialprice:number;
    @Column()
    photo:string;
    @Column()
    type:string;
    @Column()
    address:string;
    @Column()
    area:number;
    @Column()
    bed:number;
    @Column()
    bath:number;
    @Column()
    wifi:string;
    @Column({type:'timestamp',default:()=>'CURRENT_TIMESTAMP'})
    createdOn:Date;
    @Column({type:'timestamp',default:()=>'CURRENT_TIMESTAMP'})
    modifiedOn:Date;

    @Column()
    @Exclude()
    userId:number;

    @Column()
    @Exclude()
    categoryId:number;

    @ManyToOne(()=>User,(user)=>user.posts,{eager:true})
    @JoinColumn({
        name:'userId',
        referencedColumnName:'id'
    })
    user:User;
@ManyToOne(()=>Category,(category)=>category.posts,{eager:true})
@JoinColumn({
    name:'categoryId',
    referencedColumnName:'id'
})
category:Category;

@OneToOne(()=>Personaldetail,(personaldetail)=>personaldetail.posts)
personaldetail:Personaldetail;
}
