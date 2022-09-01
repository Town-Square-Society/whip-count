import React, { Component } from "react";
import { Layout, Button, Col, Row } from "antd";
import { find, filter, reverse } from "lodash";
import {
  ArrowLeftOutlined,
  FacebookFilled,
  MailFilled,
  TwitterCircleFilled,
  TwitterOutlined,
} from "@ant-design/icons";
import classNames from "classnames";
import { LinkOutlined } from "@ant-design/icons";

import { firestore, firebasedb } from "../utils/setup-firebase";
import {
  getFilteredSenators,
  getSenatorsByStatus,
  getSelectedIssueData,
} from "./selectors";
import SenatorModal from "../components/Modal";
import Search from "../components/Search";
import "./style.css";
import { makeSortFunction } from "../components/Table";

import IssueCounts from "./IssueCounts";
import LandingPageCards from "../components/LandingPageCards";

const { Header, Content, Footer } = Layout;

const formatParty = (party) => {
  if (!party) {
    return console.log("no party");
  }
  if (party.length > 1) {
    return party;
  }
  switch (party) {
    case "D":
      return "Democratic";
    case "R":
      return "Republican";
    default:
      return "Independent";
  }
};
class App extends Component {
  state = {
    senators: [],
    trackedIssues: [],
    modalSenator: null,
    searchText: "",
    searchedColumn: "",
    selectedIssue: "",
    tableHeight: 0,
    contentHeight: 0,
  };

  componentDidMount = () => {
    window.addEventListener("hashchange", this.handleHashChange, false);

    firebasedb
      .ref("townHalls")
      .once("value")
      .then((snapshot) => {
        const townHalls = [];
        snapshot.forEach((node) => {
          townHalls.push(node.val());
        });
        this.setState({ townHalls });
      });
    const trackedIssues = [];
    firestore
      .collection("whip_count_metadata")
      .get()
      .then((snapshot) => {
        snapshot.forEach((node) => {
          const data = {
            ...node.data(),
          };
          if (data.active) {
            trackedIssues.push(data);
          }
        });
      })
      .then(() => {
        if (window.location.hash) {
          const issue = find(trackedIssues, {
            id: window.location.hash.split("#")[1],
          });
          if (issue) {
            this.setIssue(issue.id);
          } else {
            window.history.replaceState({}, "", "/");
          }
        }
        firestore
          .collection("whip_count_2020")
          .get()
          .then((snapshot) => {
            const senators = [];
            snapshot.forEach((node) => {
              const data = {
                ...node.data(),
                id: node.id,
                party: node.data().party
                  ? formatParty(node.data().party)
                  : console.log(node.data().displayName),
              };
              senators.push(data);
            });
            senators.sort(makeSortFunction("state"));
            this.setState({ senators, trackedIssues });
          });
      });
    this.getContentHeight();
    window.addEventListener("resize", () => this.getContentHeight());
  };

  handleHashChange = (change) => {
    if (change.oldURL.split("#")[0] === change.newURL) {
      this.clearIssue();
    }
  };

  getContentHeight = () => {
    const titleBar = document.getElementsByClassName("title-bar");
    const footer = document.getElementsByClassName("ant-layout-footer");

    const header = document.getElementsByClassName("ant-layout-header");
    if (titleBar[0] && header[0] && footer[0]) {
      const height =
        titleBar[0].scrollHeight +
        header[0].scrollHeight +
        footer[0].scrollHeight;
      const windowHeight = window.innerHeight;
      const contentHeight = windowHeight - height - 40;
      this.setState({ contentHeight });
    }
  };

  handleStateSearch = (value) => {
    this.setState({
      searchText: value,
      searchedColumn: "state",
    });
  };

  setTableHeight = (tableHeight) => {
    this.setState({ tableHeight });
  };

  setIssue = (issueKey) => {
    this.setState({ selectedIssue: issueKey });
  };

  clearIssue = () => {
    window.history.pushState({}, "", "/");
    this.setState({ selectedIssue: "" });
  };

  handleSearch = (selectedKeys, confirm, dataIndex) => {
    confirm();
    this.setState({
      searchText: selectedKeys[0],
      searchedColumn: dataIndex,
    });
  };

  handleReset = (clearFilters) => {
    if (clearFilters) {
      clearFilters();
    }
    this.setState({ searchText: "", searchedSenator: "" });
  };

