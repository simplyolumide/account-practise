import { UserWhereUniqueInput } from "../user/UserWhereUniqueInput";

export type AccountWhereInput = {
  accountName?: string;
  accountNumber?: number;
  createdAt?: Date;
  dateOfBirth?: UserWhereUniqueInput;
  id?: string;
  updatedAt?: Date;
};
