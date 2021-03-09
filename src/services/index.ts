import { Event, routes as eventRoutes } from '@services/event/';
import { AppEdit } from '@services/app_edit/';
import { Comment, routes as commentRoutes } from '@services/comment/';
import { Location } from '@services/location/location';
import { Scheme } from '@services/scheme/scheme';
import { Member, routes as memberRoutes } from '@services/member';
import { TicketCat } from '@services/ticket_cat/ticketCat';
import { PricePolicy } from '@services/price_policy/price_policy';
import { Promocode } from '@services/promocode/promocode';
import { AppReg, routes as appRegRoutes } from '@services/app_reg/';
import { User, routes as usersRoutes } from './user';
import { Ticket } from './ticket/ticket';
import { Organization, routes as orgRoutes } from './organization';
import { Component } from './component/component';
import { EventDate, routes as dateRoutes } from './date';

export default [ ...usersRoutes, ...orgRoutes, ...appRegRoutes,
    ...commentRoutes, ...eventRoutes, ...dateRoutes, ...memberRoutes ];

export const entities = [ User, Ticket, Organization, Event,
    AppEdit, Comment, Component, EventDate, Location, Scheme, Member,
    TicketCat, PricePolicy, Promocode, AppReg ];
export const migrations: any[] = [];
export const subscribers: any[] = [];
