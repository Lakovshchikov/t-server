import {
    Entity, Column, JoinColumn, PrimaryGeneratedColumn, OneToOne
} from 'typeorm';
import { Organization } from '@services/organization/org';
import { setDefaultValue } from 'setters/dist';
import { Exclude, classToPlain } from 'class-transformer';
import { IAppOrg, EStatus, TAppRegReqData } from './arTypes';

@Entity({ name: 'app_reg' })
export class AppReg implements IAppOrg {
    constructor(data:TAppRegReqData | null) {
        if (data) this.setProperties(data);
    }

    @PrimaryGeneratedColumn('uuid')
    id: string;

    @Column({ type: 'uuid' })
    id_org: string;

    @Column({ type: 'text', nullable: true })
    doc_id: string;

    @Column({ type: 'smallint' })
    status: EStatus;

    @Column({ type: 'text', nullable: true })
    desc: string;

    @OneToOne(() => Organization, org => org.app_reg)
    @JoinColumn({ name: 'id', referencedColumnName: 'id' })
    org: Organization;

    @Exclude({ toPlainOnly: false, toClassOnly: false })
    serialize = (): Record<string, any> => classToPlain(this);

    @Exclude({ toPlainOnly: false, toClassOnly: false })
    setProperties(data: TAppRegReqData | null) {
        this.id_org = setDefaultValue(data.id_org, this.id_org, null);
        this.doc_id = setDefaultValue(data.doc_id, this.doc_id, null);
        this.status = setDefaultValue(data.status, EStatus.PROCESSING, null);
        this.desc = setDefaultValue(data.desc, this.desc, null);
    }
}
