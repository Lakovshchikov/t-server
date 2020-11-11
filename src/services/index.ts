import { Event } from '@services/event/event';
import { AppEdit } from '@services/app_edit/appEdit';
import { Comment } from '@services/comment/comment';
import { Location } from '@services/location/location';
import { Scheme } from '@services/scheme/scheme';
import { Member } from '@services/member/member';
import { TicketCat } from '@services/ticket_cat/ticketCat';
import { PricePolicy } from '@services/price_policy/price_policy';
import usersRoutes from './user/usersRoutes';
import { User } from './user/user';
import { Ticket } from './ticket/ticket';
import { Organization } from './organization/organization';
import { Component } from './component/component';
import { Date } from './date/date';

export default [ ...usersRoutes ];
export const entities = [ User, Ticket, Organization, Event,
    AppEdit, Comment, Component, Date, Location, Scheme, Member,
    TicketCat, PricePolicy ];
export const migrations: any[] = [];
export const subscribers: any[] = [];
