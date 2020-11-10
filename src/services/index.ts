import { Event } from '@services/event/event';
import { AppEdit } from '@services/app_edit/appEdit';
import { Comment } from '@services/comment/comment';
import usersRoutes from './users/usersRoutes';
import { User } from './users/user';
import { Ticket } from './ticket/ticket';
import { Organization } from './organization/organization';
import { Component } from './component/component';
import { Date } from './date/date';

export default [ ...usersRoutes ];
export const entities = [ User, Ticket, Organization, Event, AppEdit, Comment, Component, Date ];
export const migrations: any[] = [];
export const subscribers: any[] = [];
