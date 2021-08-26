import { faReplyAll, faThumbsUp } from "@fortawesome/free-solid-svg-icons";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { Button, Comment, Space } from "antd";
import Avatar from "antd/lib/avatar/avatar";
import moment from "moment";
import React from "react";
import { Link } from "react-router-dom";
import Replies from "../replays/Replies";

export interface CommentItemProps {
    commentData: any;
    postId: string;
}

export interface CommentItemState {
    showReplyField: boolean;
}

class CommentItem extends React.Component<CommentItemProps, CommentItemState> {
    state = {
        showReplyField: false,
    };
    render() {
        const { commentData, postId } = this.props;
        const { showReplyField } = this.state;
        return (
            <Comment
                key={commentData.id}
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
                    <Space align="baseline">
                        <Link to={"/profile/"} style={{ color: "rgba(0, 0, 0, 0.85)" }}>
                            <strong>
                                {commentData.firstName} {commentData.lastName}
                            </strong>
                        </Link>
                        <strong>.</strong>
                        <span>{moment(commentData.createdAt).fromNow()}</span>
                    </Space>
                }
                avatar={<Avatar src={commentData.photo} />}
                content={<p>{commentData.comment}</p>}
            >
                <Replies postId={postId} commentData={commentData} showReplyField={showReplyField} changeReplyField={(x: boolean) => this.setState({ showReplyField: x })} />
            </Comment>
        );
    }
}

export default CommentItem;
