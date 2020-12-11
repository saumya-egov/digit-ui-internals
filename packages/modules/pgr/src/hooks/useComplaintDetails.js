import React, { useEffect, useState } from "react";
import { useTranslation } from "react-i18next";

const useComplaintDetails = ({ tenantId, id }) => {
  const [complaintDetails, setComplaintDetails] = useState({});
  const { t } = useTranslation();

  async function getThumbnails(ids, tenantId) {
    const res = await Digit.UploadServices.Filefetch(ids, tenantId);
    if (res.data.fileStoreIds && res.data.fileStoreIds.length !== 0) {
      const thumbnails = res.data.fileStoreIds.map((o) => o.url.split(",")[3]);
      return thumbnails;
    } else {
      return null;
    }
  }

  useEffect(() => {
    (async () => {
      var serviceDefs = null;
      if (Digit.SessionStorage.get("serviceDefs")) {
        serviceDefs = Digit.SessionStorage.get("serviceDefs");
      } else {
        const criteria = {
          type: "serviceDefs",
          details: {
            tenantId: tenantId,
            moduleDetails: [
              {
                moduleName: "RAINMAKER-PGR",
                masterDetails: [
                  {
                    name: "ServiceDefs",
                  },
                ],
              },
            ],
          },
        };

        serviceDefs = await Digit.MDMSService.getDataByCriteria(criteria);
        serviceDefs ? Digit.SessionStorage.set("serviceDefs", serviceDefs) : null;
      }
      const ComplaintDetailsResponse = (await Digit.PGRService.search(tenantId, { serviceRequestId: id })).ServiceWrappers[0];
      console.log("COmplaint details response =============>>>>>", ComplaintDetailsResponse);
      if (ComplaintDetailsResponse && serviceDefs) {
        Digit.SessionStorage.set("complaintDetails", ComplaintDetailsResponse);
        const ids = ComplaintDetailsResponse.workflow.verificationDocuments
          ? ComplaintDetailsResponse.workflow.verificationDocuments.filter((doc) => doc.documentType === "PHOTO").map((photo) => photo.fileStoreId)
          : null;

        const thumbnails = ids ? await getThumbnails(ids, tenantId) : null;

        const details = {
          CS_COMPLAINT_DETAILS_COMPLAINT_NO: id,
          CS_COMPLAINT_DETAILS_COMPLAINT_TYPE: t(
            "SERVICEDEFS." + serviceDefs.find((def) => def.serviceCode === ComplaintDetailsResponse.service.serviceCode).menuPath.toUpperCase()
          ),
          CS_COMPLAINT_DETAILS_COMPLAINT_SUBTYPE: t("SERVICEDEFS." + ComplaintDetailsResponse.service.serviceCode.toUpperCase()),
          CS_COMPLAINT_DETAILS_APPLICATION_STATUS: t(`CS_COMMON_${ComplaintDetailsResponse.service.applicationStatus}`),
          CS_COMPLAINT_DETAILS_LOCALITY: ComplaintDetailsResponse.service.address.locality.code.includes("_")
            ? t(ComplaintDetailsResponse.service.address.locality.code.toUpperCase())
            : t(
              "PB_" +
              ComplaintDetailsResponse.service.address.city.toUpperCase() +
              "_ADMIN_" +
              ComplaintDetailsResponse.service.address.locality.code
            ),
          CS_COMPLAINT_DETAILS_CITY: t(ComplaintDetailsResponse.service.address.city),
          CS_COMPLAINT_DETAILS_LANDMARK: ComplaintDetailsResponse.service.address.landmark,
          CS_COMPLAINT_DETAILS_GEOLOCATION: ComplaintDetailsResponse.service.address.geoLocation,
          CS_COMPLAINT_DETAILS_ADDITIONAL_DETAILS: ComplaintDetailsResponse.service.address.additionalDetail,
          CS_COMPLAINT_DETAILS_BUILDING_NAME: ComplaintDetailsResponse.service.address.buildingName,
          CS_COMPLAINT_DETAILS_DOOR: ComplaintDetailsResponse.service.address.doorNo,
          CS_COMPLAINT_DETAILS_PLOT_NO: ComplaintDetailsResponse.service.address.plotNo,
          CS_COMPLAINT_DETAILS_STREET: ComplaintDetailsResponse.service.address.street,
          CS_COMPLAINT_DETAILS_PINCODE: ComplaintDetailsResponse.service.address.pincode,
          CS_COMPLAINT_FILED_DATE: Digit.DateUtils.ConvertTimestampToDate(ComplaintDetailsResponse.service.auditDetails.createdTime),
          thumbnails: thumbnails,
          workflow: ComplaintDetailsResponse.workflow,
          audit: {
            citizen: ComplaintDetailsResponse.service.citizen,
            details: ComplaintDetailsResponse.service.auditDetails,
            source: ComplaintDetailsResponse.service.source,
          },
        };
        setComplaintDetails(details);
      } else {
        console.log("error fetching complaint details or service defs");
      }
    })();
  }, [tenantId, id]);
  return complaintDetails;
};

export default useComplaintDetails;
