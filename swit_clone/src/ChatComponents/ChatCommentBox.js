import React, {useEffect, useState} from 'react';
import axios from 'axios';
import {useHistory} from 'react-router-dom';
import { ContextMenu, MenuItem, ContextMenuTrigger } from 'react-contextmenu';
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faEllipsisV } from "@fortawesome/free-solid-svg-icons";
import CommentFileBox from './CommentFileBox';
import DeleteModal from '../SharedComponents/DeleteModal';

import '../ChatScreen/MainScreen.css'

function ChatCommentBox(props){
    const history = useHistory();
    const [currentChat, setCurrentChat] = useState(props.cur);
    const [currentChatsComments, setCurrentChatsComments] = useState([]);
    const [isThereChatComments, setisThereChatComments] = useState(false);
    const [isThereChatCommentfiles, setisThereChatCommentfiles] = useState(false);
    const [iscommentAreaOpened, setCommentAreaOpened] = useState(false);

    const openCommentArea = () => {
        setCommentAreaOpened(!iscommentAreaOpened);
    }
    const getComments = () => {   
            if(currentChat.comments.length !== 0){
                setisThereChatComments(true);
                setCurrentChatsComments(currentChat.comments.map(curcomment => curcomment));
                //console.log("chatId " + currentChat.id + " has comments");
                //console.log(currentChatsComments);
                
            }
            else
            {
                setisThereChatComments(false);
                //console.log("chatId " + currentChat.id + " has no comments");
            }
    }

    /***** Delete Comment *****/
    const [delModalOpen, setDelModalOpen] = useState(false);
    const [targetComment, setTargetComment] = useState(0);

    const deleteComment = (id) => {
        setDelModalOpen(true);
        setTargetComment(id);
    }

    const cancelDelete = () => {
        setDelModalOpen(false);
    }

    const confirmDelete = () => {
        axios.delete("http://localhost:8080/api/chat/comment", {
            params: {
                chatCommentId: targetComment
            }
        })
        .then(function(response) { console.log(response); })
        .catch((error) => { console.log(error.response); })
        setDelModalOpen(false);
        history.go(0);
    }
    /***********************/

    useEffect(()=>{
        setisThereChatComments(false);
        setCommentAreaOpened(false);
        getComments();
    },[props.cur]);

    return(
        <div>
            { isThereChatComments ? 
                <div>
                    <div className = {iscommentAreaOpened ? "comment_btn_opened" : "comment_btn"} onClick = {() => openCommentArea()} >
                    {currentChatsComments.length} comment
                    </div>
                    { iscommentAreaOpened ?
                        <div className = "comment_area">
                            {currentChatsComments.map(curcomment=>(
                            <div className = "comment_things">
                                <div>
                                    <div className = "comment_info">
                                        <div className = "comment_user">{curcomment.user.name}</div>
                                        <div className = "comment_time"> {curcomment.time}</div>
                                    </div>
                                    <div className = "comment_content">
                                        <div className = "comment_text">{curcomment.text}</div>
                                        <CommentFileBox curcomment={curcomment}/>
                                    </div>
                                </div>
                                <div className="comment_editing_btns">
                                    <ContextMenuTrigger id={curcomment.id} holdToDisplay={0}>
                                        <FontAwesomeIcon icon={faEllipsisV} className="search comment_delete"/>
                                    </ContextMenuTrigger>
                                
                                    <ContextMenu id={curcomment.id}>
                                        <MenuItem id="menu-item-one">
                                            <span>Edit</span>
                                        </MenuItem>
                                        <MenuItem id="menu-item-two" onClick={() => {deleteComment(curcomment.id)}}>
                                            <span>Delete</span>
                                        </MenuItem>
                                    </ContextMenu>
                                </div>
                                { delModalOpen ? 
                                    <DeleteModal open={delModalOpen} cancel={cancelDelete} del={confirmDelete}></DeleteModal>
                                : null}
                            </div>
                        ))}
                        </div>
                    :null}
                </div>
            :null}
        </div>

    );
}

export default ChatCommentBox;