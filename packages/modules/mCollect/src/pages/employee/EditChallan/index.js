import React from "react";
import { useTranslation } from "react-i18next";
import { useParams } from "react-router-dom";
import EditForm from "./EditForm";

const EditChallan = () => {
  //debugger;
  let filters = {};
  const tenantId = Digit.ULBService.getCurrentTenantId();
  const { t } = useTranslation();
  //const tenantId = userInfo?.info?.permanentCity;

  let { challanNo: challanNo } = useParams();
  console.log(challanNo);
  //if (challanNo) filters.challanNo = challanNo;
  //if (businesService) filters.businesService = businesService;

  const { isLoading, data: result } = Digit.Hooks.mcollect.useMCollectSearch({ tenantId, filters: { challanNo } });
  console.log("result");
  console.log(result);
  debugger;
  //return;
  return result && !isLoading ? <EditForm ChallanData={result?.challans} tenantId={tenantId} /> : null;
};
export default EditChallan;
