import React, { useEffect, useState } from "react";
import { CardLabel, LabelFieldPair}  from "@egovernments/digit-ui-react-components";
const Banner =( {t, config})=>{
    return(
        <LabelFieldPair>
        <CardLabel className="card-label-smaller" style={{color:"white"}}>.</CardLabel>
    <span className="form-field" style={{color:"gray"}}>{t(config?.texts?.header)}</span>
    </LabelFieldPair>)
}
export default Banner;