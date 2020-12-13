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
import {edit} from "../../../api/sys/role";


let formData = {
	FRoleName: "",
	FRoleCode: "",
	FSort: 0,
	FEnable: true,
	FMemo: "",
}



export default class SysRole extends React.Component{

	constructor(props) {
		super(props);
		this.state = {
			loading: false,
			dataSource: [],
			form: {
				page: 1,
				pageSize: 20
			},
			total: 0,
			title: "新建",

			visible: false,
			disabled: false,
			formData: _.cloneDeep(formData)
		}
	}

	componentDidMount() {
		this.getRole();
	}

	getRole = ()=>{
		let form = this.state.form;
		this.setState({
			loading: true
		})
		getAll(form).then(res=>{
			console.log(res);
			let r = res;
			if (r.success){
				this.setState({
					dataSource: r.response.data.map(item=>{
						item.key = item.FRoleId;
						return item;
					}),
					loading: false,
					total: r.response.dataCount
				})
			}
		}).catch(err=>{
			this.setState({
				loading: false
			})
		})
	};

	createHandle = ()=>{
		this.setState({
			title: "新建",
			visible: true,
			formData: _.cloneDeep(formData)
		})
	}

	render() {
		let { loading, dataSource, visible, disabled, title, formData, total } = this.state;
		console.log(this.state);
		let columns = [
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
				render: (text, record, _t, action) => [
					<Button key="edit"
					        onClick={() => {
						        console.log(this);
						        this.setState({
							        formData: _.cloneDeep(record),
							        title: "编辑",
							        visible: true,
						        })
					        }}
					>
						编辑
					</Button>,
					<Button key="delete">删除</Button>
				],
			},
		];

		let Modal = (
			<ModalForm
				key="modal"
				title={title}
				visible={visible}
				trigger={
					<Button type="primary" onClick={this.createHandle}>
						<PlusOutlined />
						新建
					</Button>
				}
				modalProps={{
					onCancel: () => {
						this.setState({
							visible: false
						})
					},
					destroyOnClose: true
				}}
				submitter={{
					submitButtonProps: {
						disabled: disabled,
						loading: disabled
					}
				}}

				onFinish={async (values) => {

					console.log(values);
					this.setState({
						disabled: true
					});
					let result = null;
					if (title == "新建"){
						result = await add(values).then(res=>{
							if (res.success){
								this.getRole();
							}
							return res.success;
						}).catch(err=>{});
					}

					if (title == "编辑"){
						result = await edit({
							...formData,
							...values
						}).then(res=>{
							if (res.success){
								this.getRole();
							}
							return res.success;
						}).catch(err=>{});
					}


					console.log(result);
					this.setState({
						disabled: false,
						visible: false
					});
				}}
			>
				<Row gutter={15}>
					<Col span={12}>
						<ProFormText
							width="m"
							name="FRoleName"
							label="角色名称"
							placeholder="请输入名称"
							initialValue={formData.FRoleName}
							rules={[{ required: true, message: "请输入角色名称" }]}
						/>
					</Col>
					<Col span={12}>
						<ProFormText
							width="m"
							name="FRoleCode"
							label="角色编号"
							placeholder="请输入角色编号"
							initialValue={formData.FRoleCode}
							rules={[{ required: true, message: "请输入角色编号" }]}
						/>
					</Col>

					<Col span={12}>
						<ProFormDigit width="m" name="FSort" initialValue={formData.FSort} label="排序" />
					</Col>
					<Col span={12}>
						<ProFormSwitch name="FEnable" label="状态" initialValue={formData.FEnable} />
					</Col>

					<Col span={24}>
						<ProFormTextArea name="FMemo" label="备注" initialValue={formData.FMemo} placeholder="请输入备注" />
					</Col>
				</Row>
			</ModalForm>
		);

		return (
			<>
				<ProTable
					columns={columns}
					bordered
					rowKey="key"
					loading={loading}
					dataSource={dataSource}
					scroll={{ y: 375 }}
					options={{
					    density: true,
					    reload: () => {
							this.getRole();
					    },
					    fullScreen: true,
					    setting: true,
					}}
					dateFormatter="string"
					// headerTitle="dataSource 和 loading"
					pagination={{
						showSizeChanger: true,
						pageSize: this.state.form.pageSize,
						total: total,
						onChange: (page, pageSize)=>{
							console.log(page, pageSize);
							this.setState({
								form: {
									...this.state.form,
									page,
									pageSize
								}
							}, ()=>{
								this.getRole();
							});
						}
					}}
					toolBarRender={() => [
						<Button key="3" type="primary" onClick={this.createHandle}>
						 <PlusOutlined />
						 新建
						 </Button>,
						// Modal
					]}
					onSubmit={(params)=>{
						console.log(params);
						this.setState({
							form: { ...this.state.form, ...params }
						});
						this.getRole();
					}}
				/>

				{ visible && Modal }
			</>
		)
	}
}
