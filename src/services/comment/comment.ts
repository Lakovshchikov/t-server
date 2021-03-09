import {
    Entity, Column, JoinColumn, PrimaryGeneratedColumn, ManyToOne
} from 'typeorm';
import { Event } from '@services/event/event';
import { IComment, TInfo, TCommentDate } from '@services/comment/types';
import { setDefaultValue } from 'setters/dist';
import { Exclude, classToPlain } from 'class-transformer';

@Entity({ name: 'comment' })
export class Comment implements IComment {
    constructor(data: TCommentDate) {
        if (data) this.setProperties(data);
    }

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
    @Exclude({ toPlainOnly: false, toClassOnly: false })
    event: Event;

    @Exclude({ toPlainOnly: false, toClassOnly: false })
    serialize = (): Record<string, any> => classToPlain(this);

    @Exclude({ toPlainOnly: false, toClassOnly: false })
    public setProperties(data: TCommentDate) {
        this.id = data.id;
        this.id_ev = data.id_ev;
        this.info = data.info;
        this.content = data.content;
        this.correct = setDefaultValue(data.correct, this.correct, null);
    }
}
