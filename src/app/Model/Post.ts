export default interface Post {
  id: number;
  Description: string;
  ImageSorce: string;
  x_Position: number;
  y_Position: number;
  z_Position: number;
  Date: Date;
  UserId: number;
  IsEdited: boolean;
  PermissionLevel: number;
}
