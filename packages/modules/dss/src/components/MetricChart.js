import React from "react";
import { Card, CardSubHeader } from "@egovernments/digit-ui-react-components";
// import { ArrowDown } from "@egovernments/digit-ui-react-components";

const chartData = {
  "noUnit" : true,
  "charts" : [
     {
        "headers" : [],
        "chartType" : "metric",
        "name" : "DSS_TOTAL_COLLECTION_TODAY",
        "filter" : {
           "title" : "TODAY"
        },
        "id" : "todaysCollection",
        "code" : ""
     },
     {
        "id" : "totalCollection",
        "code" : "",
        "filter" : "",
        "chartType" : "metric",
        "name" : "DSS_TOTAL_COLLECTION",
        "headers" : []
     },
     {
        "chartType" : "metric",
        "name" : "DSS_TARGET_COLLECTION",
        "headers" : [],
        "id" : "targetCollection",
        "code" : "",
        "filter" : ""
     },
     {
        "headers" : [],
        "chartType" : "metric",
        "name" : "DSS_TARGET_ACHIEVED",
        "filter" : "",
        "id" : "targetAchieved",
        "code" : ""
     }
  ],
  "name" : "DSS_OVERVIEW",
  "dimensions" : {
     "height" : 350,
     "width" : 5
  },
  "label" : "DSS_OVERVIEW",
  "isCollapsible" : false,
  "id" : 211,
  "vizType" : "metric-collection"
};

const MetricData = () => {
  const data = {
    "headerName": "DSS_TOTAL_COLLECTION",
    "headerValue": 0.0,
    "headerSymbol": "Amount",
    "insight": {
      "name": "INSIGHTS",
      "value": "-100% than last year",
      "indicator": "lower_red",
      "colorCode": "lower_red"
    },
    "plots": []
  }
  const displaySymbol = (type) => {
    switch(type) {
      case "Amount": return "₹";
      default: return "";
    }
  }

  return (
    <div>
      <p className="heading-m">{`${displaySymbol(data.headerSymbol)} ${data.headerValue}`}</p>
      {data.insight && 
        <div>
          <p className={`${data.insight.colorCode}`}>
            {data.insight.value}
          </p>
        </div>
      }
    </div>
  )
}

const res = {
  "headerName": "DSS_TOTAL_COLLECTION",
  "headerValue": 0.0,
  "headerSymbol": "Amount",
  "insight": {
    "name": "INSIGHTS",
    "value": "-100% than last year",
    "indicator": "lower_red",
    "colorCode": "lower_red"
  },
  "plots": []
}

const MetricChartRow = ({ data }) => {
  const response = {
    "headerName": "DSS_TOTAL_COLLECTION",
    "headerValue": 0.0,
    "headerSymbol": "Amount",
    "insight": null,
    "plots": []
  }

  return (
    <div className="row">
      <div>{data.name}</div>
      <MetricData data={response} />
      {/* <div>{`${displaySymbol(response.headerSymbol)} ${response.headerValue}`}</div> */}
    </div>
  )
}

const MetricChart = () => {
  const { charts } = chartData;

  return (
    <Card className="metricsTable">
      <CardSubHeader>{chartData.label}</CardSubHeader>
      {charts.map((chart, index) => (
        <MetricChartRow data={chart} />
      ))}
    </Card>
  )
};

export default MetricChart;