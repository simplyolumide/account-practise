import React, { useMemo } from "react";
import { AxiosError } from "axios";
import { useQuery } from "react-query";
import { api } from "../api";
import { SelectField, SelectFieldProps } from "@amplication/design-system";
import { Account as TAccount } from "../api/account/Account";

type Data = TAccount[];

type Props = Omit<SelectFieldProps, "options">;

export const AccountSelect = (props: Props) => {
  const { data } = useQuery<Data, AxiosError>(
    "select-/api/accounts",
    async () => {
      const response = await api.get("/api/accounts");
      return response.data;
    }
  );

  const options = useMemo(() => {
    return data
      ? data.map((item) => ({
          value: item.id,
          label:
            item.accountName && item.accountName.length
              ? item.accountName
              : item.id,
        }))
      : [];
  }, [data]);

  return <SelectField {...props} options={options} />;
};
