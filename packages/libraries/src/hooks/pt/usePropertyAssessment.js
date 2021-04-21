import { PTService } from "../../services/elements/PT";
import { useMutation } from "react-query";

const usePropertyAssessment = (tenantId, config = {}) => {
  console.log("%c ⚒️: usePropertyAssessment -> tenantId ", "font-size:16px;background-color:#3a6aa4;color:white;", tenantId);
  return useMutation((data) => PTService.assessmentCreate(data, tenantId));
};

export default usePropertyAssessment;
