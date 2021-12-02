import React, { useEffect, useState, useRef } from "react";
import { useDispatch } from "react-redux";
import { getFirst } from "../../redux/actions/first";
import { clearStatuses } from "../../redux/actions/clearStatuses";
import Semaphore from "../Semaphore";
import OrderTable from "../OrderTable";
import Input from '../Input';
import { apiCallsInit } from "./helpers";
import { DEFAULT_SERVER, MIN_API_CALLS, MAX_API_CALLS, API_INPUT_PROPS, NUMBER_INPUT_PROPS } from './constants';

const Dashboard = () => {
  const [trigger, setTrigger] = useState();
  const [apiUrl, setApiUrl] = useState(DEFAULT_SERVER);
  const [noOfApiCalls, setNoOfApiCalls] = useState(MAX_API_CALLS);
  const dispatch = useDispatch();
  let apiCallArray = useRef(apiCallsInit(MAX_API_CALLS, DEFAULT_SERVER));

  useEffect(() => {
    apiCallArray.current = apiCallsInit(noOfApiCalls, apiUrl);
  }, [noOfApiCalls]);
  
  useEffect(() => {
    dispatch(clearStatuses());
    apiCallArray?.current?.forEach((apiCall) => setTimeout(() => dispatch(getFirst(apiCall))), 0);
  }, [trigger]);

  const triggerFetch = () => {
    dispatch(clearStatuses());
    setTrigger(!trigger);
  }

  const handleNoCalls = (e) => {
    const val = +e.target.value;
    if (val > MAX_API_CALLS || val < MIN_API_CALLS) return;
    setNoOfApiCalls(val);
  }

  return (
    <>
      <OrderTable />
      <h1>saga async testing dashboard</h1>
      <Input
        {...API_INPUT_PROPS}
        value={apiUrl}
        onChange={(e) => setApiUrl(e.target.value)}
      />
      <Input
        {...NUMBER_INPUT_PROPS}
        value={noOfApiCalls}
        onChange={handleNoCalls}
      />
      <div>
        <button onClick={triggerFetch}>trigger fetch</button>
      </div>
      {apiCallArray?.current?.map((apiCall, idx) => (
        <Semaphore key={idx} id={apiCall.id} maxId={noOfApiCalls.toString()} />
      ))}
    </>
  );
};

export default Dashboard;
