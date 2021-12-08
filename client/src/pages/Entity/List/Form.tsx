import React, { useState } from 'react';
import { Form, Input, Button } from 'antd';
import { request } from 'src/utils';

export interface EntityFormProps {
  initialValues?: Record<string, any>;
  submitText?: string;
  onSuccess?: (data: any) => void;
}

export const EntityForm: React.FC<EntityFormProps> = ({ initialValues, submitText, onSuccess }) => {
  const [form] = Form.useForm();
  const [loading, setLoading] = useState(false);

  const handleFinish = async () => {
    try {
      const values = await form.validateFields();
      const id = initialValues?.id;
      const reqData = {
        ...initialValues,
        ...values,
      };
      setLoading(true);
      request({
        url: id ? `/api/entity/${id}` : '/api/entity',
        method: id ? 'PATCH' : 'POST',
        data: reqData,
        onSuccess: (data) => {
          onSuccess?.(id ? reqData : data);
        },
        onFinally: () => {
          setLoading(false);
        },
      });
    } catch (error) {}
  };

  return (
    <Form
      form={form}
      labelCol={{ span: 8 }}
      wrapperCol={{ span: 16 }}
      initialValues={initialValues}
      onFinish={handleFinish}
      autoComplete="off"
    >
      <Form.Item
        label="实体名称"
        name="label"
        rules={[{ required: true, whitespace: true, message: '请输入实体名称' }]}
      >
        <Input maxLength={20} />
      </Form.Item>
      <Form.Item
        label="唯一标识"
        name="name"
        tooltip="仅支持输入数字、英文和下划线"
        rules={[
          { required: true, whitespace: true, message: '请输入实体唯一标识' },
          { pattern: /^[0-9a-zA-Z_]+$/g, message: '请输入合法字符' },
        ]}
      >
        <Input maxLength={20} />
      </Form.Item>
      <Form.Item label="实体描述" name="description">
        <Input.TextArea rows={3} maxLength={200} />
      </Form.Item>
      <Form.Item wrapperCol={{ offset: 8, span: 16 }}>
        <Button type="primary" htmlType="submit" loading={loading}>
          {submitText || '提交'}
        </Button>
      </Form.Item>
    </Form>
  );
};
