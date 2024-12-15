import { VideoApi } from "@/api";
import { useAuth } from "@/services/authService";
import { Avatar, Box, Button, List, ListItem, ListItemAvatar, ListItemText, TextField, Typography } from "@mui/material";
import { useQuery } from "@tanstack/react-query";
import { formatDistanceToNow } from "date-fns";
import { id } from "date-fns/locale";
import { useState } from "react";
import { useSearchParams } from "react-router-dom";

interface Comment {
  id: string;
  author: string;
  content: string;
  timestamp: Date;
}

interface CommentSectionProps {
  videoId: string;
}
export default function CommentSection({videoId}: CommentSectionProps) {

  const videoApi = new VideoApi();
  const auth = useAuth();


  const { isPending, error, data } = useQuery({
    queryKey: ["videoVideoIdGet", videoId],
    queryFn: () =>
      videoApi.videoVideoIdGet({
        videoId,
      }),
  });


  const commentsFromApi = data?.comments.map((comment) => ({
    id: comment.id,
    author: comment.author,
    content: comment.text,
    timestamp: comment.timeStamp,
    
  }));




  const [comments, setComments] = useState<Comment[]>(commentsFromApi || []);

  
  const [newComment, setNewComment] = useState("");

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
      if (newComment.trim()) {
      const comment: Comment = {
        id: comments.length.toString(), // In a real app, this would be a UUID
        author: auth.user?.userId!, // In a real app, this would be the logged-in user
        content: newComment.trim(),
        timestamp: new Date(),
      };
      setComments([comment, ...comments]);
      videoApi.videoVideoIdCommentPost({
        videoId : videoId,
        videoVideoIdCommentPostRequest : {comment: newComment.trim(),},
        
      })

      setNewComment("");
    }
      
  };

  return (
    <Box margin="auto">
      <Typography variant="h1" marginTop={"0.5rem"} fontWeight={500} fontSize={"1.2rem"}>
        Comments
      </Typography>

      <form onSubmit={handleSubmit}>
        <TextField fullWidth multiline rows={1} variant="outlined" value={newComment} onChange={(e) => setNewComment(e.target.value)} placeholder="Write a comment..." />
        <Button
          type="submit"
          variant="contained"
          color="primary"
          sx={{
            marginTop: "0.5rem",
          }}
        >
          Post Comment
        </Button>
      </form>

      <List>
        {comments.map((comment) => (
          <ListItem
            key={comment.id}
            alignItems="flex-start"
            sx={{
              padding: 0,
            }}
          >
            <ListItemAvatar>
              <Avatar alt={comment.author} />
            </ListItemAvatar>
            <ListItemText
              primary={
                <>
                  <Typography component="span" variant="subtitle1" color="text.primary">
                    {comment.author}
                  </Typography>
                  {" — "}
                  <Typography component="span" variant="body2" color="text.secondary">
                    {formatDistanceToNow(comment.timestamp, { addSuffix: true })}
                  </Typography>
                </>
              }
              secondary={comment.content}
            />
          </ListItem>
        ))}
      </List>
    </Box>
  );
}
