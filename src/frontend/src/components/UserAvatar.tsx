import { Avatar } from "@mui/material";
import { AuthLoginPost200ResponseUser } from "@/api";


interface UserAvatarProps {
    user: AuthLoginPost200ResponseUser | null;
 }


export default function UserAvatar({ user }: UserAvatarProps) {
    const firstLetters = (name: string)  => {
        const names = name.split(" ");
        return names.map((n) => n[0]).join("").toUpperCase();
      };
    
      if (!user) {
        return <Avatar   sx={{
          width: 100, 
          height: 100,
          marginBottom: 2,
          marginTop: 2,
        }} />;
      }

      return (
        user.profilePictureUrl ? (<Avatar src={user.profilePictureUrl} />) : (<Avatar>{firstLetters(user.name ?? "A")}</Avatar>)
      );
};