import * as React from "react";
import { Link } from "react-router-dom";
import { AxiosError } from "axios";
import { useQuery } from "react-query";
import { api } from "../api";

import {
  DataGrid,
  DataField,
  SortData,
  DataGridRow,
  DataGridCell,
  EnumTitleType,
  Button,
  Snackbar,
  TimeSince,
} from "@amplication/design-system";

import { UserTitle } from "../user/UserTitle";
import { Account as TAccount } from "../api/account/Account";

type Data = TAccount[];

const SORT_DATA: SortData = {
  field: null,
  order: null,
};

const FIELDS: DataField[] = [
  {
    name: "id",
    title: "ID",
    sortable: false,
  },
  {
    name: "accountName",
    title: "AccountName",
    sortable: false,
  },
  {
    name: "accountNumber",
    title: "AccountNumber",
    sortable: false,
  },
  {
    name: "createdAt",
    title: "Created At",
    sortable: false,
  },
  {
    name: "dateOfBirth",
    title: "DateOfBirth",
    sortable: false,
  },
  {
    name: "updatedAt",
    title: "Updated At",
    sortable: false,
  },
];

export const AccountList = (): React.ReactElement => {
  const { data, error, isError } = useQuery<Data, AxiosError>(
    "list-/api/accounts",
    async () => {
      const response = await api.get("/api/accounts");
      return response.data;
    }
  );

  return (
    <>
      <DataGrid
        fields={FIELDS}
        titleType={EnumTitleType.PageTitle}
        title={"Accounts"}
        loading={false}
        sortDir={SORT_DATA}
        toolbarContentEnd={
          <Link to={"/accounts/new"}>
            <Button>Create Account </Button>
          </Link>
        }
      >
        {data &&
          data.map((item: TAccount) => {
            return (
              <DataGridRow key={item.id} clickData={item}>
                <DataGridCell>
                  <Link className="entity-id" to={`${"/accounts"}/${item.id}`}>
                    {item.id}
                  </Link>
                </DataGridCell>
                <DataGridCell>
                  <>{item.accountName}</>
                </DataGridCell>
                <DataGridCell>
                  <>{item.accountNumber}</>
                </DataGridCell>
                <DataGridCell>
                  <TimeSince time={item.createdAt} />
                </DataGridCell>
                <DataGridCell>
                  <UserTitle id={item.dateOfBirth?.id} />
                </DataGridCell>
                <DataGridCell>
                  <TimeSince time={item.updatedAt} />
                </DataGridCell>
              </DataGridRow>
            );
          })}
      </DataGrid>
      <Snackbar open={isError} message={error?.response?.data?.message} />
    </>
  );
};
