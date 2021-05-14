import * as React from "react";
import { useMutation } from "react-query";
import { useHistory } from "react-router-dom";
import { AxiosError } from "axios";
import { Formik } from "formik";
import {
  Form,
  EnumFormStyle,
  Button,
  FormHeader,
  Snackbar,
  TextField,
} from "@amplication/design-system";
import { api } from "../api";
import useBreadcrumbs from "../components/breadcrumbs/use-breadcrumbs";
import { UserSelect } from "../user/UserSelect";
import { Account as TAccount } from "../api/account/Account";
import { AccountCreateInput } from "../api/account/AccountCreateInput";

const INITIAL_VALUES = {} as AccountCreateInput;

export const CreateAccount = (): React.ReactElement => {
  useBreadcrumbs("/accounts/new", "Create Account");
  const history = useHistory();

  const [create, { error, isError, isLoading }] = useMutation<
    TAccount,
    AxiosError,
    AccountCreateInput
  >(
    async (data) => {
      const response = await api.post("/api/accounts", data);
      return response.data;
    },
    {
      onSuccess: (data, variables) => {
        history.push(`${"/accounts"}/${data.id}`);
      },
    }
  );
  const handleSubmit = React.useCallback(
    (values: AccountCreateInput) => {
      void create(values);
    },
    [create]
  );
  return (
    <>
      <Formik initialValues={INITIAL_VALUES} onSubmit={handleSubmit}>
        <Form
          formStyle={EnumFormStyle.Horizontal}
          formHeaderContent={
            <FormHeader title={"Create Account"}>
              <Button type="submit" disabled={isLoading}>
                Save
              </Button>
            </FormHeader>
          }
        >
          <div>
            <TextField label="AccountName" name="accountName" />
          </div>
          <div>
            <TextField
              type="number"
              step={1}
              label="AccountNumber"
              name="accountNumber"
            />
          </div>
          <div>
            <UserSelect label="DateOfBirth" name="dateOfBirth.id" />
          </div>
        </Form>
      </Formik>
      <Snackbar open={isError} message={error?.response?.data?.message} />
    </>
  );
};
