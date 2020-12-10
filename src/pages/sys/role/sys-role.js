import React from "react";
import { PlusOutlined } from '@ant-design/icons';
import { Button, message, Input, Row, Col } from 'antd';
import ProTable, { ProColumns } from '@ant-design/pro-table';
import ProForm, {
	ModalForm,
	ProFormText,
	ProFormDateRangePicker,
	ProFormSelect,
	ProFormTextArea,
	ProFormSwitch,
	ProFormDigit
} from '@ant-design/pro-form';

import { getAll, add } from '@/api/sys/role'

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
	},
	{
		title: '操作',
		valueType: 'option',
		render: (text, record, _, action) => [
			<Button key="edit"
				onClick={() => {

				}}
			>
				编辑
			</Button>,
			<Button key="delete">删除</Button>
		],
	},
];




export default class SysRole extends React.Component{

	constructor(props) {
		super(props);
		this.state = {
			loading: false,
			dataSource: [],
			form: {},
		}
	}

	componentDidMount() {
		this.getRole();
	}

	getRole = ()=>{
		let form = this.state.form;
		getAll(form).then(res=>{
			console.log(res);
			let r = res;
			if (r.success){
				this.setState({
					dataSource: r.response.data.map(item=>{
						item.key = item.FRoleId;
						return item;
					})
				})
			}
		})
	};

	createHandle = ()=>{
		this.setState({
			visible: true
		})
	}

	render() {
		let { loading, dataSource } = this.state;
		let Modal = (
			<ModalForm
				key="modal"
				title="新建/编辑"
				trigger={
					<Button type="primary">
						<PlusOutlined />
						新建
					</Button>
				}
				modalProps={{
					onCancel: () => {

					},
				}}
				onFinish={async (values) => {

					console.log(values);
					//message.success('提交成功！');
					let result = await add(values).then(res=>{
						if (res.success){
							this.getRole();
						}
						return res.success;
					}).catch(err=>{});
					console.log(result);
					return result
				}}
			>
				<ProForm.Group>
					<Row gutter={15}>

					</Row>
				</ProForm.Group>
				<Row gutter={15}>
					<Col span={12}>
						<ProFormText
							width="m"
							name="FRoleName"
							label="角色名称"
							placeholder="请输入名称"
							rules={[{ required: true, message: "请输入角色名称" }]}
						/>
					</Col>
					<Col span={12}>
						<ProFormText
							width="m"
							name="FRoleCode"
							label="角色编号"
							placeholder="请输入角色编号"
							rules={[{ required: true, message: "请输入角色编号" }]}
						/>
					</Col>

					<Col span={12}>
						<ProFormDigit width="m" name="FSort" initialValue={0} label="排序" />
					</Col>
					<Col span={12}>
						<ProFormSwitch name="FEnable" label="状态" initialValue={true} />
					</Col>

					<Col span={24}>
						<ProFormTextArea name="FMemo" label="备注" initialValue="" placeholder="请输入备注" />
					</Col>
				</Row>
			</ModalForm>
		);

		return (
			<>
				<ProTable
					columns={columns}
					rowKey="key"
					pagination={{
						showSizeChanger: true,
					}}
					loading={loading}
					dataSource={dataSource}
					scroll={{ y: 375 }}
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
						/**<Button key="3" type="primary">
						 <PlusOutlined />
						 新建
						 </Button>, */
						Modal
					]}
					onSubmit={(params)=>{
						console.log(params);
						this.setState({
							form: { ...this.state.form, ...params }
						});
						this.getRole();
					}}
				/>


			</>
		)
	}
}
