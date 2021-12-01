import React, { useEffect, useState } from "react";
import { useDispatch } from "react-redux";
import { getFirst } from "../../redux/actions/first";
import { clearStatuses } from "../../redux/actions/clearStatuses";
import Semaphore from "../Semaphore";
import OrderTable from "../OrderTable";

const DEFAULT_SERVER = "https://jsonplaceholder.typicode.com/users";
const MIN_API_CALLS = 10;
const MAX_API_CALLS = 100;

const Dashboard = () => {
  const [trigger, setTrigger] = useState();
  const [apiUrl, setApiUrl] = useState(DEFAULT_SERVER);
  const [noOfApiCalls, setNoOfApiCalls] = useState(MAX_API_CALLS);
  const dispatch = useDispatch();

  const apiCallArray = [...new Array(noOfApiCalls)].map((el, index) => ({
    id: index + 1,
    url: apiUrl
  }));

  useEffect(() => {
    dispatch(clearStatuses());
    apiCallArray.forEach((apiCall) => dispatch(getFirst(apiCall)));
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
      <div>
        API endpoint:&nbsp;
        <input
          type="text"
          placeholder={`API endpoint, ex. ${DEFAULT_SERVER}`}
          value={apiUrl}
          onChange={(e) => setApiUrl(e.target.value)}
          style={{ width: "400px" }}
        ></input>
      </div>
      <div>
        No of API calls [min 10, max 100]:&nbsp;
        <input
          type="number"
          min={MIN_API_CALLS}
          max={MAX_API_CALLS}
          placeholder="Number of API calls"
          value={noOfApiCalls}
          onChange={handleNoCalls}
        ></input>
      </div>
      <div>
        <button onClick={triggerFetch}>trigger fetch</button>
      </div>
      {apiCallArray.map((apiCall, idx) => (
        <Semaphore key={idx} id={apiCall.id} maxId={noOfApiCalls.toString()} />
      ))}
    </>
  );
};

export default Dashboard;
