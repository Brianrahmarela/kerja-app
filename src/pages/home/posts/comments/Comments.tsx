import { faSmile, faImages } from "@fortawesome/free-solid-svg-icons";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { Form, Input, Space } from "antd";
import { AxiosResponse } from "axios";
import moment from "moment";
import React from "react";
import { withTranslation } from "react-i18next";
import { connect } from "react-redux";
import { getCommentPost, postComment } from "../../../../repository/FeedRepo";
import CommentItem from "./CommentItem";

export interface CommentsProps {
    t?: (x: any) => void;
    setUpdatePost?: (x: any) => void;
    currentUser?: any;
    postData: any;
}

export interface CommentsState {
    comment: string;
    last: boolean;
    commentPosting: boolean;
}

class Comments extends React.Component<CommentsProps, CommentsState> {
    state = {
        comment: "",
        last: false,
        commentPosting: false,
    };
    componentDidMount() {
        this.setState({
            last: this.props.postData.commentCount === this.props.postData.comments.length,
        });
    }
    postComment = () => {
        if (this.state.comment) {
            this.setState({ commentPosting: true });
            postComment({
                postId: this.props.postData.id,
                comment: this.state.comment,
            })
                .then((res: AxiosResponse<any>) => {
                    // change lastComment
                    const post = { ...this.props.postData };
                    post.commentCount = post.commentCount + 1;
                    post.comments.push(res.data);

                    this.props.setUpdatePost?.(post);
                    this.setState({
                        comment: "",
                        last: post.commentCount === post.comments.length,
                    });
                })
                .finally(() => {
                    this.setState({ commentPosting: false });
                });
        }
    };
    loadComment = () => {
        const params = {
            postId: this.props.postData.id,
            commentId: this.props.postData.comments[0]?.id,
        };
        getCommentPost(params).then((res: AxiosResponse<any>) => {
            const post = { ...this.props.postData };
            post.comments = post.comments.concat(res.data.content);
            this.props.setUpdatePost?.(post);
            this.setState({
                last: this.props.postData.commentCount === post.comments.length,
            });
        });
    };

    render() {
        const { postData }: any = this.props;
        return (
            <>
                {postData.comments && (
                    <>
                        {/* pagination load more  */}
                        {postData.comments.length > 0 && postData.commentCount > 3 && this.state.last === false && (
                            <span
                                onClick={() => this.loadComment()}
                                style={{
                                    cursor: "pointer",
                                    marginTop: 15,
                                    color: "#12A3E2",
                                    marginBottom: 15,
                                    display: "block",
                                }}
                            >
                                Show More...
                            </span>
                        )}
                        {postData.comments
                            .sort((a: any, b: any) => moment(a.createdAt).diff(moment(b.createdAt)))
                            .map((comment: any, index: number) => {
                                return <CommentItem key={comment.id + index} commentData={comment} postId={postData.id} />;
                            })}
                    </>
                )}
                <Form>
                    <Form.Item style={{ marginBottom: 15 }}>
                        <Input
                            onChange={(e: any) => {
                                this.setState({ comment: e.target.value });
                            }}
                            onPressEnter={() => this.postComment()}
                            value={this.state.comment}
                            suffix={
                                <Space>
                                    <FontAwesomeIcon icon={faSmile} style={{ color: "grey" }} />
                                    <FontAwesomeIcon icon={faImages} style={{ color: "grey" }} />
                                </Space>
                            }
                            style={{ borderRadius: 20 }}
                            placeholder="Write comment..."
                            disabled={this.state.commentPosting}
                        />
                    </Form.Item>
                </Form>
            </>
        );
    }
}

const mapStateToProps = (state: any) => ({
    currentUser: state.account.currentUser,
});

const mapDispatchToProps = (dispatch: any) => ({
    setUpdatePost: async (payload: any) =>
        dispatch({
            type: "UPDATE_POST",
            payload,
        }),
});

export default connect(mapStateToProps, mapDispatchToProps)(withTranslation()(Comments));
