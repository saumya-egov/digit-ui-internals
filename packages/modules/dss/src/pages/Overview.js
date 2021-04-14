import React from "react";
import { CardLabel, Header, Poll } from "@egovernments/digit-ui-react-components";
import Summary from "../components/Summary";

const response = [
  {
    title: "Total Collections",
    todayValue: 15012,
    monthValue: 15.2,
    target: "72%",
    task: 133,
    monthlyTask: 4500,
    sla: "91%",
    logo: <Poll />
  },
  {
    title: "Property Tax",
    todayValue: 15012,
    monthValue: 15.2,
    target: "72%",
    task: 133,
    monthlyTask: 4500,
    sla: "91%",
    logo: <Poll />
  },
  {
    title: "Trade License",
    todayValue: 15012,
    monthValue: 15.2,
    target: "72%",
    task: 133,
    monthlyTask: 4500,
    sla: "91%",
    logo: <Poll />
  }
]
const Overview = () => {
  return (
    <div>
      <Header>Overview Dashboard</Header>
      {response.map((item, key) => (
        <Summary
          key={key}
          title={item.title}
          todayValue={item.todayValue}
          monthValue={item.monthValue}
          target={item.target}
          task={item.task}
          monthlyTask={item.monthlyTask}
          sla={item.sla}
          logo={item.logo}
        />
      ))}
    </div>
  )
}

export default Overview;