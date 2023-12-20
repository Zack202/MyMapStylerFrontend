import React, { useContext, useState } from 'react';
import { GlobalStoreContext } from '../../store';
import { AuthContext } from '../../auth';
import {
  Card,
  CardContent,
  Typography,
  List,
  ListItem,
  IconButton,
  Avatar,
  Box,
    Button,
    TextField
} from '@mui/material';
import ReplyIcon from '@mui/icons-material/Reply';
import DeleteIcon from '@mui/icons-material/Delete';
import AddIcon from '@mui/icons-material/Add';
import RemoveIcon from '@mui/icons-material/Remove';
import SendIcon from '@mui/icons-material/Send';

const CommentSection = (props) => {

   const { isGuest } = props;

   const { store } = useContext(GlobalStoreContext);
   const{ auth } = useContext(AuthContext);
   const [comment, setComment] = useState('');

  const handleInputChange = (event) => {
   setComment(event.target.value)
 };

  const getIndentation = (level) => {
    const baseIndentation = 30; // Adjust for moree indentation need to fix right side indentation later or leave it
    const indentation = baseIndentation * level;
    return `${indentation}px`;
  };

  function handleAddComment(event){
   console.log(comment)
   let date = new Date();
   let dateStr = date.toLocaleDateString("en-US");
   let commentObject = {
      commentString: comment,
      userName: auth.user.userName,
      likes: 0,
      dislikes: 0,
      replies: [],
      date: dateStr
   }
   store.addComment(commentObject);
   setComment('');

  }

  function handleDeleteComment(event, comment){
   store.deleteComment(comment);
  }

  return (
<Card >
   <CardContent sx={{display: "flex", flexDirection: "column", overflow: "scroll", height: "450px", maxHeight: "450px", overflowX: "hidden"}}>
      {store.currentMap && store.currentMap.comments && store.currentMap.comments.length > 0 && (
      <List >
         {store.currentMap.comments.map((comment) => (
         <React.Fragment key={comment.id}>
            <ListItem style={{ marginLeft: getIndentation(0), position: 'relative', display: 'flex', alignItems: 'center', border: '1px solid #ddd', borderRadius: '8px', padding: '0px', marginBottom: '8px'}}>
            {/* <IconButton style={{ position: 'absolute', top: 0, right: 30 }}>
            <ReplyIcon style={{color:'maroon'}}/>
            </IconButton> */}
            <IconButton onClick = {(event) => {
            handleDeleteComment(event, comment)
             }} 
            style={{ position: 'absolute', top: 0, right: 0, 
            visibility: (comment.userName === auth.user.userName) || (store.currentMap.userName === auth.user.userName) ? "visible" : "hidden" }}
            >
               <DeleteIcon style={{color:'maroon'}}/>
            </IconButton>
            <Box style={{ display: 'flex', flexDirection: 'column', alignItems: 'center', color: 'maroon'}}>
            {/* <IconButton >
               <AddIcon style={{color:'maroon'}}/>
            </IconButton>
            <Typography variant="body2" sx={{alignSelf: 'center'}}>{comment.likes}</Typography> */}
            <IconButton>
               {/* <RemoveIcon style={{color:'maroon'}}/> */}
            </IconButton>
            </Box>
            <Avatar src={comment.userImage} alt={comment.author} style={{margin: '10px'}}/>
            <div>
               <Typography variant="subtitle1" color="textSecondary">
                  <b>{comment.userName} </b>
                  <b style={{color: 'black'}}>{comment.date} </b>
               </Typography>
               
               <Typography>{comment.commentString}</Typography>
            </div>
            </ListItem>
            {/* {comment.replies && comment.replies.length > 0 && (
            <List>
               {comment.replies.map((reply) => (
               <React.Fragment key={reply.id}>
                  <ListItem style={{ marginLeft: getIndentation(1), width: '85%', marginRight:-getIndentation(1), position: 'relative', display: 'flex', alignItems: 'center', border: '1px solid #ddd', borderRadius: '8px', padding: '5px', marginBottom: '8px'}}>
                  <IconButton style={{ position: 'absolute', top: 0, right: 30 }}>
                  <ReplyIcon style={{color:'maroon'}}/>
                  </IconButton>
                  <IconButton style={{ position: 'absolute', top: 0, right: 0 }}>
                  <MenuIcon style={{color:'maroon'}}/>
                  </IconButton>
                  <Avatar src={reply.userImage} alt={reply.author} style={{margin: '10px'}} />
                  <div>
                     <Typography variant="subtitle2" color="textSecondary">
                        <b>{reply.author} {reply.date}</b>
                     </Typography>
                     <Typography>{reply.text}</Typography>
                  </div>
                  </ListItem>
               </React.Fragment>
               ))}
            </List>
            )} */}
         </React.Fragment>
         ))}
      </List>)}
   </CardContent>
   <Box style= {{margin:'5px', display: 'flex', alignItems: 'center', justifyContent: 'center'}}>
   <TextField multiline placeholder='Add Comment' onChange={handleInputChange} value={comment} 
   style={{color:'white', width: '70%',
   display: isGuest ?  "none"  : "default"}}></TextField>
   <IconButton onClick={handleAddComment} 
   disabled={comment.length === 0}
   style={{backgroundColor: "#BE8585", marginLeft: 5,
   display: isGuest ?  "none"  : "default"}}>
      <SendIcon />
   </IconButton>
   </Box>
</Card>
  );
};

export default CommentSection;
