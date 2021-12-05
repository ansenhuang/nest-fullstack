import React, { useRef, useState } from 'react';
import { Link } from 'react-router-dom';
import { Table, TableProps, Button, Modal, Space, Popconfirm, message } from 'antd';
import { useRequest, request } from 'src/utils';
import { EntityForm } from './Form';

const pageSize = 20;

export const EntityList: React.FC = () => {
  const [editVisible, setEditVisible] = useState(false);
  const [editValues, setEditValues] = useState<Record<string, any>>({});

  const editFormKeyRef = useRef(Date.now());
  const { data, setData, loading, currentRequest } = useRequest<{ count: number; rows: any[] }>({
    initialData: {
      count: 0,
      rows: [],
    },
    url: '/api/entity',
    params: {
      page: 1,
      pageSize,
    },
  });

  const list = data.rows;
  const total = data.count;
  const columns: TableProps<any>['columns'] = [
    {
      title: 'ID',
      dataIndex: 'id',
    },
    {
      title: '名称',
      dataIndex: 'label',
      render: (value, row) => <Link to={`/entity/field?entityId=${row.id}`}>{value}</Link>,
    },
    {
      title: '唯一标识',
      dataIndex: 'name',
    },
    {
      title: '描述',
      dataIndex: 'description',
    },
    {
      title: '创建时间',
      dataIndex: 'createdAt',
    },
    {
      title: '更新时间',
      dataIndex: 'updatedAt',
    },
    {
      title: '操作',
      render: (_, row, index) => (
        <Space size="large">
          <a onClick={() => handleEdit(row)}>编辑</a>
          <Popconfirm
            title={`确定删除【${row.label}】实体吗？`}
            onConfirm={() => handleDelete(row)}
          >
            <a>删除</a>
          </Popconfirm>
        </Space>
      ),
    },
  ];

  const handleEdit = (values: any) => {
    editFormKeyRef.current = Date.now();
    setEditVisible(true);
    setEditValues(values);
  };
  const handleEditSuccess = (values: any) => {
    setEditVisible(false);

    const nextList = [...list];
    const oldIndex = list.findIndex((item) => item.id === values.id);
    if (oldIndex === -1) {
      nextList.push(values);
    } else {
      nextList.splice(oldIndex, 1, values);
    }
    setData({ ...data, rows: nextList });
    message.success(oldIndex === -1 ? '实体新建成功' : '实体更新成功');
  };
  const handleDelete = (values: any) => {
    if (!values.id) return;

    request({
      url: `/api/entity/${values.id}`,
      method: 'DELETE',
      onSuccess: () => {
        const nextList = list.filter((item) => item.id !== values.id);
        setData({ ...data, rows: nextList });
        message.success('实体删除成功');
      },
    });
  };
  const handlePageChange = (nextPage: number) => {
    currentRequest({
      params: {
        page: nextPage,
        pageSize,
      },
    });
  };

  return (
    <>
      <Table
        title={() => (
          <Button type="primary" onClick={() => handleEdit({})}>
            新建实体
          </Button>
        )}
        loading={loading}
        rowKey="id"
        dataSource={list}
        columns={columns}
        pagination={{
          defaultCurrent: 1,
          defaultPageSize: pageSize,
          total,
          onChange: handlePageChange,
        }}
      />
      <Modal
        visible={editVisible}
        title={(editValues.id ? '编辑' : '新建') + '实体'}
        footer={null}
        onCancel={() => setEditVisible(false)}
      >
        <EntityForm
          key={editFormKeyRef.current}
          initialValues={editValues}
          onSuccess={handleEditSuccess}
        />
      </Modal>
    </>
  );
};
