import React from "react";
import { Card, Row, Col } from "antd";
import { LinkOutlined } from "@ant-design/icons";

import "./style.css";

const LandingPageCards = ({ setIssue, height, trackedIssues }) => (
  <div style={{ height: height }} className="landing-page">
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
            className="issue-card"
            actions={[
              <a
                href={issue.aboutLink}
                target="_blank"
                rel="noopener noreferrer"
              >
                {issue.aboutLinkText} <LinkOutlined />
              </a>,
            ]}
          >
            <a href={`#${issue.id}`}>
              <Card.Meta
                title={issue.header}
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
