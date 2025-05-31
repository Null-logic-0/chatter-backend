import { UserDocument } from '../entities/user.document';

export interface UserInterface extends Omit<UserDocument, 'password'> {
  imageUrl: string;
}
