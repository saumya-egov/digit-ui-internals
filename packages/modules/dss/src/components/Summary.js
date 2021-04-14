import React from "react";
import { Card, Poll, Details } from "@egovernments/digit-ui-react-components";

const Summary = ({
  title = "Total Collections",
  todayValue = 15012,
  monthValue = 15.2,
  target = "72%",
  task = 133,
  monthlyTask = 4500,
  sla = "91%",
}) => {
  return (
    <Card>
      <div className="summary-wrapper">
        <Poll />
        <div className="wrapper-child">
          <div className="blocks">
            <p>{ title }</p>
          </div>
          <div className="blocks">
            <div>
              <p>Today</p>
              <p>{ todayValue }</p>
            </div>
            <div>
              <p>This Month</p>
              <p>{ monthValue }</p>
            </div>
            <div>
              <p>Target</p>
              <p>{ target }</p>
            </div>
          </div>
        </div>
        <div className="wrapper-child">
          <div className="blocks">
            <p>Tasks</p>
          </div>
          <div className="blocks">
            <div>
              <p>Today</p>
              <p>{ task }</p>
            </div>
            <div>
              <p>This Month</p>
              <p>{ monthlyTask }</p>
            </div>
            <div>
              <p>Target</p>
              <p>{ sla }</p>
            </div>
          </div>
        </div>
        <div className="wrapper-child">
          <div className="blocks cell-text" style={{ justifyContent: "space-around" }}>
            <p>
              <Details />
              View Details
            </p>
            <p>Print</p>
          </div>
        </div>
      </div>
    </Card>
  );
};

export default Summary;