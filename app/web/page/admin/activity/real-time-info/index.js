import React from 'react';
import BaseComponent from '~web/layout/base';
import { Card, Table, Form, Row, Col, Button, DatePicker, Popconfirm, message } from 'antd';
import { Link } from 'react-router-dom';
import Input from '~web/component/Input';
import { gerUrlQuery } from '~web/utils';
import { observer, inject } from 'mobx-react';
import { ROW_CONFIG, COL_CONFIG, COMMON_STATUS } from '~web/utils/constant';
import { getRealTimeInfo, deleteRealTimeInfo } from './service';
const { RangePicker } = DatePicker;

@inject(('store'))
@observer
export default class realRimeInfo extends BaseComponent {

    formRef = React.createRef();
    constructor(props) {
        super(props);
        this.state = {
            queryForm: {},
            formLoad: false,
            dataList: [],   //列表数据
            pagination: {}, //页码数据
        }
    }

    componentDidMount() {
        const { location } = this.props;
        const query = gerUrlQuery(location);
        this.loadData(query);
    }

    loadData(params) {
        this.setState({
            queryForm: params,
            formLoad: true,
        })
        this.getListData();
    }

    // 获取列表数据
    getListData = () => {
        const { queryForm } = this.state;
        const pagination = {
            current: queryForm && queryForm.current ? parseInt(queryForm.current) : 1,
            pageSize: queryForm && queryForm.pageSize ? parseInt(queryForm.pageSize) : 10,
        };
        const options = {
            current: pagination.current,
            pageSize: pagination.pageSize,
            title: queryForm.q_title,
        }
        getRealTimeInfo(options).then(res => {
            this.setState({
                dataList: res.data.list,
                pagination: {
                    current: res.data.current + 1,
                    pageSize: res.data.pageSize,
                    total: res.data.total
                }
            })
        }).catch(err => {
            message.error(err.msg);
        })
    }

    // 确认
    onFinish = value => {
        this.pushUrlQuery({
            ...value,
            current: 1,
        });
    }

    // 重置
    onReset = () => {
        this.formRef.current.resetFields();
    }

    // 添加
    add = () => {
        window.location.href = "/activity/real-time-info/detail";
    }

    // 删除
    deleteUser = item => {
        deleteRealTimeInfo({ id: item.id }).then(res => {
            message.success(res.data);
            this.getListData();
        }).catch(err => {
            message.error(err.msg);
        })
    }

    // modal回调
    modalClose = (isLoad) => {
        if (isLoad) {
            this.reload();
        }
    }

    // 重新加载
    reload() {
        const { location } = this.props;
        const query = gerUrlQuery(location);
        this.loadData(query);
    }

    render() {
        const { dataList = [], pagination = {}, queryForm, formLoad } = this.state;
        const columns = [
            {
                title: '标题',
                dataIndex: 'title',
                align: 'center',
            },
            {
                title: '介绍',
                dataIndex: 'introduce',
                align: 'center',
            },
            {
                title: '开始时间',
                dataIndex: 'star_time',
                align: 'center',
            },
            {
                title: '结束时间',
                dataIndex: 'end_time',
                align: 'center',
            },
            {
                title: '操作',
                align: 'center',
                width: 250,
                render: (item) => {
                    return <>
                        <Link style={{ padding: '4px 15px' }} to={`/activity/real-time-info/detail?id=${item.id}`} type="link">编辑</Link>
                        <Popconfirm title="是否要删除？删除后不可恢复。" onConfirm={() => this.deleteUser(item)}>
                            <Button type="link" danger>删除</Button>
                        </Popconfirm>
                    </>
                }
            }
        ];

        return (
            <Card bordered={false} title="活动资讯">
                {formLoad && <Form className="body-form df-form"
                    ref={this.formRef}
                    onFinish={this.onFinish}
                    initialValues={{
                        q_title: queryForm.q_title,
                    }}
                >
                    <Row gutter={ROW_CONFIG}>
                        <Col {...COL_CONFIG}>
                            <Form.Item name="q_title" label="标题" >
                                <Input text='请输入标题' />
                            </Form.Item>
                        </Col>
                        {/* <Col {...COL_CONFIG}>
                            <Form.Item name="q_star_time" label="时间范围" >
                                <RangePicker />
                            </Form.Item>
                        </Col> */}
                        <div className="search-btns">
                            <Button className="add-btn" type="primary" onClick={this.add}>添加</Button>
                            <Button htmlType="submit" type="primary">搜索</Button>
                            <Button style={{ marginLeft: '12px' }} onClick={this.onReset}>重置</Button>
                        </div>
                    </Row>
                </Form>}

                <Table
                    className="body-table"
                    bordered
                    columns={columns}
                    dataSource={dataList}
                    rowKey={record => record.id}
                    pagination={this.showPagination(pagination)}
                    onChange={this.changeTable}
                >
                </Table>

            </Card>
        )
    }
}