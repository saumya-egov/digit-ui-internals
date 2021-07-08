import React from "react";
import { useQuery } from "react-query";
import { WorkflowService } from "../services/elements/WorkFlow";

const mapWfBybusinessId = (wfs) => {
    return wfs.reduce((object, item) => {
      return { ...object, [item["businessId"]]: item };
    }, {});
};

const useInbox = ({serviceCall, tenantId, filters, config}) => {
    
    const { data: inboxData, isLoading: inboxLoading, isSuccess: gotInboxData } = useQuery([tenantId, ...Object.keys(filters)?.map( e => filters?.[e] ),], () => serviceCall({tenantId, filters}), 
    {
        ...config
    })
    const businessIds = inboxData?.Licenses?.map( application  => application.applicationNumber ).join(",")

    const { data: workFlowData, isLoading: workflowLoading, isSuccess: gotWorkflowData } = useQuery([tenantId, {businessIds}] , () => WorkflowService.getAllApplication(tenantId,{businessIds}), {
        enabled: gotInboxData && !!businessIds
    })

    return workFlowData?.ProcessInstances && inboxData?.Licenses ? { inbox: inboxData.Licenses, wf: mapWfBybusinessId(workFlowData.ProcessInstances), isLoading: false } : { inbox: null, wf: null , isLoading: true }

}

export default useInbox;