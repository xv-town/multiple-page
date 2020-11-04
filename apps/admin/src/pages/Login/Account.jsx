import React, { useState } from 'react';
import { Form, Input, Button, Alert } from 'antd';
import { UserOutlined, LockOutlined } from '@ant-design/icons';

import { login } from '../../services/auth';
import { saveToken } from '../../utils/auth';

function encodeBase64 (CryptoJS, words) {
	const str = CryptoJS.enc.Utf8.parse(words);
  const base64 = CryptoJS.enc.Base64.stringify(str);
  return base64;
}
function loadCryptoJs (cb) {
  import(/* webpackChunkName: "crypto-js" */ 'crypto-js').then(res => {
    cb(res.default);
  }).catch(err => {
    console.log(err);
    window.alert('script load fail!');
  })
}

const FormLayoutDemo = (props) => {
  const [form] = Form.useForm();
  const [errorMsg, onSaveErrorMsg] = useState('');
  const [requesting, onSaveRequesting] = useState(false);

  const onSubmit = (values) => {
    if (requesting) return;

    const { username, password } = values;
    onSaveRequesting(true);

    loadCryptoJs(CryptoJS => {
      const errorMessage = '登录出错';
      login({
        username,
        password: encodeBase64(CryptoJS, password)
      }).then(res => {
        const { code, data, msg } = res.data
        if (code === 200) {
          saveToken(data.token);
          props.success && props.success();
        } else {
          onSaveErrorMsg(msg || errorMessage);
          onSaveRequesting(false);
        }
      }).catch(() => {
        onSaveErrorMsg(errorMessage);
        onSaveRequesting(false);
      });
    });
  }

  return (
    <>
      <Form
        layout="vertical"
        form={form}
        onFinish={onSubmit}
      >
        {
          !!errorMsg ? <Alert
            type="error"
            showIcon
            message={ errorMsg }
            style={{ marginBottom: '24px' }}
          /> : null
        }
        <Form.Item
          name="username"
          rules={[{ required: true, message: '用户名不能为空' }]}
        >
          <Input
            size="large"
            prefix={<UserOutlined />}
            placeholder="用户名"
          />
        </Form.Item>
        <Form.Item
          name="password"
          rules={[{ required: true, message: '用户密码不能为空' }]}
        >
          <Input.Password
            size="large"
            prefix={<LockOutlined />}
            placeholder="密码"
          />
        </Form.Item>
        <Form.Item>
          <Button
            loading={requesting}
            style={{ width: '100%' }}
            type="primary"
            size="large"
            htmlType="submit"
          >登录</Button>
        </Form.Item>
      </Form>
    </>
  );
};

export default FormLayoutDemo;