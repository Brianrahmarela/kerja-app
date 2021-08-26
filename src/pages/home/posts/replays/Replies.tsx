import { Form, Mentions, message } from "antd";
import { AxiosResponse } from "axios";
import moment from "moment";
import React from "react";
import { connect } from "react-redux";
import { getCommentReplies, postSubComment } from "../../../../repository/FeedRepo";
import ReplyItem from "./ReplyItem";

export interface RepliesProps {
    postId: string;
    commentData: any;
    mentions?: any[];
    showReplyField: boolean;
    changeReplyField: (x: any) => void;
    setUpdatePost?: (x: any) => void;
    postList?: any[];
}

export interface RepliesState {
    loadingPostReply: boolean;
    last: boolean;
    reply: string;
}

class Replies extends React.Component<RepliesProps, RepliesState> {
    state = {
        reply: "",
        loadingPostReply: false,
        last: false,
    };
    componentDidUpdate(prevProps: any) {
        // load pertama hanya ketika pertamakali muncul
        if (prevProps.showReplyField !== this.props.showReplyField && this.props.showReplyField) {
            this.loadReplies();
        }
    }
    loadReplies = () => {
        const params = {
            postId: this.props.postId,
            commentId: this.props.commentData.id,
            replyId: this.props.commentData.replies?.[0]?.id || null,
        };
        this.setState({
            loadingPostReply: true,
        });
        getCommentReplies(params)
            .then((res: AxiosResponse<any>) => {
                // clone postlist
                const posts: any[] = [...(this.props.postList as any[])];

                this.setState({
                    loadingPostReply: false,
                    reply: "",
                });
                const postIndex: number = posts.findIndex((v: any) => v.id === this.props.postId) as number;
                if (postIndex !== -1) {
                    const post = { ...this.props.postList?.[postIndex] };
                    const commentIndex: number = post.comments.findIndex((v: any) => v.id === this.props.commentData.id) as number;

                    if (commentIndex !== -1) {
                        // add last sub comment
                        let replies = post.comments[commentIndex].replies;
                        replies = replies.concat(res.data.content);
                        post.comments[commentIndex].replies = replies;
                        this.setState({
                            last: post.comments[commentIndex].replyCount === replies.length,
                        });
                        // update count on comments
                        this.props.setUpdatePost?.(post);
                    }
                }
            })
            .catch((err: any) => {
                message.error("Error!");
                console.log(err);
            })
            .finally(() => {});
    };
    postReply() {
        this.setState({
            loadingPostReply: true,
        });
        postSubComment({
            postId: this.props.postId,
            commentId: this.props.commentData.id,
            reply: this.state.reply,
        })
            .then((res: AxiosResponse<any>) => {
                // clone postlist
                const posts: any[] = [...(this.props.postList as any[])];

                this.setState({
                    loadingPostReply: false,
                    reply: "",
                });
                const postIndex: number = posts.findIndex((v: any) => v.id === this.props.postId) as number;
                if (postIndex !== -1) {
                    const post = { ...this.props.postList?.[postIndex] };
                    const commentIndex: number = post.comments.findIndex((v: any) => v.id === this.props.commentData.id) as number;

                    if (commentIndex !== -1) {
                        // add last sub comment
                        const comment = post.comments[commentIndex];
                        console.log(comment);
                        comment.replyCount += 1;
                        comment.replies.push(res.data);
                        post.comments[commentIndex] = comment;
                        console.log(posts);
                        // update count on comments
                        this.props.setUpdatePost?.(post);
                    }
                }
            })
            .catch(() => {
                message.error("Error!");
                this.setState({
                    loadingPostReply: false,
                    reply: "",
                });
            })
            .finally(() => {
                this.setState({
                    loadingPostReply: false,
                });
            });
    }
    render() {
        const { showReplyField, commentData } = this.props;
        return (
            <>
                {commentData.replies.length > 0 && commentData.replyCount > 5 && this.state.last === false && (
                    <span
                        onClick={() => this.loadReplies()}
                        style={{
                            marginLeft: 45,
                            color: "#12A3E2",
                            cursor: "pointer",
                            display: "block",
                            marginBottom: 10,
                        }}
                    >
                        Show More...
                    </span>
                )}
                {commentData.replies
                    .sort((a: any, b: any) => moment(a.createdAt).diff(moment(b.createdAt)))
                    .map((reply: any, index: number) => {
                        return <ReplyItem key={reply.id + index.toString()} replyData={reply} />;
                    })}
                {showReplyField && (
                    <>
                        <Form.Item style={{ marginBottom: 15 }}>
                            <Mentions
                                onChange={(e: any) => {
                                    this.setState({
                                        reply: e,
                                    });
                                }}
                                value={this.state.reply}
                                style={{ borderRadius: 20 }}
                                placeholder="Write reply..."
                                onPressEnter={() => this.postReply()}
                                disabled={this.state.loadingPostReply}
                            >
                                <Mentions.Option>me</Mentions.Option>
                            </Mentions>
                        </Form.Item>
                    </>
                )}
            </>
        );
    }
}

const mapStateToProps = (state: any) => ({
    currentUser: state.account.currentUser,
    postList: state.post.postList,
});

const mapDispatchToProps = (dispatch: any) => ({
    setUpdatePost: async (payload: any) =>
        dispatch({
            type: "UPDATE_POST",
            payload,
        }),
});

export default connect(mapStateToProps, mapDispatchToProps)(Replies);
