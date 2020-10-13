import React from "react";
import { PlusOutlined } from '@ant-design/icons';
import { Button } from 'antd';
import ProTable, { ProColumns } from '@ant-design/pro-table';
import axios from 'axios'

const columns = [
    {
        title: '序号',
        dataIndex: 'index',
        valueType: 'index',
        width: 80,
    },
    {
        title: '角色名称',
        dataIndex: 'FRoleName',
        width: 200,
    },
    {
        title: '角色编号',
        dataIndex: 'FRoleCode',
        width: 100,
    },
    {
        title: '状态',
        dataIndex: 'FEnable',
        width: 100,
        valueEnum: {
            true: {
                text: '启用',
                status: true
            },
            false: {
                text: '禁用',
                status: true
            }

        }
    },
    {
        title: '排序',
        dataIndex: 'FSort',
        width: 80,
        search: false,
    },
    {
        title: '备注',
        dataIndex: 'FMemo',
        width: 150,
        search: false,
    }
];

export default class SysRole extends React.Component{

    constructor(props) {
        super(props);
        this.state = {
            loading: false,
            dataSource: []
        }
    }

    componentDidMount() {
        this.getRole();
    }

    getRole = ()=>{
        axios({
            url: '/api/Role/Get?pageSize=50&page=1&currentPage=1',
            method: 'get'
        }).then(res=>{
            console.log(res);
            let r = res.data;
            if (r.success){
                this.setState({
                    dataSource: r.response.data.map(item=>{
                        item.key = item.FRoleId;
                        return item;
                    })
                })
            }
        })
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
                    onSubmit={(params)=>{
                        console.log(params);
                        this.getRole();
                    }}
                />
            </div>
        )
    }
}
