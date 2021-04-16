import passport, { authenticate } from "passport";
import routes from "../routes";
import User from "../models/User";

export const getJoin = (req,res) => {
    res.render("join", { pageTitle:"Join" })
};

export const postJoin = async (req, res, next) => {
    const {
        body:{name,email,password,password2}
    } = req;
    if(password !==password2){
        res.status(400);
        res.render("join", { pageTitle:"Join" })
    } else {
        try{
            const user = await User({
                name,
                email
            });
            await User.register(user, password);
            next();
        } catch(error){
            console.log(error);
            res.redirect(routes.home);
        }
        // To Do: Log user in
    }

};



export const getLogin = (req,res) => res.render("login", { pageTitle:"Login" });

export const postLogin = passport.authenticate("local",{
    failureRedirect: routes.login,
    successRedirect: routes.home
});

export const githubLogin = passport.authenticate('github');

export const githubLoginCallback = async (_, __, profile, cb) =>{
    const { _json: { id, avatar_url: avatarUrl , name, email }} = profile;
    
    try{
        const user = await User.findOne({email});
        if(user){
            user.githubId = id;
            user.avatarUrl = avatarUrl;
            user.name = name;
            user.save();
            return cb(null, user);
        }else{
            const newUser = await User.create({
                email,
                name,
                githubId:id,
                avatarUrl
            });
            return cb(null, newUser);
        }
    } catch(error){
        return cb(error);
    }
};

export const postGithubLogin = (req, res)=>{
    res.redirect(routes.home);
};

export const kakaotalkLogin = passport.authenticate('kakao');

export const kakaotalkLoginCallback = async (_, __, profile, cb) =>{
    const { id, username:name, _json:{ properties:{ profile_image:avatarUrl },kakao_account:{email}}} = profile;
    console.log(profile);
    try{
        const user = await User.findOne({email});
        if(user){
            user.kakaotalkId = id;
            if(avatarUrl){
                user.avatarUrl = avatarUrl;
            }
            user.name = name;
            user.save();
            return cb(null, user);
        }else{
            const newUser = await User.create({
                email,
                name,
                kakaotalkId:id,
                avatarUrl
            });
            return cb(null, newUser);
        }
    } catch(error){
        return cb(error);
    }
};


export const postKakaotalkLogin = (req, res)=>{
    res.redirect(routes.home);
};


export const logout = (req,res) => {
    req.logout();
    res.redirect(routes.home);
};

export const getMe = async (req,res) =>{
    try{
        const user = await User.findById(req.user.id).populate('videos');
        res.render("userDetail", { pageTitle:"User Detail",user});
    }catch(error){
        res.render("userDetail", { pageTitle:"User Detail",user:req.user });
    }
};



export const userDetail = async (req,res) => {
    const { params:{ id }} = req;
    try{
        const user = await User.findById(id).populate('videos');
        console.log(user);
        res.render("userDetail", { pageTitle:"User Detail" ,user});
        
    } catch(error){
        res.redirect(routes.home);
    }
};

export const users = (req,res) => res.render("users", { pageTitle:"Users"});

export const getEditProfile = (req,res) => res.render("editProfile", { pageTitle:"Edit Profile" });

export const postEditProfile = async (req,res) => {
    const {
        user:{_id},
        body:{email,name},
        file
    } = req;
    try{
        await User.findByIdAndUpdate(_id, {
            name,
            email,
            avatarUrl: file ? file.location : req.user.avatarUrl
        });
        res.redirect(routes.me);

    } catch(error){
        res.redirect(routes.editProfile);
    }

};


export const getChangePassword = (req,res) => res.render("changePassword", { pageTitle:"Change Password" });

export const postChangePassword = async (req,res) => {
    const {
        body:{
            oldPassword,
            newPassword,
            newPassword1
        }
    } = req;
    try{
        if(newPassword!==newPassword1){
            res.status(400);
            res.redirect(`/users/${routes.changePassword}`);
            return;
        }
        await req.user.changePassword(oldPassword,newPassword);
        res.redirect(routes.me);

    }catch(error){
        res.status(400);
        res.redirect(`/users/${routes.changePassword}`);
    }

};