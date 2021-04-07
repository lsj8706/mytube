import passport from "passport";
import User from "./models/User";

passport.use(User.createStrategy());

//쿠키를 이용하여 id를 받고 유저를 식별하기
passport.serializeUser(User.serializeUser());
passport.deserializeUser(User.deserializeUser());