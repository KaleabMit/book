import { Exclude } from "class-transformer";
import { Personaldetail } from "src/personaldetails/entities/personaldetail.entity";
import { Column, Entity, JoinColumn, ManyToOne, PrimaryGeneratedColumn } from "typeorm";

@Entity('admin-message')
export class AdminMessaging {
     @PrimaryGeneratedColumn()
        id:number;
        @Column()
        message:string;
    
        @Column({ type: 'timestamp', default: () => 'CURRENT_TIMESTAMP' })
        messagingdate:Date;
    
        @Column()
        @Exclude()
        personaldetailId:number;

        @ManyToOne(() => Personaldetail, (personaldetail) => personaldetail.adminmessage, { eager: true })
        @JoinColumn({
        name: 'personaldetailId',
        referencedColumnName: 'id',
            })
            personaldetail: Personaldetail;
}
