import get from "lodash/get";
import set from "lodash/set";
export const setServiceCategory = (businessServiceData, dispatch, state, setCategory = true) => {
  let nestedServiceData = {};
  businessServiceData.forEach((item) => {
    if (item.code && item.code.indexOf(".") > 0) {
      if (nestedServiceData[item.code.split(".")[0]]) {
        let child = get(nestedServiceData, `${item.code.split(".")[0]}.child`, []);
        child.push(item);
        set(nestedServiceData, `${item.code.split(".")[0]}.child`, child);
      } else {
        set(nestedServiceData, `${item.code.split(".")[0]}.code`, item.code.split(".")[0]);
        set(nestedServiceData, `${item.code.split(".")[0]}.child[0]`, item);
      }
    } else {
      set(nestedServiceData, `${item.code}`, item);
    }
  });
  // console.log(Object.values(nestedServiceData))

  let serviceCategories = Object.values(nestedServiceData).filter((item) => item.code);
  console.log(serviceCategories);
  return serviceCategories;
  // setCategory&&dispatch(
  //   prepareFinalObject(
  //     "applyScreenMdmsData.serviceCategories",
  //     serviceCategories
  //   )
  // );
  // const editingMode = get(
  //   state.screenConfiguration,
  //   "preparedFinalObject.Challan[0].id",
  //   null
  // );

  // dispatch(
  //   handleField(
  //     "newCollection",
  //     "components.div.children.newCollectionServiceDetailsCard.children.cardContent.children.searchContainer.children.serviceType",
  //     "props.value",
  //     get(
  //       state.screenConfiguration,
  //       "preparedFinalObject.Challan[0].serviceType",
  //       null
  //     )
  //   )
  // );
};
