import { useMutation } from "react-query";
import ApplicationUpdateActions from "../../services/molecules/PT/ApplicationUpdateActions";

const useApplicationActions = (tenantId) => {
  return useMutation((applicationData) => {
    console.log("%c 🐨: useApplicationActions -> applicationData ", "font-size:16px;background-color:#1a263e;color:white;", applicationData);
    ApplicationUpdateActions(applicationData, tenantId);
  });
};

export default useApplicationActions;
