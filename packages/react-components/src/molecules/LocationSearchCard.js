import React from "react";
import PropTypes from "prop-types";
// import { Card, CardHeader, CardText, LocationSearch, SubmitBar, LinkButton } from "@egovernments/digit-ui-react-components";
import { useTranslation } from "react-i18next";

import Card from "../atoms/Card";
import CardHeader from "../atoms/CardHeader";
import CardText from "../atoms/CardText";
import LocationSearch from "../atoms/LocationSearch";
import SubmitBar from "../atoms/SubmitBar";
import LinkButton from "../atoms/LinkButton";

const LocationSearchCard = ({ header, cardText, nextText, skipAndContinueText, skip, onSave, onChange, disabled }) => {
  let isDisabled = false || disabled;
  const onLocationChange = (val) => {
    isDisabled = val ? false : true;
    onChange(val);
  };
  return (
    <Card>
      <CardHeader>{header}</CardHeader>
      <CardText>
        {/* Click and hold to drop the pin to complaint location. If you are not
        able to pin the location you can skip the continue for next step. */}
        {cardText}
      </CardText>

      <LocationSearch onChange={onLocationChange} />

      <SubmitBar label={nextText} onSubmit={onSave} disabled={isDisabled} />
      {skip ? <LinkButton onClick={skip} label={skipAndContinueText} /> : null}
    </Card>
  );
};

LocationSearchCard.propTypes = {
  header: PropTypes.string,
  cardText: PropTypes.string,
  nextText: PropTypes.string,
  skipAndContinueText: PropTypes.string,
  skip: PropTypes.bool,
  onSave: PropTypes.func,
  onChange: PropTypes.func,
};

LocationSearchCard.defaultProps = {
  header: "",
  cardText: "",
  nextText: "",
  skipAndContinueText: "",
  skip: false,
  onSave: null,
  onChange: () => {},
};

export default LocationSearchCard;
