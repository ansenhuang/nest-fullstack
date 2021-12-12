import React, { useState } from 'react';
import { Card, Form, Input, Button } from 'antd';
import { useAuth } from 'src/utils/hooks';

const LoginPage: React.FC = () => {
  const [loading, setLoading] = useState(false);
  const [form] = Form.useForm();
  const auth = useAuth();

  const handleSubmit = async () => {
    try {
      const values = await form.validateFields();
      setLoading(true);
      await auth.login(values);
      setLoading(false);
    } catch (error) {
      setLoading(false);
    }
  };

  return (
    <Card title="登录/注册" style={{ width: 500, margin: '50px auto' }}>
      <Form
        form={form}
        labelCol={{ span: 4 }}
        wrapperCol={{ span: 20 }}
        onFinish={handleSubmit}
        autoComplete="off"
      >
        <Form.Item
          label="用户名"
          name="username"
          rules={[{ required: true, message: 'Please input your username!' }]}
        >
          <Input />
        </Form.Item>
        <Form.Item
          label="密码"
          name="password"
          rules={[{ required: true, message: 'Please input your password!' }]}
        >
          <Input.Password />
        </Form.Item>
        <Form.Item wrapperCol={{ offset: 4, span: 20 }}>
          <Button type="primary" htmlType="submit" loading={loading}>
            登录/注册
          </Button>
        </Form.Item>
      </Form>
    </Card>
  );
};

export default LoginPage;
