import React from 'react';
import { Form, Input, Button, Row, Col } from 'antd';

export interface StoreSearchProps {
  loading?: boolean;
  initialValues?: Record<string, any>;
  fields: Record<string, any>[];
  submitText?: string;
  onSearch?: (data: any) => void;
}

const componentMap: Record<string, React.ComponentType<any>> = {
  Input,
  TextArea: Input.TextArea,
};

export const StoreSearch: React.FC<StoreSearchProps> = ({
  loading,
  initialValues,
  fields,
  submitText,
  onSearch,
}) => {
  const [form] = Form.useForm();

  const handleFinish = async () => {
    try {
      const values = await form.validateFields();
      const reqData = {
        ...initialValues,
        ...values,
      };
      onSearch?.(reqData);
    } catch (error) {}
  };

  return (
    <Form form={form} initialValues={initialValues} onFinish={handleFinish} autoComplete="off">
      <Row>
        {fields.map((field) => {
          const Component = componentMap[field.type];
          return (
            Component && (
              <Col key={field.id} span={8}>
                <Form.Item label={field.label} name={field.name} labelCol={{ span: 6 }}>
                  <Component />
                </Form.Item>
              </Col>
            )
          );
        })}
        <Col span={8}>
          <Form.Item wrapperCol={{ offset: 6 }}>
            <Button type="primary" htmlType="submit" loading={loading}>
              {submitText || '搜索'}
            </Button>
          </Form.Item>
        </Col>
      </Row>
    </Form>
  );
};
