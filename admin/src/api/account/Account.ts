import { UserWhereUniqueInput } from "../user/UserWhereUniqueInput";

export type Account = {
  accountName: string | null;
  accountNumber: number;
  createdAt: Date;
  dateOfBirth?: UserWhereUniqueInput | null;
  id: string;
  updatedAt: Date;
};
