import { Entity, PrimaryColumn, Column } from 'typeorm';

@Entity({ name: 'user' })
export class User {
  @PrimaryColumn({ type: 'character varying', length: 100 })
  email:string;

  @Column({ type: 'text' })
  name: string;

  @Column({ name: 's_name', type: 'text' })
  second_name: string;

  @Column({ name: 'p_name', type: 'text' })
  patr_name: string | null;

  @Column({ type: 'text' })
  pass: string;

  @Column({ name: 'admin', type: 'boolean' })
  isAdmin: boolean;

  @Column({ type: 'character varying', length: 30 })
  phone: string | null;

  @Column({ type: 'jsonb' })
  config_notification: {};

  @Column({ type: 'jsonb' })
  config_permission: {};
}
