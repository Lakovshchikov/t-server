import {
    Entity, Column, JoinColumn, PrimaryGeneratedColumn, ManyToOne
} from 'typeorm';
import { Event } from '@services/event/event';
import { IComment, TInfo, TCommentReqData, TConfirmCommentReqData } from '@services/comment/commentTypes';
import { validate, ValidationError } from 'class-validator';

@Entity({ name: 'comment' })
export class Comment implements IComment {
    constructor(data: IComment) {
        if (data) this.setProperties(data);
    }

    static validate = function (data: TCommentReqData | TConfirmCommentReqData): Promise<ValidationError[]> {
        return validate(data, { skipMissingProperties: true })
            .then((errors: ValidationError[]) => errors);
    };

    @PrimaryGeneratedColumn('uuid')
    id: string;

    @Column({ type: 'uuid' })
    id_ev: string;

    @Column({ type: 'jsonb', nullable: true })
    info: TInfo | null;

    @Column({ type: 'text' })
    content: string;

    @Column({ type: 'boolean', nullable: true })
    correct: boolean;

    @ManyToOne(() => Event, event => event.comments)
    @JoinColumn({ name: 'id_ev', referencedColumnName: 'id' })
    event: Event;

    public serialize = (stringify: boolean = false) :IComment | string => {
        let result: IComment | string;
        const obj = {
            id: this.id,
            id_ev: this.id_ev,
            info: this.info,
            content: this.content,
            correct: this.correct
        };
        result = obj;
        if (stringify) result = JSON.stringify(obj);
        return result;
    };

    public setProperties(data: IComment) {
        this.id = data.id;
        this.id_ev = data.id_ev;
        this.info = data.info;
        this.content = data.content;
        this.correct = this.setNull(data.correct, this.correct);
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
