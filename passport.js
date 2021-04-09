import passport from "passport";
import GithubStrategy from "passport-github";
import { githubLoginCallback } from "./controllers/userController";
import User from "./models/User";
import routes from "./routes";

passport.use(User.createStrategy());

passport.use(new GithubStrategy(
    {
    clientID: process.env.GH_ID,
    clientSecret: process.env.GH_SECRET,
    redirect_uri: `http://localhost:4000/${routes.githubCallback}`
    }, 
    githubLoginCallback
    )
);


//쿠키를 이용하여 id를 받고 유저를 식별하기
passport.serializeUser(User.serializeUser());
passport.deserializeUser(User.deserializeUser());