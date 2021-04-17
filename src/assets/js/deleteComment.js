import axios from "axios";

const commentList = document.getElementById("jsCommentList");
const commentNumber = document.getElementById("jsCommentNumber");

const decreaseNumber = () =>{
    commentNumber.innerHTML = parseInt(commentNumber.innerHTML, 10) - 1;
}

const sendComment = async (comment) =>{
    const videoId = window.location.href.split("/videos/")[1];
    const respose = await axios({
        url: `/api/${videoId}/comment-delete`,
        method: "POST",
        data: {
            commentId:comment
        }
    });
    if(respose.status === 200){
        decreaseNumber();
    }
};

const handleDelete=(event)=>{
    event.preventDefault();
    const li = event.target.parentNode;
    const comment = li.querySelector("span");
    sendComment(comment.id);
    comment.innerHTML="Deleted";
};

function init(){
    const deleteBtn = commentList.querySelectorAll("input");
    deleteBtn.forEach(function(elem){
        elem.addEventListener("click", handleDelete);
    });
}

if(commentList){
    
    init();
}