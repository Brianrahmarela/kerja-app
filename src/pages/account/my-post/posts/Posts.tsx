import { Card, List, Spin } from "antd";
import { AxiosResponse } from "axios";
import moment from "moment";
import React from "react";
import { getFeed } from "../../../../repository/FeedRepo";
import InfiniteScroll from "react-infinite-scroller";
import { connect } from "react-redux";
import PostItem from "./../../../home/posts/PostItem";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faCircleNotch } from "@fortawesome/free-solid-svg-icons";

export interface PostsProps {
    t?: (x: any) => void;
    setPostList?: (x: any) => any;
    updatePost?: (x: any) => any;
    deletePost?: (x: any) => any;
    updateCountNewPost?: (x: any) => any;
    currentUser?: any;
    pagination?: any;
    postList?: any[];
    countNewPost?: number;
}

export interface PostsState {
    hasMore: boolean;
    loading: boolean;
    scrolled: boolean;
    showPreview: boolean;
    showEditPost: boolean;
    mediaDataPreview: any[];
    postData: any;
    likes: any[];
}

class Posts extends React.Component<PostsProps, PostsState> {
    state = {
        hasMore: true,
        loading: false,
        scrolled: false,
        mediaDataPreview: [] as any[],
        showPreview: false,
        showEditPost: false,
        postData: null as any,
        likes: [] as any[],
    };

    loadMore = (e: any) => {
        const { pagination, postList } = this.props;

        this.setState({
            loading: true,
        });
        const params = { ...pagination };
        params.page = e;
        if (postList?.length) {
            const lastId = postList?.[postList?.length - 1].id;
            params.postId = lastId;
        }
        getFeed(params)
            .then((res: AxiosResponse<any>) => {
                let newPostingList: any[] = res.data.content?.concat(postList) as any[];
                newPostingList = newPostingList.sort((a: any, b: any) => moment(b.createdAt).diff(moment(a.createdAt)));
                params.total = res.data.total;
                this.props.setPostList?.({
                    postList: newPostingList,
                    pagination: params,
                });
                this.setState({
                    hasMore: newPostingList.length < res.data.total,
                });
            })
            .catch((e) => {
                console.log(e.response);
                this.setState({ hasMore: false });
            })
            .finally(() => {
                this.setState({
                    loading: false,
                });
            });
    };
    render() {
        const { postList } = this.props;
        return (
            <InfiniteScroll initialLoad={true} pageStart={0} loadMore={this.loadMore} hasMore={!this.state.loading && this.state.hasMore} useWindow={true}>
                <List
                    dataSource={postList || []}
                    split={false}
                    locale={{
                        emptyText: <Card>No Post</Card>,
                    }}
                    renderItem={(post: any, i: number) => (
                        <List.Item key={post.id + i} style={{ padding: 0, marginBottom: 15 }}>
                            <PostItem postData={post} />
                        </List.Item>
                    )}
                >
                    {this.state.loading && this.state.hasMore && <Spin indicator={<FontAwesomeIcon icon={faCircleNotch} className="fa-spin" />} />}
                </List>
            </InfiniteScroll>
        );
    }
}

const mapStateToProps = (state: any) => ({
    currentUser: state.account.currentUser,
    postList: state.post.postList,
    pagination: state.post.pagination,
    countNewPost: state.notif.countNewPost,
});

const mapDispatchToProps = (dispatch: any) => ({
    setPostList: (payload: any) =>
        dispatch({
            type: "SET_POST_LIST",
            payload,
        }),
    updatePost: (payload: any) =>
        dispatch({
            type: "UPDATE_POST",
            payload,
        }),
    deletePost: (payload: any) =>
        dispatch({
            type: "DELETE_POST",
            payload,
        }),
    updateCountNewPost: (payload: any) =>
        dispatch({
            type: "SET_COUNT_NEW_POST",
            payload,
        }),
});

export default connect(mapStateToProps, mapDispatchToProps)(Posts);
