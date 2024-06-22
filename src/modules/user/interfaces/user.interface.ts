import { Document, Types } from 'mongoose';

import { RoleTypeEnum } from '../../../common/enums/role-type.enum';

export interface IUserDocument extends Document {
  _id: string;
  firstName: string;
  lastName: string;
  email: string;
  password: string;
  role: RoleTypeEnum;
  isEmailVerified: boolean;
  isDeleted: boolean;
  passwordChangedAt?: Date;
  address?: string;
  phone?: string;
  website?: string;
  company?: string;
  bio?: string;
  avatar: Types.ObjectId;
  discountCode?: string;
  facebookId?: string;
  googleId?: string;
}
