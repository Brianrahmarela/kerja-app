import { faReplyAll, faThumbsUp } from "@fortawesome/free-solid-svg-icons";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { Avatar, Button, Comment } from "antd";
import moment from "moment";
import React from "react";
import { Link } from "react-router-dom";
import { encodeHashUserId } from "../../../../config/Util";

export interface ReplyItemProps {
    replyData: any;
}

export interface ReplyItemState {}

class ReplyItem extends React.Component<ReplyItemProps, ReplyItemState> {
    render() {
        const { replyData } = this.props;
        return (
            <Comment
                style={{ padding: 0 }}
                actions={[
                    <Button type="link" icon={<FontAwesomeIcon icon={faThumbsUp} style={{ marginRight: 5 }} />}>
                        Suka
                    </Button>,
                    <Button type="link" icon={<FontAwesomeIcon icon={faReplyAll} style={{ marginRight: 5 }} />} onClick={() => this.setState({ showReplyField: true })}>
                        Balas
                    </Button>,
                ]}
                author={
                    <>
                        <Link to={"/profile/" + encodeHashUserId(replyData.userId)} style={{ color: "rgba(0, 0, 0, 0.85)" }}>
                            <strong>
                                {replyData.firstName} {replyData.lastName}
                            </strong>
                        </Link>
                        <span> . {moment(replyData.createdAt).fromNow()}</span>
                    </>
                }
                avatar={<Avatar src={replyData.photo} alt={replyData.firstName + replyData.lastName} />}
                content={<p>{replyData.comment}</p>}
            ></Comment>
        );
    }
}

export default ReplyItem;
