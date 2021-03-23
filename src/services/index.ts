import { Event, routes as eventRoutes } from '@services/event/';
import { AppEdit } from '@services/app_edit/';
import { Comment, routes as commentRoutes } from '@services/comment/';
import { Location, routes as locationRoutes } from '@services/location/';
import { Scheme } from '@services/scheme/scheme';
import { Member, routes as memberRoutes } from '@services/member';
import { TicketCat, routes as ticketCatRoutes } from '@services/ticket_cat';
import { PricePolicy, routes as pricePolicyRoutes } from '@services/price_policy/';
import { PromoCode, routes as promocodeRoutes } from '@services/promocode/';
import { AppReg, routes as appRegRoutes } from '@services/app_reg/';
import { User, routes as usersRoutes } from './user';
import { Ticket } from './ticket/ticket';
import { Organization, routes as orgRoutes } from './organization';
import { Component } from './component/component';
import { EventDate, routes as dateRoutes } from './date';

export default [ ...usersRoutes, ...orgRoutes, ...appRegRoutes,
    ...commentRoutes, ...eventRoutes, ...dateRoutes, ...memberRoutes,
    ...ticketCatRoutes, ...pricePolicyRoutes, ...promocodeRoutes, ...locationRoutes ];

export const entities = [ User, Ticket, Organization, Event,
    AppEdit, Comment, Component, EventDate, Location, Scheme, Member,
    TicketCat, PricePolicy, PromoCode, AppReg ];

export const migrations: any[] = [];
export const subscribers: any[] = [];
