import * as common from "@nestjs/common";
import * as graphql from "@nestjs/graphql";
import * as nestAccessControl from "nest-access-control";
import * as gqlBasicAuthGuard from "../auth/gqlBasicAuth.guard";
import * as gqlACGuard from "../auth/gqlAC.guard";
import { AccountResolverBase } from "./base/account.resolver.base";
import { Account } from "./base/Account";
import { AccountService } from "./account.service";

@graphql.Resolver(() => Account)
@common.UseGuards(gqlBasicAuthGuard.GqlBasicAuthGuard, gqlACGuard.GqlACGuard)
export class AccountResolver extends AccountResolverBase {
  constructor(
    protected readonly service: AccountService,
    @nestAccessControl.InjectRolesBuilder()
    protected readonly rolesBuilder: nestAccessControl.RolesBuilder
  ) {
    super(service, rolesBuilder);
  }
}
