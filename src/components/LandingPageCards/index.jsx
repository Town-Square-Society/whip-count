import React from "react";
import { Card, Row, Col } from "antd";

import "./style.css";

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
            className="issue-card"
       
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
