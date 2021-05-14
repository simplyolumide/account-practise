import React from "react";
import { Link } from "react-router-dom";
import { AxiosError } from "axios";
import { useQuery } from "react-query";
import { api } from "../api";
import { Account as TAccount } from "../api/account/Account";

type Props = { id: string };

export const AccountTitle = ({ id }: Props) => {
  const { data, isLoading, isError, error } = useQuery<
    TAccount,
    AxiosError,
    [string, string]
  >(["get-/api/accounts", id], async (key: string, id: string) => {
    const response = await api.get(`${"/api/accounts"}/${id}`);
    return response.data;
  });

  if (isLoading) {
    return <span>Loading...</span>;
  }

  if (isError) {
    return <span>Error: {error?.message}</span>;
  }

  return (
    <Link to={`${"/api/accounts"}/${id}`} className="entity-id">
      {data?.accountName && data?.accountName.length
        ? data.accountName
        : data?.id}
    </Link>
  );
};
