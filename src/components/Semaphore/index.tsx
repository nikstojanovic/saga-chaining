import React from "react";
import { useSelector } from 'react-redux';
import Indicator from '../Indicator';

import './style.css';

const Semaphore = ({ name, id, maxId }) => {
  const first = useSelector((state) => state.status.status[id]?.first);
  const second = useSelector((state) => state.status.status[id]?.second);

  return (
    <div className="semaphore">
      <div className="semaphore__file-name" title={name}>
        <b>{id}</b> {name}
      </div>
      <div className="semaphore__indicator-wrapper">
        <Indicator status={!!first} />
        <Indicator status={!!second} />
      </div>
    </div>
  );
};

export default Semaphore;
