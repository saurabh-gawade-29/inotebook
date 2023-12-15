import React, { useState } from "react";
import { usePromiseTracker } from "react-promise-tracker";
import Loader from "react-spinners/ScaleLoader";

const GLoader = (props) => {
  const { promiseInProgress } = usePromiseTracker();
  const [color] = useState("#e84118");
  return (
    <div>
      {promiseInProgress === true ? (
        <>
          <div className="myLoaderBackground">
            <Loader
              className="myLoader"
              color={color}
              loading={promiseInProgress}
              size={70}
              aria-label="Loading Spinner"
              data-testid="loader"
            />
          </div>
        </>
      ) : null}
    </div>
  );
};

export default GLoader;
