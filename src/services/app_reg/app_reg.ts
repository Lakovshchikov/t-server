import {
    Entity, Column, JoinColumn, PrimaryGeneratedColumn, OneToOne
} from 'typeorm';
import { Organization } from '@services/organization/org';

@Entity({ name: 'app_reg' })
export class AppReg {
    @PrimaryGeneratedColumn('uuid')
    id: string;

    @Column({ type: 'uuid' })
    id_org: string;

    @OneToOne(() => Organization, org => org.app_reg)
    @JoinColumn({ name: 'id' })
    org: Organization;
}
