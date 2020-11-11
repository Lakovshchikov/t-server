import passport from 'passport';
import { Router } from 'express';
import { Strategy } from 'passport-local';
import { User } from '@services/user/user';
import usersController from '@services/user/usersController';

export const handleAuth = (router: Router) => {
    router.use(passport.initialize());
    router.use(passport.session());
};

passport.use(new Strategy(
    async (username: string, pass: string, done) => {
        const user = await usersController.getUserByEmail(username);
        if (!user || !user.validPass(pass)) {
            return done(null, false);
        } else {
            return done(null, user);
        }
    }
));

passport.serializeUser((user: User, done) => {
    done(null, user.email);
});

passport.deserializeUser(async (id: string, done) => {
    const user = await usersController.getUserByEmail(id);
    if (!user) {
        done(null, false);
    } else {
        done(null, user);
    }
});
