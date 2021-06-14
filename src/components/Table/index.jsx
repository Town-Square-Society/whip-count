import React from "react";
import { Table, Button, Tag, Input, Space } from "antd";
import { SearchOutlined } from "@ant-design/icons";
import Highlighter from "react-highlight-words";

import { STATUS_COLORS } from "../../constants";
import "./style.css";
import { getStatusDisplay, getCurrentIssueStatusToTextMap } from "../../App/selectors";

const { Column } = Table;
export const makeSortFunction = (key) => {
  return (a, b) => {
    if (a[key] > b[key]) {
      return 1;
    }
    if (a[key] < b[key]) {
      return -1;
    }
    return 0;
  };
};

const MD_BREAKPOINT = 768;

class SenateTable extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      windowWidth: 0,
    };
  }
  componentDidMount() {
    this.setState({ windowWidth: window.innerWidth });
    window.addEventListener("resize", () => {
      this.setState({ windowWidth: window.innerWidth });
    });
  }
  getSearchProps = (dataIndex) => ({
    filterDropdown: ({
      setSelectedKeys,
      selectedKeys,
      confirm,
      clearFilters,
    }) => (
      <div style={{ padding: 8 }}>
        <Input
          ref={(node) => {
            this.searchInput = node;
          }}
          placeholder={`Search ${dataIndex}`}
          value={selectedKeys[0]}
          onChange={(e) =>
            setSelectedKeys(e.target.value ? [e.target.value] : [])
          }
          onPressEnter={() =>
            this.props.handleSearch(selectedKeys, confirm, dataIndex)
          }
          style={{ width: 188, marginBottom: 8, display: "block" }}
        />
        <Space>
          <Button
            type="primary"
            onClick={() =>
              this.props.handleSearch(selectedKeys, confirm, dataIndex)
            }
            icon={<SearchOutlined />}
            size="small"
            style={{ width: 90 }}
          >
            Search
          </Button>
          <Button
            onClick={() => this.props.handleReset(clearFilters)}
            size="small"
            style={{ width: 90 }}
          >
            Reset
          </Button>
        </Space>
      </div>
    ),
    filterIcon: (filtered) => (
      <SearchOutlined style={{ color: filtered ? "#1890ff" : undefined }} />
    ),
    onFilter: (value, record) =>
      record[dataIndex]
        ? record[dataIndex]
            .toString()
            .toLowerCase()
            .includes(value.toLowerCase())
        : "",
    onFilterDropdownVisibleChange: (visible) => {
      if (visible) {
        setTimeout(() => this.searchInput.select(), 100);
      }
    },
    render: (text) =>
      this.props.searchedColumn === dataIndex ? (
        <Highlighter
          highlightStyle={{ backgroundColor: "#ffc069", padding: 0 }}
          searchWords={[this.props.searchText]}
          autoEscape
          textToHighlight={text ? text.toString() : ""}
        />
      ) : (
        text
      ),
  });
  render() {
    const { senators, height, selectedIssue, trackedIssues } = this.props;
    return (
      <Table
        dataSource={senators}
        rowKey="id"
        pagination={false}
        sticky
        scroll={{
          x: true,
          y: height || "60vh",
        }}
      >
        <Column
          title="Name"
          dataIndex="displayName"
          key="displayName"
          sorter={makeSortFunction("last_name")}
          render={(text, record) => {
            const name =
              this.state.windowWidth < MD_BREAKPOINT
                ? `${record.displayName} (${record.party[0]}) ${record.state}`
                : text;
            return this.props.searchedSenator === text ? (
              <Highlighter
                highlightStyle={{ backgroundColor: "#ffc069", padding: 0 }}
                searchWords={[this.props.searchedSenator]}
                autoEscape
                textToHighlight={name ? text.toString() : ""}
              />
            ) : (
              name
            );
          }}
        />
        <Column
          {...this.getSearchProps("state")}
          title="State"
          dataIndex="state"
          width={100}
          key="state"
          sorter={makeSortFunction("state")}
          responsive={["md"]}
        />
        <Column
          title="Party"
          dataIndex="party"
          key="party"
          sorter={makeSortFunction("party")}
          responsive={["md"]}
        />
        <Column
          title="Position"
          dataIndex={["issues", selectedIssue, "status"]}
          key={selectedIssue}
          filters={getStatusDisplay(trackedIssues, selectedIssue)}
          onFilter={(value, record) => {
            return record.issues[selectedIssue].status.includes(value);
          }}
          sorter={
             (a, b) =>
              Number(b.issues[selectedIssue].status) -
              Number(a.issues[selectedIssue].status)
          
          }
          render={(statusNo) => {
            return (
              <Tag color={STATUS_COLORS[statusNo]} key={statusNo}>
                {
                  getCurrentIssueStatusToTextMap(trackedIssues, selectedIssue)[
                    statusNo
                  ]
                }
              </Tag>
            );
          }}
        />
        <Column
          title="See More"
          key="see-more"
          render={(record) => {
            return (
              <>
                <Button onClick={() => this.props.openModal(record)}>
                  Details
                </Button>
              </>
            );
          }}
        />
      </Table>
    );
  }
}

export default SenateTable;
