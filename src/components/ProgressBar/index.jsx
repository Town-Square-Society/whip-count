import React from "react";
import { map } from "lodash";
import classNames from "classnames";
import { Tooltip } from "antd";

import { STATUS_COLORS_PROGRESS } from "../../constants";

import "./style.css";

const ProgressBar = ({ senateMapByStatus, markerPosition }) => (
  <div className="progress-bar-container">
    <div className="progress-bar">
      {map(senateMapByStatus, (senators, status) => {
        return (
          <div
            key={`progress-${status}`}
            style={{
              flexBasis: `${senators.length}%`,
              background: STATUS_COLORS_PROGRESS[status],
              height: 20,
              color: "white",
            }}
          >
            {senators.length}
          </div>
        );
      })}
    </div>
    {markerPosition.map((pos, index) => {
      const top = (index + 1) * -22 - index;
      const opacity = 1 - index / 2;
      return (
        <Tooltip title={pos} key={index}>
          <div
            className={classNames("overlay-marker")}
            style={{ left: `${pos}%`, top: `${top}px`, opacity }}
          ></div>
        </Tooltip>
      );
    })}
  </div>
);

export default ProgressBar;
