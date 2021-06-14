import React from "react";
import { Card, Row, Col } from "antd";
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
            hoverable
            className="issue-card"
            actions={[
              <a
                href={issue.aboutLink}
                target="_blank"
                rel="noopener noreferrer"
              >
                {issue.aboutLinkText}
              </a>,
            ]}
          >
            <a href={`#${issue.id}`} onClick={() => setIssue(issue.id)}>
              <Card.Meta title={issue.header} description={issue.description} />
            </a>
          </Card>
        </Col>
      ))}
    </Row>
  </div>
);

export default LandingPageCards;
