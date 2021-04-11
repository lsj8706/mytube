//Global
const HOME = "/";
const JOIN = "/join";
const LOGIN = "/login";
const LOGOUT = "/logout";
const SEARCH = "/search";

//Users

const USERS = "/users";
const USER_DETAIL = "/:id";
// :id 이런식으로 쓰면 id가 변수처럼 작동할수 있게됨(formatting처럼)
const EDIT_PROFILE = "/edit-profile";
const CHANGE_PASSWORD = "/change-password";
const ME = "/me";

//Videos

const VIDEOS = "/videos";
const UPLOAD = "/upload";
const VIDEO_DETAIL = "/:id";
const EDIT_VIDEO = "/:id/edit";
const DELETE_VIDEO = "/:id/delete";

// Github

const GITHUB = "/auth/github";
const GITHUB_CALLBACK = "/auth/github/callback";

// Kakatalk

const KAKAOTALK = "/auth/kakaotalk";
const KAKAOTALK_CALLBACK = "/auth/kakaotalk/callback";

const routes = {
    home: HOME,
    join: JOIN,
    login: LOGIN,
    logout: LOGOUT,
    search: SEARCH,
    users: USERS,
    userDetail: (id) => {
        if(id){
            return `/users/${id}`;
        }else{
            return USER_DETAIL
        }
    },
    editProfile: EDIT_PROFILE,
    changePassword: CHANGE_PASSWORD,
    videos: VIDEOS,
    upload: UPLOAD,
    videoDetail: (id)=>{
        if(id){
            return `/videos/${id}`;            
        }else{
            return VIDEO_DETAIL
        }
    },
    editVideo: (id)=>{
        if(id){
            return `/videos/${id}/edit`;
        }else{
            return EDIT_VIDEO;
        }
    },
    deleteVideo: (id)=>{
        if(id){
            return `/videos/${id}/delete`;
        }else{
            return DELETE_VIDEO;
        }
    },
    github: GITHUB,
    githubCallback: GITHUB_CALLBACK,
    me: ME,
    kakaotalk: KAKAOTALK,
    kakaotalkCallback: KAKAOTALK_CALLBACK
};
export default routes;