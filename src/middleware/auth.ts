import passport from 'passport';
import { Router } from 'express';
import { Strategy } from 'passport-local';
import { User } from '@services/user/user';
import { Organization } from '@services/organization/org';
import usersController from '@services/user/usersController';
import orgController from '@services/organization/controller';

export const handleAuth = (router: Router) => {
    router.use(passport.initialize());
    router.use(passport.session());
};

enum EUserTypes {
    'USER' = 1,
    'ORG' = 2
}

class Session {
    userId: string;

    userType: EUserTypes;

    constructor(userId: string, userType: EUserTypes) {
        this.userId = userId;
        this.userType = userType;
    }
}

passport.use('localUser', new Strategy(
    async (username: string, pass: string, done) => {
        const user = await usersController.getUserByEmail(username);
        if (!user || !user.validPass(pass)) {
            return done(null, false);
        } else {
            return done(null, user);
        }
    }
));

passport.use('localOrg', new Strategy(
    async (username: string, pass: string, done) => {
        const org = await orgController.getUserByEmail(username);
        if (!org || !org.validPass(pass)) {
            return done(null, false);
        } else {
            return done(null, org);
        }
    }
));

passport.serializeUser((user: User | Organization, done) => {
    let userType;
    if (user instanceof User) {
        userType = EUserTypes.USER;
    } else {
        userType = EUserTypes.ORG;
    }
    const session = new Session(user.email, userType);
    done(null, session);
});

passport.deserializeUser(async (session: Session, done) => {
    let user;
    switch (session.userType) {
        case EUserTypes.USER:
            user = await usersController.getUserByEmail(session.userId);
            break;
        case EUserTypes.ORG:
            user = await orgController.getUserByEmail(session.userId);
            break;
        default:
            break;
    }

    if (!user) {
        done(null, false);
    } else {
        done(null, user);
    }
});
