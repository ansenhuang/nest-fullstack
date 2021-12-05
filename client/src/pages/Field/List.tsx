import React, { useMemo, useRef, useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { Table, TableProps, Button, Modal, Space, Popconfirm, message, notification } from 'antd';
import { useRequest, request, getUid } from 'src/utils';
import { FieldForm } from './Form';

const pageSize = 100;

export const FieldList: React.FC = () => {
  const [editVisible, setEditVisible] = useState(false);
  const [editValues, setEditValues] = useState<Record<string, any>>({});

  const editFormKeyRef = useRef(Date.now());
  const navigate = useNavigate();
  const searchParams = useMemo(() => {
    return new URLSearchParams(window.location.search);
  }, []);

  const { data, setData, loading, currentRequest } = useRequest<{ count: number; rows: any[] }>({
    initialData: {
      count: 0,
      rows: [],
    },
    url: '/api/field',
    params: {
      entityId: searchParams.get('entityId'),
      page: 1,
      pageSize,
    },
    beforeRequest: (options) => {
      if (!options.params.entityId) {
        const key = 'field_' + Date.now();
        notification.error({
          key,
          message: '请求拦截',
          description: (
            <span>
              参数缺少实体ID，
              <a onClick={() => navigate('/entity')}>返回实体列表</a>
            </span>
          ),
          duration: null,
          onClick: () => {
            notification.close(key);
          },
        });
        return true;
      }
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
      title: '字段名称',
      dataIndex: 'label',
    },
    {
      title: '唯一标识',
      dataIndex: 'name',
    },
    {
      title: '字段类型',
      dataIndex: 'type',
    },
    {
      title: '字段描述',
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
            title={`确定删除【${row.label}】字段吗？`}
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
    setEditValues({ entityId: searchParams.get('entityId'), ...values });
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
    message.success(oldIndex === -1 ? '字段新建成功' : '字段更新成功');
  };
  const handleDelete = (values: any) => {
    if (!values.id) return;

    request({
      url: `/api/field/${values.id}`,
      method: 'DELETE',
      onSuccess: () => {
        const nextList = list.filter((item) => item.id !== values.id);
        setData({ ...data, rows: nextList });
        message.success('字段删除成功');
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
          <Button type="primary" onClick={() => handleEdit({ name: getUid() })}>
            新建字段
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
        title={(editValues.id ? '编辑' : '新建') + '字段'}
        footer={null}
        onCancel={() => setEditVisible(false)}
      >
        <FieldForm
          key={editFormKeyRef.current}
          initialValues={editValues}
          onSuccess={handleEditSuccess}
        />
      </Modal>
    </>
  );
};
