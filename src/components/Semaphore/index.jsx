import React from "react";
import { useSelector } from 'react-redux';
import Indicator from '../Indicator';

import './style.css';

const Semaphore = ({ id, maxId }) => {
  const first = useSelector((state) => state.status.status[id]?.first);
  const second = useSelector((state) => state.status.status[id]?.second);

  return (
    <div className="semaphore">
      <span style={{ width: `${maxId.length * 12}px` }}>{id}</span>
      <Indicator status={!!first} />
      <Indicator status={!!second} />
    </div>
  );
};

export default Semaphore;
