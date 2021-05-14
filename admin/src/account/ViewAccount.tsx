import * as React from "react";
import { useRouteMatch, useHistory } from "react-router-dom";
import { AxiosError } from "axios";
import { useQuery, useMutation } from "react-query";
import { Formik } from "formik";
import pick from "lodash.pick";

import {
  Form,
  EnumFormStyle,
  Button,
  FormHeader,
  Snackbar,
  EnumButtonStyle,
  TextField,
} from "@amplication/design-system";

import { api } from "../api";
import useBreadcrumbs from "../components/breadcrumbs/use-breadcrumbs";
import { UserSelect } from "../user/UserSelect";
import { Account as TAccount } from "../api/account/Account";
import { AccountUpdateInput } from "../api/account/AccountUpdateInput";

export const ViewAccount = (): React.ReactElement => {
  const match = useRouteMatch<{ id: string }>("/accounts/:id/");
  const id = match?.params?.id;
  const history = useHistory();

  const { data, isLoading, isError, error } = useQuery<
    TAccount,
    AxiosError,
    [string, string]
  >(["get-/api/accounts", id], async (key: string, id: string) => {
    const response = await api.get(`${"/api/accounts"}/${id}`);
    return response.data;
  });

  const [deleteEntity] = useMutation<TAccount, AxiosError>(
    async (data) => {
      const response = await api.delete(`${"/api/accounts"}/${id}`, data);
      return response.data;
    },
    {
      onSuccess: (data, variables) => {
        history.push("//accounts");
      },
    }
  );

  const [
    update,
    { error: updateError, isError: updateIsError, isLoading: updateIsLoading },
  ] = useMutation<TAccount, AxiosError, AccountUpdateInput>(async (data) => {
    const response = await api.patch(`${"/api/accounts"}/${id}`, data);
    return response.data;
  });

  const handleSubmit = React.useCallback(
    (values: AccountUpdateInput) => {
      void update(values);
    },
    [update]
  );

  useBreadcrumbs(match?.url, data?.accountName);

  const handleDelete = React.useCallback(() => {
    void deleteEntity();
  }, [deleteEntity]);

  const errorMessage =
    updateError?.response?.data?.message || error?.response?.data?.message;

  const initialValues = React.useMemo(
    () => pick(data, ["accountName", "accountNumber", "dateOfBirth"]),
    [data]
  );

  if (isLoading) {
    return <span>Loading...</span>;
  }

  return (
    <>
      {data && (
        <Formik initialValues={initialValues} onSubmit={handleSubmit}>
          <Form
            formStyle={EnumFormStyle.Horizontal}
            formHeaderContent={
              <FormHeader
                title={`${"Account"} ${
                  data?.accountName && data?.accountName.length
                    ? data.accountName
                    : data?.id
                }`}
              >
                <Button
                  type="button"
                  disabled={updateIsLoading}
                  buttonStyle={EnumButtonStyle.Secondary}
                  icon="trash_2"
                  onClick={handleDelete}
                >
                  Delete
                </Button>
                <Button type="submit" disabled={updateIsLoading}>
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
      )}
      <Snackbar open={isError || updateIsError} message={errorMessage} />
    </>
  );
};
