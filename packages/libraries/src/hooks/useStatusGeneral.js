import { useQuery } from "react-query";

/**
 *
 * @param {tenantId} optional
 * @param {businessServive} neccessory
 */

export const useApplicationStatusGeneral = ({ businessService, tenantId }, config) => {
  tenantId = tenantId || Digit.ULBService.getCurrentTenantId();

  const fetch = async () =>
    await Digit.WorkflowService.init(tenantId, businessService).then((res) => {
      const { BusinessServices: data } = res;

      const { states, businessServiceSla } = data?.[0];

      const addRoleToState = (state) => {
        const roles = state.actions?.map((act) => act.roles).flat();
        return { ...state, roles };
      };

      const roleStateMapArray = states?.map(addRoleToState);

      console.log(roleStateMapArray);

      const userRoleStates = roleStateMapArray.filter(({ roles }) => roles?.some((role) => userRoles.includes(role)));
      const otherRoleStates = roleStateMapArray.filter(({ roles }) => roles?.some((role) => !userRoles.includes(role)));
      return { userRoleStates, otherRoleStates, businessServiceSla };
    });

  const userInfo = Digit.UserService.getUser();
  const userRoles = userInfo.info.roles.map((roleData) => roleData.code);

  const queryData = useQuery(["workflow_states", businessService, tenantId], () => fetch(), { ...config });

  return queryData;
};
