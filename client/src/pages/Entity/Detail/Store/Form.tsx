import React, { useState } from 'react';
import { Form, Input, Button } from 'antd';
import { request } from 'src/utils';

export interface StoreFormProps {
  initialValues: Record<string, any>;
  fields: Record<string, any>[];
  submitText?: string;
  onSuccess?: (data: any) => void;
}

const componentMap: Record<string, React.ComponentType<any>> = {
  Input,
  TextArea: Input.TextArea,
};

export const StoreForm: React.FC<StoreFormProps> = ({
  initialValues,
  fields,
  submitText,
  onSuccess,
}) => {
  const [form] = Form.useForm();
  const [loading, setLoading] = useState(false);
  // const isUpdateMode = Boolean(initialValues.id);

  const handleFinish = async () => {
    try {
      const values = await form.validateFields();
      const id = initialValues.id;
      const reqData = {
        ...initialValues,
        ...values,
      };
      setLoading(true);
      request({
        url: id ? `/api/store/${id}` : '/api/store',
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
      {fields.map((field) => {
        const Component = componentMap[field.type];
        return (
          Component && (
            <Form.Item key={field.id} label={field.label} name={field.name}>
              <Component />
            </Form.Item>
          )
        );
      })}
      <Form.Item wrapperCol={{ offset: 8, span: 16 }}>
        <Button type="primary" htmlType="submit" loading={loading}>
          {submitText || '提交'}
        </Button>
      </Form.Item>
    </Form>
  );
};
