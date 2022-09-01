import React from "react";
import { Modal, Card, List, Descriptions } from "antd";
import {
  FacebookOutlined,
  TwitterOutlined,
  LinkOutlined,
} from "@ant-design/icons";
import "./style.css";
import { getCurrentIssueStatusToTextMap } from "../../App/selectors";

const { Meta } = Card;

const townHallsDisplay = (townHalls) => (
  <Card title="Attend an event">
    <List
      itemLayout="vertical"
      dataSource={townHalls}
      renderItem={(item) => {
        return (
          <List.Item
            extra={
              item.link ? (
                <a href={item.link} target="_blank" rel="noopener noreferrer">
                  {item.linkName || "More info"}
                </a>
              ) : (
                []
              )
            }
          >
            <List.Item.Meta
              title={
                <a
                  target="_blank"
                  rel="noopener noreferrer"
                  href={`https://townhallproject.com/${item.eventId}`}
                >
                  {item.eventName}
                </a>
              }
              description={`${item.meetingType} at ${item.Time} on ${item.dateString}`}
            />
          </List.Item>
        );
      }}
    />
  </Card>
);

const renderCitation = (senator, selectedIssue) => {
  if (!selectedIssue) {
    return null
  }
  const citation = senator.issues[selectedIssue].citation
  return (
    <>
      {citation && (
        <p className="quote-citation">
          <a target="_blank" rel="noopener noreferrer" href={citation}>
            Link to citation
          </a>
        </p>
      )}
    </>
  );
};

const SenatorModal = ({
  senator,
  visible,
  closeModal,
  townHalls,
  selectedIssue,
  trackedIssues
}) => {
  let status = "all";
  if (selectedIssue) {

    status = senator.issues[selectedIssue].status;
  }
  
  return (
    <>
      <Modal
        width={"80%"}
        title={`Senator ${senator.displayName} (${senator.party[0]}) ${senator.state}`}
        visible={visible}
        onOk={closeModal}
        onCancel={closeModal}
        footer={null}
        className="modal"
      >
        <div className="modal-row">
          <div className="left-container modal-col">
            <Card
              style={{ maxWidth: 200 }}
              bordered={false}
              className={`status__${status} photo-card`}
              cover={
                <img
                  alt="example"
                  src={`https://www.govtrack.us/static/legislator-photos/${senator.govtrack_id}-200px.jpeg`}
                />
              }
            >
              {selectedIssue && (
                <Meta
                  description={`Position: ${
                    getCurrentIssueStatusToTextMap(
                      trackedIssues,
                      selectedIssue
                    )[senator.issues[selectedIssue].status]
                  }`}
                />
              )}
            </Card>
          </div>
          <div className="right-container modal-col">
            {renderCitation(senator, selectedIssue)}
            <Card
              title="Contact:"
              actions={[
                senator.socials.facebook && (
                  <a
                    target="_blank"
                    rel="noopener noreferrer"
                    href={`https://facebook.com/${senator.socials.facebook}`}
                  >
                    <FacebookOutlined />
                  </a>
                ),
                senator.socials.twitter && (
                  <a
                    target="_blank"
                    rel="noopener noreferrer"
                    href={`https://twitter.com/${senator.socials.twitter}`}
                  >
                    <TwitterOutlined />
                  </a>
                ),
                senator.socials.url && (
                  <a
                    target="_blank"
                    rel="noopener noreferrer"
                    href={senator.socials.url}
                  >
                    <LinkOutlined />
                  </a>
                ),
              ]}
            >
              <p>{senator.contact.address}</p>
              <p>{senator.contact.phone}</p>
            </Card>
            {!selectedIssue && (
              <Card>
                <Descriptions bordered column={1} size="small">
                  {trackedIssues.map((issue) => (
                    <Descriptions.Item label={issue.name} key={issue.name}>
                      {
                        getCurrentIssueStatusToTextMap(trackedIssues, issue.id)[
                          senator.issues[issue.id].status
                        ]
                      }
                    </Descriptions.Item>
                  ))}
                </Descriptions>
              </Card>
            )}

            {townHalls.length > 0 && townHallsDisplay(townHalls)}
          </div>
        </div>
      </Modal>
    </>
  );
};

export default SenatorModal;
