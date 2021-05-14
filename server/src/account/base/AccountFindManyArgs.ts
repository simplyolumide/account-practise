import { ArgsType, Field } from "@nestjs/graphql";
import { AccountWhereInput } from "./AccountWhereInput";

@ArgsType()
class AccountFindManyArgs {
  @Field(() => AccountWhereInput, { nullable: true })
  where?: AccountWhereInput;
}

export { AccountFindManyArgs };
