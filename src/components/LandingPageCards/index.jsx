import React from "react";
import { Card, Row, Col, Button } from "antd";
import classNames from "classnames";
import { LinkOutlined } from "@ant-design/icons";

import "./style.css";

const getExtra = (issue) => {
    return [
      <Button
        href={issue.aboutLink}
        target="_blank"
        rel="noopener noreferrer"
        icon={<LinkOutlined />}
      >
        {" "}
        {issue.aboutLinkText}
      </Button>,
    ];
}

const LandingPageCards = ({ setIssue, trackedIssues }) => (
  <div className="landing-page">
    <Row
      gutter={[16, 16]}
      justify="space-evenly"
      align="stretch"
      className="cards-row"
    >
      {trackedIssues.map((issue) => (
        <Col span={8} key={issue.id}>
          <Card
            bodyStyle={{ padding: 0 }}
            hoverable
            className={classNames({"issue-card": true, passed: issue.passed})}
            actions={getExtra(issue)}
          >
            <a href={`#${issue.id}`}>
              <Card.Meta
                title={issue.name}
                onClick={() => setIssue(issue.id)}
                description={issue.description}
                style={{ padding: 20 }}
              />
            </a>
          </Card>
        </Col>
      ))}
    </Row>
  </div>
);

export default LandingPageCards;
