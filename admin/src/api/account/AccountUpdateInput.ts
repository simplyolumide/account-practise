import { UserWhereUniqueInput } from "../user/UserWhereUniqueInput";

export type AccountUpdateInput = {
  accountName?: string | null;
  accountNumber?: number;
  dateOfBirth?: UserWhereUniqueInput | null;
};
