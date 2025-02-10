import { Personaldetail } from "src/personaldetails/entities/personaldetail.entity";
import { Post } from "src/post/entities/post.entity";
import { Column, Entity, OneToMany, OneToOne, PrimaryGeneratedColumn } from "typeorm";

@Entity('categories')
export class Category {
   @PrimaryGeneratedColumn()
   id:number;
   @Column()
   title:string;
   @Column()
   photo:string;
   @OneToMany(()=>Post,(post)=>post.category)
   posts:Post;
   @OneToOne(()=>Personaldetail,(personaldetail)=>personaldetail.category)
   personaldetail:Personaldetail;
}
