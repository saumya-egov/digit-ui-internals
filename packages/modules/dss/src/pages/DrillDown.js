import React, { useState, useMemo } from "react";
import { useTranslation } from "react-i18next";
import { startOfYear, endOfYear, format, addMonths } from "date-fns";
import { Header } from "@egovernments/digit-ui-react-components";
import CustomTable from "../components/CustomTable";
import FilterContext from "../components/FilterContext";
import GenericChart from "../components/GenericChart";

const getInitialRange = () => {
  const startDate = addMonths(startOfYear(new Date()), 3);
  const endDate = addMonths(endOfYear(new Date()), 3);
  const title = `${format(startDate, "MMM d, yy")} - ${format(endDate, "MMM d, yy")}`;
  const duration = Digit.Utils.dss.getDuration(startDate, endDate);
  return { startDate, endDate, title, duration };
};

const DrillDown = () => {
  const { ulb, chart, title } = Digit.Hooks.useQueryParams();
  const { t } = useTranslation();
  const [filters, setFilters] = useState({
    range: getInitialRange(),
    requestDate: {
      startDate: getInitialRange().startDate.getTime(),
      endDate: getInitialRange().endDate.getTime(),
      interval: "month",
      title: "",
    },
    filters: {
      tenantId: [],
    },
  });
  const provided = useMemo(
    () => ({
      value: filters,
      setValue: setFilters,
    }),
    [filters]
  );
  return (
    <FilterContext.Provider value={provided}>
      <Header>{t(title)}</Header>
      <GenericChart header={""}
        showDownload={true}
        showSearch={true}
        className={"fullWidth"}
      >
        <CustomTable
          data={{ id: chart }}
        />
      </GenericChart>
    </FilterContext.Provider>
  );
}

export default DrillDown;