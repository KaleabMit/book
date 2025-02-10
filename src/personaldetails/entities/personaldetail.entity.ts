import { Exclude } from 'class-transformer';
import { AdminMessaging } from 'src/admin-messaging/entities/admin-messaging.entity';
import { Category } from 'src/category/entities/category.entity';
import { Post } from 'src/post/entities/post.entity';
import { Column, Entity, JoinColumn, ManyToOne, OneToMany, PrimaryGeneratedColumn } from 'typeorm';

@Entity('personaldetails')
export class Personaldetail {
    @PrimaryGeneratedColumn()
    id: number;

    @Column()
    firstname: string;

    @Column()
    lastname: string;

    @Column()
    email: string;

    @Column()
    phone: string;

    @Column()
    country: string;

    @Column({ type: 'date' })
    checkin: Date;

    @Column({ type: 'date' })
    checkout: Date;

    @Column()
    identity: string;

    @Column({ type: 'timestamp', default: () => 'CURRENT_TIMESTAMP' })
    rentaldate: Date;

    @Column()
    status: string;

    @Column({ default: 0 })
    children: number;

    @Column()
    @Exclude()
    postsId: number;

    @Column()
    @Exclude()
    categoryId: number;

    @ManyToOne(() => Post, (posts) => posts.personaldetail, { eager: true })
    @JoinColumn({
        name: 'postsId',
        referencedColumnName: 'id',
    })
    posts: Post;

    @ManyToOne(() => Category, (category) => category.personaldetail, { eager: true })
    @JoinColumn({
        name: 'categoryId',
        referencedColumnName: 'id',
    })
    category: Category;

    @OneToMany(() => AdminMessaging, (adminmessage) => adminmessage.personaldetail)
     adminmessage: AdminMessaging;
}
