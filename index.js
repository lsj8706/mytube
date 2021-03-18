import express from "express";
import morgan from "morgan";
import helmet from"helmet";
import cookieParser from"cookie-parser";
import bodyParser from"body-parser";
//helmet은 security를 위한 모듈(middleware로사용) cookieparser는 cookie를받아옴

const app = express();

const PORT = 4000;

const handleListening = () => console.log(`Listening on: http://localhost:${4000}`);


const handleHome = (req,res) => res.send('Hello from korea');

const handleProfile = (req,res) => res.send("You are on my profile");

const betweenHome = (req,res,next) => {
    console.log("Between");
    next();
    //middleware 로 between함수를 만들었다. 여기서 next는 다음함수(콜백함수)가 실행되게함
};

//app.use(betweenHome);
//middleware가 모든 get마다 실행되게함
app.use(cookieParser());
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({extended: true}));
app.use(helmet());
app.use(morgan('dev'));

app.get("/",handleHome);

app.get("/profile",handleProfile);


app.listen(PORT, handleListening);


