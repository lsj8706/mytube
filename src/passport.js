import passport from "passport";
import GithubStrategy from "passport-github";
import KakaoStrategy from "passport-kakao";
import { githubLoginCallback, kakaotalkLoginCallback } from "./controllers/userController";
import User from "./models/User";
import routes from "./routes";

passport.use(User.createStrategy());

passport.use(new GithubStrategy(
    {
    clientID: process.env.GH_ID,
    clientSecret: process.env.GH_SECRET,
    redirect_uri: process.env.PRODUCTION? 
        `https://fast-stream-83740.herokuapp.com${routes.githubCallback}`
        :`http://localhost:4000${routes.githubCallback}`
    }, 
    githubLoginCallback
    )
);

passport.use(new KakaoStrategy(
    {
        clientID : process.env.KAKAO_ID,
        clientSecret: process.env.KAKAO_SECRET,
        callbackURL : process.env.PRODUCTION? 
            `https://fast-stream-83740.herokuapp.com${routes.kakaotalkCallback}`
            : `http://localhost:4000${routes.kakaotalkCallback}`
    },
    kakaotalkLoginCallback
    )
);


//쿠키를 이용하여 id를 받고 유저를 식별하기
passport.serializeUser(User.serializeUser());
passport.deserializeUser(User.deserializeUser());