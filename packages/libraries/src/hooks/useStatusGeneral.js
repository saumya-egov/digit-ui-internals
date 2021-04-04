import { useQuery } from "react-query";

/**
 *
 * @param {tenantId} optional
 * @param {businessServive} neccessory
 */

const businessServiceParamMap = {
  PT: [
    "PT.LEGACY",
    "PT.NOUSE",
    "CreatePT",
    "PT.CREATEWITHWNS",
    "PT.MUTATION1",
    "PT.MUTATION",
    "PT.CREATE",
    "PT.CREATEWITHWNS.REVAMP",
    "PT.CREATE.DEPRECATED",
    "CreateProperty",
    "PT.MUTATION3",
  ],
};

export const useApplicationStatusGeneral = ({ businessService, tenantId, translatePrefix }, config) => {
  tenantId = tenantId || Digit.ULBService.getCurrentTenantId();

  const userInfo = Digit.UserService.getUser();
  const userRoles = userInfo.info.roles.map((roleData) => roleData.code);

  const fetch = async () =>
    await Digit.WorkflowService.init(tenantId).then((res) => {
      const { BusinessServices: data } = res;
      return data;
    });

  const select = (data) => {
    let states = [];
    const requestedServices = businessServiceParamMap[businessService] || [businessService];

    const filteredData = data.filter((e) => requestedServices.includes(e.businessService));
    filteredData.forEach((service) => {
      states = [...states, ...service.states];
    });

    // console.log(JSON.stringify(data.filter((service) => service.business === "PT").map((e) => e.businessService)));

    const addRoleToState = (state) => {
      const roles = state.actions?.map((act) => act.roles).flat();
      return { ...state, roles };
    };

    const roleStateMapArray = states?.map(addRoleToState);

    const userRoleStates = roleStateMapArray.filter(({ roles }) => roles?.some((role) => userRoles.includes(role)));
    const otherRoleStates = roleStateMapArray.filter(({ roles }) => !roles?.some((role) => userRoles.includes(role)));

    const convertStateToOptions = (state, translatePrefix) => {
      const { applicationStatus: code, roles } = state;
      return { code, roles, name: translatePrefix + code };
    };

    const userRoleOptions = userRoleStates.map((state) => convertStateToOptions(state, translatePrefix));
    const otherRoleOptions = otherRoleStates.map((state) => convertStateToOptions(state, translatePrefix)).filter((e) => e.code);
    console.log("returned from status select");
    return { userRoleOptions, otherRoleOptions };
  };

  const queryData = useQuery(["workflow_states", tenantId], () => fetch(), { select, ...config });

  return queryData;
};
