import React from "react"
import { useQuery } from "react-query"
import { TLService } from "../../services/elements/TL"
import useInbox from "../useInbox"

const useTLInbox = ({ tenantId, filters, config }) => {
    const { inbox, wf, isLoading } = useInbox({serviceCall: TLService.TLsearch, tenantId, filters, config})

    const compiledData = inbox?.map( application => ({
        applicationId: application.applicationNumber,
        date: application.applicationDate,
        locality: `${application?.tenantId?.toUpperCase()?.split(".")?.join("_")}_REVENUE_${application?.tradeLicenseDetail?.address?.locality?.code?.toUpperCase()}`,
        status: application.status,
        owner: wf[application.applicationNumber]?.assigner?.name,
        sla: Math.round(wf[application.applicationNumber]?.businesssServiceSla / (24 * 60 * 60 * 1000))
    }))
    
    return isLoading ? { isLoading, data: null } : { isLoading, data: compiledData }
}

export default useTLInbox