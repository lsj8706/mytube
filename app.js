import express from "express";
import morgan from "morgan";
import helmet from "helmet";
import cookieParser from "cookie-parser";
import bodyParser from "body-parser";
import userRouter from "./routers/userRouter";
import videoRouter from "./routers/videoRouter";
import globalRouter from "./routers/globalRouter";
import routes from "./routes";
//helmet은 security를 위한 모듈(middleware로사용) cookieparser는 cookie를받아옴
//userRouter는 default로 export하지 않았으므로 {}안에 넣어줘야한다.

const app = express();

//app.use(betweenHome);
//middleware가 모든 get마다 실행되게함
app.use(cookieParser());
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({extended: true}));
app.use(helmet());
app.use(morgan('dev'));

app.use(routes.home, globalRouter);
app.use(routes.users, userRouter);
app.use(routes.videos, videoRouter);

export default app;