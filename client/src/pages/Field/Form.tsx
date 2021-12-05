import React, { useState } from 'react';
import { Form, Input, Select, Button } from 'antd';
import { request } from 'src/utils';

export interface FieldFormProps {
  initialValues?: Record<string, any>;
  submitText?: string;
  onSuccess?: (data: any) => void;
}

const fieldTypes = [
  { label: '单行文本', value: 'Input' },
  { label: '多行文本', value: 'TextArea' },
];

export const FieldForm: React.FC<FieldFormProps> = ({ initialValues, submitText, onSuccess }) => {
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
        url: id ? `/api/field/${id}` : '/api/field',
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
        label="字段名称"
        name="label"
        rules={[{ required: true, whitespace: true, message: '请输入字段名称' }]}
      >
        <Input maxLength={20} />
      </Form.Item>
      <Form.Item
        label="唯一标识"
        name="name"
        tooltip="仅支持输入数字、英文和下划线"
        rules={[
          { required: true, whitespace: true, message: '请输入字段唯一标识' },
          { pattern: /^[0-9a-zA-Z_]+$/g, message: '请输入合法字符' },
        ]}
      >
        <Input maxLength={20} allowClear />
      </Form.Item>
      <Form.Item
        label="字段类型"
        name="type"
        rules={[{ required: true, message: '请选择字段类型' }]}
      >
        <Select>
          {fieldTypes.map((item) => (
            <Select.Option key={item.value} value={item.value}>
              {item.label}
            </Select.Option>
          ))}
        </Select>
      </Form.Item>
      <Form.Item label="字段描述" name="description">
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
