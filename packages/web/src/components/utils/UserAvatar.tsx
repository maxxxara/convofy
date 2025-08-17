import { Avatar, AvatarFallback, AvatarImage } from "../ui/avatar";

function UserAvatar({
  size = "w-8 h-8",
  className = "text-sm",
  initials = "GG",
}: {
  size?: string;
  className?: string;
  initials?: string;
}) {
  return (
    <Avatar className={size}>
      <AvatarImage src={undefined} alt={"user"} />
      <AvatarFallback className={`font-medium ${className && className}`}>
        {initials}
      </AvatarFallback>
    </Avatar>
  );
}
export default UserAvatar;
