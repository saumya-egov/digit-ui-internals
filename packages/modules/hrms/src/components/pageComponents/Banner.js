import React, { useEffect, useState } from "react";
import {InfoBanner} from "@egovernments/digit-ui-react-components"
const Banner =( {t, config})=>{
    return(<InfoBanner text={config?.texts?.header} label={config?.texts?.headerCaption}/>)
}
export default Banner;