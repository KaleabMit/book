import { User } from "src/auth/entities/user.entity";
import { Column, Entity, JoinColumn, ManyToOne, PrimaryGeneratedColumn } from "typeorm";

@Entity('replies')
export class Reply {
    @PrimaryGeneratedColumn()
    id:number;
    @Column()
    message:string;

    @Column({ type: 'timestamp', default: () => 'CURRENT_TIMESTAMP' })
    replydate:Date;

    @Column()
    userId:number;

    @ManyToOne(() => User, (user) => user.replies, { eager: true })
    @JoinColumn({
    name: 'userId',
    referencedColumnName: 'id',
        })
    user: User;

}
