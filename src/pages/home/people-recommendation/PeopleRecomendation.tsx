import { faCaretDown, faUserPlus } from "@fortawesome/free-solid-svg-icons";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { Avatar, Button, Card, Col, List, Row } from "antd";
import { AxiosResponse } from "axios";
import React from "react";
import { Link } from "react-router-dom";
import { getUserSuggestion, postFollowUser } from "../../../repository/UserRepo";

export interface PeopleRecommendationProps {}

export interface PeopleRecommendationState {
    suggestions: any[];
    pagination: any;
}

class PeopleRecommendation extends React.Component<PeopleRecommendationProps, PeopleRecommendationState> {
    state = {
        suggestions: [] as any[],
        pagination: {},
    };
    componentDidMount() {
        this.loadData();
    }
    loadData() {
        getUserSuggestion(this.state.pagination).then((res: AxiosResponse<any>) => {
            this.setState({
                suggestions: res.data.content,
            });
        });
    }
    followUser = (userId: number) => {
        postFollowUser({ userId }).then((res: AxiosResponse<any>) => {
            this.loadData();
        });
    };
    render() {
        return (
            <Card className="recommendation-widget" bordered={false}>
                <List
                    header="People"
                    footer={
                        <>
                            <Link to="">
                                Lainnya <FontAwesomeIcon icon={faCaretDown} />
                            </Link>
                        </>
                    }
                    size="small"
                    split={false}
                    dataSource={this.state.suggestions}
                    renderItem={(item) => (
                        <List.Item style={{ alignItems: "flex-start" }}>
                            <Col flex={"40px"} style={{ paddingLeft: 0 }}>
                                <Avatar size={"large"}></Avatar>
                            </Col>
                            <Col flex="auto">
                                <Row justify="space-between" align="top">
                                    <Col>
                                        <div>
                                            {item.firstName} {item.lastName}
                                        </div>
                                        <div className="grey-primary" style={{ fontSize: 12 }}>
                                            CEO Kopi Jawa
                                        </div>
                                        <div className="grey-primary" style={{ fontSize: 10 }}>
                                            73 rb Pengikut
                                        </div>
                                    </Col>
                                    <Col>
                                        <Button type="link" style={{ fontSize: 12 }} icon={<FontAwesomeIcon icon={faUserPlus} style={{ marginRight: 5 }} />} onClick={() => this.followUser(item.userId)}>
                                            Ikuti
                                        </Button>
                                    </Col>
                                </Row>
                            </Col>
                        </List.Item>
                    )}
                />
            </Card>
        );
    }
}

export default PeopleRecommendation;
