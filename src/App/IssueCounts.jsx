import React, { Component } from "react";
import { Col, Row, Tooltip, Image } from "antd";
import { map } from "lodash";

import "./style.css";
import SenateTable from "../components/Table";

import circleInPerson from "../circle-in-person.svg";
import ProgressBar from "../components/ProgressBar";
import { getCurrentIssueStatusToTextMap, getVotesNeeded } from "./selectors";

const tooltipPlacement = {
  1: "right",
  2: "top",
  3: "top",
  4: "left",
};

class IssueCounts extends Component {
  componentDidMount = () => {
    this.getTableHight();

    window.addEventListener("resize", () => this.getTableHight());
  };

  getSrc = (govtrack_id) => {
    if (govtrack_id === "456857") {
      return "https://www.senate.gov/general/resources/graphic/medium/ossoff-jon.png";
    } else {
      return `https://www.govtrack.us/static/legislator-photos/${govtrack_id}-100px.jpeg`;
    }
  };

  handleStateSearch = (value) => {
    this.setState({
      searchText: value,
      searchedColumn: "state",
    });
  };

  getTableHight = () => {
    const statusContainer = document.getElementsByClassName(
      "all-status-container"
    );
    const footer = document.getElementsByClassName("ant-layout-footer");
    const progressBar = document.getElementsByClassName(
      "progress-bar-container"
    );
    const tableHeader = document.getElementsByClassName("ant-table-thead");
    if (statusContainer[0] && progressBar[0] && tableHeader[0] && footer[0]) {
      const height =
        statusContainer[0].scrollHeight +
        progressBar[0].scrollHeight +
        footer[0].scrollHeight +
        tableHeader[0].scrollHeight;
      const windowHeight = window.innerHeight;
      const tableHeight = windowHeight - height;
      this.props.setTableHeight(tableHeight);
    }
  };

  selectSenator = (senator) => {
    this.props.selectSenator(senator);
  };

  render() {
    const {
      senateMapByStatus,
      filteredSenators,
      selectedIssue,
      trackedIssues,
    } = this.props;
    const shortStatusText = getCurrentIssueStatusToTextMap(
      trackedIssues,
      selectedIssue
    );
    const votesNeeded = getVotesNeeded(trackedIssues, selectedIssue);
    return (
      <>
        <Row className="all-status-container">
          {map(senateMapByStatus, (senators, statusNo) => {
            return (
              <Col
                key={statusNo}
                flex={"1 1 auto"}
                className={`status-col status__${statusNo}`}
              >
                <h3>{`${shortStatusText[statusNo]} (${senators.length})`}</h3>
                <div className="status-container">
                  {map(senators, (senator) => (
                    <Tooltip
                      key={senator.id}
                      placement={tooltipPlacement[statusNo]}
                      title={`Sen. ${senator.displayName} (${senator.party[0]}) ${senator.state}`}
                    >
                      <div
                        className={[
                          "image-container",
                          senator.party.toLowerCase(),
                        ].join(" ")}
                        onClick={() => this.selectSenator(senator)}
                      >
                        <Image
                          preview={false}
                          alt={senator.displayName}
                          fallback={circleInPerson}
                          src={this.getSrc(senator.govtrack_id)}
                        />
                      </div>
                    </Tooltip>
                  ))}
                </div>
              </Col>
            );
          })}
        </Row>
        {senateMapByStatus[1] && (
          <ProgressBar
            senateMapByStatus={senateMapByStatus}
            markerPosition={votesNeeded}
          />
        )}
        <Row className="table-container" gutter={16}>
          <SenateTable
            senators={filteredSenators}
            handleSearch={this.props.handleSearch}
            handleReset={this.props.handleReset}
            searchedColumn={this.props.searchedColumn}
            searchText={this.props.searchText}
            openModal={this.props.openModal}
            searchedSenator={this.props.searchedSenator}
            height={this.props.tableHeight}
            getTableHight={this.getTableHight}
            selectedIssue={selectedIssue}
            trackedIssues={trackedIssues}
          />
        </Row>
      </>
    );
  }
}

export default IssueCounts;
