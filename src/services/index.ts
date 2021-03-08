import { Event } from '@services/event/event';
import { AppEdit } from '@services/app_edit/appEdit';
import { Comment } from '@services/comment/comment';
import { Location } from '@services/location/location';
import { Scheme } from '@services/scheme/scheme';
import { Member } from '@services/member/member';
import { TicketCat } from '@services/ticket_cat/ticketCat';
import { PricePolicy } from '@services/price_policy/price_policy';
import { Promocode } from '@services/promocode/promocode';
import { AppReg } from '@services/app_reg/app_reg';
import { User } from './user/user';
import { Ticket } from './ticket/ticket';
import { Organization } from './organization/org';
import { Component } from './component/component';
import { EventDate } from './date/date';

import eventRoute from './event/eventRoute';
import arRoutes from './app_reg/arRoutes';
import usersRoutes from './user/usersRoutes';
import orgRoutes from './organization/orgRoutes';
import commentRoute from './comment/commentRoute';
import dateRoutes from './date/dateRoute';

export default [ ...usersRoutes, ...orgRoutes, ...arRoutes, ...commentRoute, ...eventRoute, ...dateRoutes ];
export const entities = [ User, Ticket, Organization, Event,
    AppEdit, Comment, Component, EventDate, Location, Scheme, Member,
    TicketCat, PricePolicy, Promocode, AppReg ];
export const migrations: any[] = [];
export const subscribers: any[] = [];
