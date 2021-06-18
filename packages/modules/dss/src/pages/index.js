import React, { useMemo, useState, useRef } from "react";
import { useTranslation } from "react-i18next";
import { Header, Loader, ShareIcon, DownloadIcon, FilterIcon, RemoveableTag } from "@egovernments/digit-ui-react-components";
import { startOfYear, endOfYear, format, addMonths } from "date-fns";
import Filters from "../components/Filters";
import Layout from "../components/Layout";
import FilterContext from "../components/FilterContext";
import { useParams } from "react-router-dom";

const getInitialRange = () => {
  const startDate = addMonths(startOfYear(new Date()), 3);
  const endDate = addMonths(endOfYear(new Date()), 3);
  const title = `${format(startDate, "MMM d, yyyy")} - ${format(endDate, "MMM d, yyyy")}`;
  const duration = Digit.Utils.dss.getDuration(startDate, endDate);
  return { startDate, endDate, title, duration };
};

const DashBoard = ({ stateCode }) => {
  const tenantId = Digit.ULBService.getCurrentTenantId();
  const { t } = useTranslation();
  const [filters, setFilters] = useState((data) => ({
    denomination: data?.denomination || "Unit",
    range: data?.range || getInitialRange(),
    requestDate: {
      startDate: data?.range?.startDate.getTime() || getInitialRange().startDate.getTime(),
      endDate: data?.range?.endDate.getTime() || getInitialRange().endDate.getTime(),
      interval: "month",
      title: "",
    },
    filters: {
      tenantId: data?.filters?.tenantId || [],
    },
  }));
  const [isFilterModalOpen, setIsFilterModalOpen] = useState(false);
  const { moduleCode } = useParams();

  const language = Digit.SessionStorage.get("locale") || "en_IN";

  const { isLoading: localizationLoading, data: store } = Digit.Services.useStore({ stateCode, moduleCode, language });
  const { data: screenConfig } = Digit.Hooks.dss.useMDMS(stateCode, "dss-dashboard", "DssDashboard");
  const { data: response, isLoading } = Digit.Hooks.dss.useDashboardConfig(moduleCode);
  const { data: ulbTenants, isLoading: isUlbLoading } = Digit.Hooks.useModuleTenants("FSM");
  const fullPageRef = useRef();
  const provided = useMemo(
    () => ({
      value: filters,
      setValue: setFilters,
      ulbTenants,
    }),
    [filters, isUlbLoading]
  );
  const handlePrint = () => Digit.Download.PDF(fullPageRef, t(dashboardConfig?.[0]?.name));

  const removeULB = (id) => {
    setFilters({ ...filters, filters: { ...filters?.filters, tenantId: [...filters?.filters?.tenantId].filter((tenant, index) => index !== id) } });
  };

  const handleClear = () => {
    setFilters({ ...filters, filters: { ...filters?.filters, tenantId: [] } });
  };

  if (isLoading || isUlbLoading || localizationLoading) {
    return <Loader />;
  }

  const dashboardConfig = response?.responseData;
  return (
    <FilterContext.Provider value={provided}>
      <div ref={fullPageRef}>
        <div className="options">
          <Header styles={{ marginBottom: "0px" }}>{t(dashboardConfig?.[0]?.name)}</Header>
          <div>
            <div className="mrlg">
              <ShareIcon className="mrsm" />
              {t(`ES_DSS_SHARE`)}
            </div>
            <div className="mrsm" onClick={handlePrint}>
              <DownloadIcon className="mrsm" />
              {t(`ES_DSS_DOWNLOAD`)}
            </div>
          </div>
        </div>
        <Filters t={t} ulbTenants={ulbTenants} isOpen={isFilterModalOpen} closeFilters={() => setIsFilterModalOpen(false)} />
        {filters?.filters?.tenantId.length > 0 && (
          <div className="tag-container">
            {filters?.filters?.tenantId?.map((filter, id) => (
              <RemoveableTag key={id} text={t(filter)} onClick={() => removeULB(id)} />
            ))}
            <p className="clearText" onClick={handleClear}>
              {t(`DSS_FILTER_CLEAR`)}
            </p>
          </div>
        )}
        <div className="options-m">
          <div>
            <FilterIcon onClick={() => setIsFilterModalOpen(!isFilterModalOpen)} style />
          </div>
          <div>
            <ShareIcon />
            {t(`ES_DSS_SHARE`)}
          </div>
          <div>
            <DownloadIcon />
            {t(`ES_DSS_DOWNLOAD`)}
          </div>
        </div>
        {dashboardConfig?.[0]?.visualizations.map((row, key) => {
          return <Layout rowData={row} key={key} />;
        })}
      </div>
    </FilterContext.Provider>
  );
};

export default DashBoard;
