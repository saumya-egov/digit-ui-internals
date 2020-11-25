import React, { useEffect, useState } from "react";

const useComplaintDetails = ({ tenantId, id }) => {
  const [complaintDetails, setComplaintDetails] = useState({});

  async function getThumbnails(ids, tenantId) {
    const res = await Digit.UploadServices.Filefetch(ids, tenantId);
    if (res.fileStoreIds && res.fileStoreIds.length !== 0) {
      const thumbnails = res.fileStoreIds.map((o) => o.url.split(",")[3]);
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

      if (ComplaintDetailsResponse && serviceDefs) {
        const ids = ComplaintDetailsResponse.workflow.verificationDocuments
          .filter((doc) => doc.documentType === "PHOTO")
          .map((photo) => photo.fileStoreId);
        const thumbnails = await getThumbnails(ids, tenantId);
        const details = {
          CS_COMPLAINT_DETAILS_COMPLAINT_NO: id,
          CS_COMPLAINT_DETAILS_COMPLAINT_TYPE: serviceDefs.find((def) => def.serviceCode === ComplaintDetailsResponse.service.serviceCode).menuPath,
          CS_COMPLAINT_DETAILS_COMPLAINT_SUBTYPE: ComplaintDetailsResponse.service.serviceCode,
          CS_COMPLAINT_DETAILS_LOCALITY: ComplaintDetailsResponse.service.address.locality.name,
          CS_COMPLAINT_DETAILS_CITY: ComplaintDetailsResponse.service.address.city,
          CS_COMPLAINT_DETAILS_LANDMARK: ComplaintDetailsResponse.service.address.landmark,
          CS_COMPLAINT_DETAILS_GEOLOCATION: ComplaintDetailsResponse.service.address.geolocation,
          CS_COMPLAINT_DETAILS_ADDITIONAL_DETAILS: ComplaintDetailsResponse.service.additionalDetail,
          thumbnails: thumbnails,
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
