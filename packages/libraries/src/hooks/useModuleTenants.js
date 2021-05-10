import React from "react";
import { useQuery } from "react-query";
import { useTranslation } from "react-i18next";

const useModuleTenants = (module, config = {}) => {
  const { t } = useTranslation();

  return useQuery(["ULB_TENANTS", module], () => Digit.SessionStorage.get("initData").modules.find((e) => e.module === module), {
    select: (data) =>
      data.tenants.map((tenant) => ({
        ...tenant,
        ulbKey: t(`TENANT_TENANTS_${tenant.code.toUpperCase().replace(".", "_")}`),
        ddrKey: t(`DDR_${tenant.code.toUpperCase().replace(".", "_")}`),
      })),
    ...config,
  });
};
export default useModuleTenants;
