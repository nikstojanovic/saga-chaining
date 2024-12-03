import React from "react";
import { useSelector } from "react-redux";

import "./style.css";

const ExecutionOrderTable = () => {
  const orderOfExecution = useSelector((state) => state.status.orderOfExecution);

  return (
    <div className="order-table">
      {Object.keys(orderOfExecution).map((key, idx) => (
        <div key={idx} className="order-table__column">
          <div className="order-table__cell">{key}</div>
          {orderOfExecution[key].map((el, index) => {
            return <div key={index} className={`order-table__cell`}>{el}</div>;
          })}
        </div>
      ))}
    </div>
  );
};

export default ExecutionOrderTable;
