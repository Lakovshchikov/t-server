import {
    Entity, Column, JoinColumn, PrimaryGeneratedColumn, OneToOne
} from 'typeorm';
import { Organization } from '@services/organization/org';
import { validate, ValidationError } from 'class-validator';
import { IAppOrg, EStatus, TAppRegReqData } from './arTypes';

@Entity({ name: 'app_reg' })
export class AppReg implements IAppOrg {
    constructor(data:TAppRegReqData | null) {
        if (data) this.setProperties(data);
    }

    static validate = function (data: TAppRegReqData) : Promise<ValidationError[]> {
        return validate(data, { skipMissingProperties: true })
            .then((errors: ValidationError[]) => errors);
    };

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

    public serialize = (stringify: boolean = false) :IAppOrg | string => {
        let result: IAppOrg | string = '';
        const obj = {
            id: this.id,
            id_org: this.id_org,
            status: this.status,
            desc: this.desc,
            doc_id: this.doc_id
        };
        result = obj;
        if (stringify) result = JSON.stringify(obj);
        return result;
    };

    public setProperties(data: TAppRegReqData | null) {
        this.id_org = this.setNull(data.id_org, this.id_org);
        this.doc_id = this.setNull(data.doc_id, this.doc_id);
        this.status = this.setNull(data.status, EStatus.PROCESSING);
        this.desc = this.setNull(data.desc, this.desc);
    }

    private setNull = (value: any, currentVal: any | null) => {
        let result;
        if (value) {
            result = value;
        } else {
            result = currentVal !== undefined ? currentVal : null;
        }
        return result;
    };
}
