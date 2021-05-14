import { InputType, Field } from "@nestjs/graphql";
import { ApiProperty } from "@nestjs/swagger";
import { IsString, IsOptional, IsInt, ValidateNested } from "class-validator";
import { UserWhereUniqueInput } from "../../user/base/UserWhereUniqueInput";
import { Type } from "class-transformer";
@InputType()
class AccountUpdateInput {
  @ApiProperty({
    required: false,
    type: String,
  })
  @IsString()
  @IsOptional()
  @Field(() => String, {
    nullable: true,
  })
  accountName?: string | null;
  @ApiProperty({
    required: false,
    type: Number,
  })
  @IsInt()
  @IsOptional()
  @Field(() => Number, {
    nullable: true,
  })
  accountNumber?: number;
  @ApiProperty({
    required: false,
    type: UserWhereUniqueInput,
  })
  @ValidateNested()
  @Type(() => UserWhereUniqueInput)
  @IsOptional()
  @Field(() => UserWhereUniqueInput, {
    nullable: true,
  })
  dateOfBirth?: UserWhereUniqueInput | null;
}
export { AccountUpdateInput };
