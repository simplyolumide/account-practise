import * as React from "react";
import { Switch } from "react-router-dom";
import PrivateRoute from "../components/PrivateRoute";
import useBreadcrumbs from "../components/breadcrumbs/use-breadcrumbs";
import { AccountList } from "./AccountList";
import { CreateAccount } from "./CreateAccount";
import { ViewAccount } from "./ViewAccount";

export const AccountIndex = (): React.ReactElement => {
  useBreadcrumbs("/accounts/", "Accounts");

  return (
    <Switch>
      <PrivateRoute exact path={"/accounts/"} component={AccountList} />
      <PrivateRoute path={"/accounts/new"} component={CreateAccount} />
      <PrivateRoute path={"/accounts/:id"} component={ViewAccount} />
    </Switch>
  );
};
