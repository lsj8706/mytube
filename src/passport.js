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
    redirect_uri: `http://localhost:4000/${routes.githubCallback}`
    }, 
    githubLoginCallback
    )
);

passport.use(new KakaoStrategy(
    {
        clientID : process.env.KAKAO_ID,
        clientSecret: process.env.KAKAO_SECRET, // clientSecret을 사용하지 않는다면 넘기지 말거나 빈 스트링을 넘길 것
        callbackURL : `http://localhost:4000/${routes.kakaotalkCallback}`
    },
    kakaotalkLoginCallback
    )
);


//쿠키를 이용하여 id를 받고 유저를 식별하기
passport.serializeUser(User.serializeUser());
passport.deserializeUser(User.deserializeUser());