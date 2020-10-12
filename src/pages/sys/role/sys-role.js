import React from "react";
import { PlusOutlined } from '@ant-design/icons';
import { Button } from 'antd';
import ProTable, { ProColumns } from '@ant-design/pro-table';

const columns = [
    {
        title: '序号',
        dataIndex: 'index',
        valueType: 'index',
        width: 80,
    },
    {
        title: '状态',
        dataIndex: 'status',
        initialValue: 'all',
        width: 100,
        filters: true,
        valueEnum: {
            all: { text: '全部', status: 'Default' },
            close: { text: '关闭', status: 'Default' },
            running: { text: '运行中', status: 'Processing' },
            online: { text: '已上线', status: 'Success' },
            error: { text: '异常', status: 'Error' },
        },
    },
    {
        title: '进度',
        key: 'progress',
        dataIndex: 'progress',
        valueType: (item) => ({
            type: 'progress',
            status: item.status !== 'error' ? 'active' : 'exception',
        }),
        width: 200,
    },
    {
        title: '更新时间',
        key: 'since2',
        width: 120,
        dataIndex: 'createdAt',
        valueType: 'date',
    },
];

export default class SysRole extends React.Component{

    constructor(props) {
        super(props);
        this.state = {
            loading: false,
            dataSource: []
        }
    }

    render() {
        let { loading, dataSource} = this.state;
        return (
            <div>
                <ProTable
                    columns={columns}
                    rowKey="key"
                    pagination={{
                        showSizeChanger: true,
                    }}
                    loading={loading}
                    dataSource={dataSource}
                    // options={{
                    //     density: true,
                    //     reload: () => {
                    //
                    //     },
                    //     fullScreen: true,
                    //     setting: true,
                    // }}
                    dateFormatter="string"
                    // headerTitle="dataSource 和 loading"
                    toolBarRender={() => [
                        <Button key="3" type="primary">
                            <PlusOutlined />
                            新建
                        </Button>,
                    ]}
                />
            </div>
        )
    }
}
