export default interface Post {
  id: number;
  description: string;
  imageSorce: string;
  x_Position: number;
  y_Position: number;
  z_Position: number | null;
  date: Date;
  userId: number;
  IsEdited: boolean;
  PermissionLevel: number;
  tags: any[];
  userTaggedPost: any[];
  tagged: any[];
  comments: any[];
}
