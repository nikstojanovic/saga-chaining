import React from "react";
import { useSelector } from "react-redux";

import "./style.css";

const OrderTable = () => {
  const orderOfExecution = useSelector((state) => state.status.orderOfExecution);

  return (
    <div className="order-table" style={{ height: `200px` }}>
      {Object.keys(orderOfExecution).map((key) => (
        <div className="order-table__column">
          <div className="order-table__cell">{key}</div>
          {orderOfExecution[key].map((el, idx) => {
            return <div className={`order-table__cell`}>{el}</div>;
          })}
        </div>
      ))}
    </div>
  );
};

export default OrderTable;