  renderModal = () => {
    const { modalSenator, townHalls } = this.state;
    if (!modalSenator) {
      return null;
    }
    const thisTownhalls = filter(townHalls, {
      officePersonId: modalSenator.id,
    });
    return (
      <SenatorModal
        visible={true}
        senator={modalSenator}
        townHalls={thisTownhalls}
        closeModal={this.closeModal}
        selectedIssue={this.state.selectedIssue}
        trackedIssues={this.state.trackedIssues}
      />
    );
  };

  scrollTo = (id, options) => {
    const row = document.querySelector(`[data-row-key="${id}"]`);
    if (row) {
      row.scrollIntoView(options);
    }
  };

  openModal = (senator) => {
    this.setState({ modalSenator: senator });
  };

  selectSenator = (senator) => {
    this.scrollTo(senator.id);
    this.openModal(senator);
    this.setState({
      searchedSenator: senator.displayName,
    });
  };

  closeModal = () => {
    this.setState({ modalSenator: null });
  };

  render() {
    const { selectedIssue } = this.state;
    const senateMapByStatus = getSenatorsByStatus(
      this.state.senators,
      selectedIssue
    );
    const filteredSenators = getFilteredSenators(
      this.state.senators,
      this.state.searchedColumn,
      this.state.searchText
    );
    const issueInfo = getSelectedIssueData(
      this.state.trackedIssues,
      selectedIssue
    );
    return (
      <Layout className="App">
        <div
          className={classNames([
            "title-bar",
            { "has-back-button": !!selectedIssue },
          ])}
        >
          {selectedIssue ? (
            <Row align="middle">
              <Col span={6}>
                <Button
                  ghost={true}
                  onClick={this.clearIssue}
                  icon={<ArrowLeftOutlined />}
                >
                  Back to all issues
                </Button>
              </Col>
              <Col span={12}>
                <h1>{issueInfo.name}</h1>
                <small>
                  <a
                    href={issueInfo.aboutLink}
                    target="_blank"
                    rel="noopener noreferrer"
                  >
                    {issueInfo.aboutLinkText} <LinkOutlined />
                  </a>
                </small>
              </Col>
            </Row>
          ) : (
            <h1>People's Whip Count</h1>
          )}
        </div>
        <Header>
          <Search
            handleStateSearch={this.handleStateSearch}
            senators={this.state.senators}
            selectSenator={this.selectSenator}
            handleReset={this.handleReset}
          />
          {this.renderModal()}

          <Button
            ghost
            target="_blank"
            href="https://docs.google.com/forms/d/e/1FAIpQLScH8KYmrnWScWJr1v3jUwMdxP5ekN5x0IZ05Q23J7SxoDoQrw/viewform"
          >
            Submit position update
          </Button>
        </Header>
        <Content className="content">
          {this.state.selectedIssue ? (
            <IssueCounts
              selectSenator={this.selectSenator}
              senateMapByStatus={senateMapByStatus}
              filteredSenators={filteredSenators}
              searchText={this.state.searchText}
              searchedColumn={this.state.searchedColumn}
              searchedSenator={this.state.searchedSenator}
              tableHeight={this.state.tableHeight}
              setTableHeight={this.setTableHeight}
              openModal={this.openModal}
              selectedIssue={this.state.selectedIssue}
              handleSearch={this.handleSearch}
              handleReset={this.handleReset}
              trackedIssues={this.state.trackedIssues}
            />
          ) : (
            <LandingPageCards
              setIssue={this.setIssue}
              height={this.state.contentHeight}
              trackedIssues={reverse(this.state.trackedIssues) || []}
            />
          )}
        </Content>
        <Footer>
          <div>
            <Button
              href="mailto:info@peoplestownhall.org"
              icon={<MailFilled />}
              shape="circle"
              ghost
              target="_blank"
              rel="noopener noreferrer"
            />
            <Button
              href="https://twitter.com/PeoplesTH"
              icon={<TwitterCircleFilled />}
              shape="circle"
              ghost
              target="_blank"
              rel="noopener noreferrer"
            />
            <Button
              href="https://www.facebook.com/PeoplesTH"
              icon={<FacebookFilled />}
              shape="circle"
              ghost
              target="_blank"
              rel="noopener noreferrer"
            />
          </div>
        </Footer>
      </Layout>
    );
  }
}

export default App;
