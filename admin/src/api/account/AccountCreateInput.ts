import { UserWhereUniqueInput } from "../user/UserWhereUniqueInput";

export type AccountCreateInput = {
  accountName?: string | null;
  accountNumber: number;
  dateOfBirth?: UserWhereUniqueInput | null;
};
