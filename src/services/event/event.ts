import {
    Entity, Column, JoinColumn, PrimaryGeneratedColumn, ManyToOne, OneToMany
} from 'typeorm';
import { Organization } from '@services/organization/org';
import { AppEdit } from '@services/app_edit/appEdit';
import { Comment } from '@services/comment/comment';
import { Component } from '@services/component/component';
import { EventDate } from '@services/date/date';
import { IEvent, TEventData } from '@services/event/eventTypes';
import { v4 as uuidv4 } from 'uuid';
import { validate, ValidationError } from 'class-validator';
import { Exclude, classToPlain } from 'class-transformer';
import { setDefaultValue } from 'setters/dist';

@Entity({ name: 'event' })
export class Event implements IEvent {
    constructor(data: TEventData) {
        if (data) this.setProperties(data);
    }

    static validate = function (data: TEventData): Promise<ValidationError[]> {
        return validate(data, { skipMissingProperties: true })
            .then((errors: ValidationError[]) => errors);
    };

    @PrimaryGeneratedColumn('uuid')
    id: string;

    @Column({ type: 'uuid' })
    id_org: string;

    @Column({ type: 'text' })
    name: string;

    @Column({ type: 'smallint' })
    age_restr: number;

    @Column({ type: 'text', nullable: true })
    add_restr: string | null;

    @Column({ type: 'smallint' })
    category: number;

    @Column({ type: 'boolean' })
    public: boolean;

    @ManyToOne(() => Organization, org => org.events)
    @JoinColumn({ name: 'id_org', referencedColumnName: 'id' })
    @Exclude({ toPlainOnly: false, toClassOnly: false })
    org: Organization;

    @OneToMany(() => AppEdit, app_edit => app_edit.event)
    @JoinColumn({ name: 'id' })
    @Exclude({ toPlainOnly: false, toClassOnly: false })
    apps_edit: AppEdit[];

    @OneToMany(() => Comment, comment => comment.event)
    @JoinColumn({ name: 'id' })
    @Exclude({ toPlainOnly: false, toClassOnly: false })
    comments: Comment[];

    @OneToMany(() => Component, component => component.event)
    @JoinColumn({ name: 'id' })
    @Exclude({ toPlainOnly: false, toClassOnly: false })
    components: Component[];

    @OneToMany(() => EventDate, date => date.event)
    @JoinColumn({ name: 'id' })
    @Exclude({ toPlainOnly: false, toClassOnly: false })
    dates: Date[];

    @Exclude({ toPlainOnly: false, toClassOnly: false })
    setProperties = (data: TEventData) => {
        if (!this.id) this.id = uuidv4();
        if (!this.id_org) this.id_org = data.id_org;
        this.add_restr = data.add_restr ? data.add_restr : this.add_restr;
        this.age_restr = data.age_restr !== undefined ? data.age_restr : this.age_restr;
        this.category = data.category !== undefined ? data.category : this.category;
        this.name = data.name ? data.name : this.name;
        this.public = setDefaultValue(data.public, this.public, false);
    };

    @Exclude({ toPlainOnly: false, toClassOnly: false })
    serialize = (): Record<string, any> => classToPlain(this);
}
