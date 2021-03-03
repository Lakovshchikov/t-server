import {
    Entity, Column, JoinColumn, PrimaryGeneratedColumn, ManyToOne, OneToMany
} from 'typeorm';
import { Organization } from '@services/organization/org';
import { AppEdit } from '@services/app_edit/appEdit';
import { Comment } from '@services/comment/comment';
import { Component } from '@services/component/component';
import { Date } from '@services/date/date';

@Entity({ name: 'event' })
export class Event {
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
    category: string;

    @Column({ type: 'boolean' })
    public: string;

    @ManyToOne(() => Organization, org => org.events)
    @JoinColumn({ name: 'id' })
    org: Organization;

    @OneToMany(() => AppEdit, app_edit => app_edit.event)
    @JoinColumn({ name: 'id' })
    apps_edit: AppEdit[];

    @OneToMany(() => Comment, comment => comment.event)
    @JoinColumn({ name: 'id' })
    comments: Comment[];

    @OneToMany(() => Component, component => component.event)
    @JoinColumn({ name: 'id' })
    components: Component[];

    @OneToMany(() => Date, date => date.event)
    @JoinColumn({ name: 'id' })
    dates: Date[];
}
