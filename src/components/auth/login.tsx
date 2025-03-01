'use client'
import { Button, Col, Divider, Form, Input, Row, message, notification } from 'antd';
import { ArrowLeftOutlined } from '@ant-design/icons';
import Link from 'next/link';
import { authenticate } from '@/utils/action';
import { useRouter } from 'next/navigation';

const Login = () => {
    const router = useRouter();

    const onFinish = async (values: any) => {
        console.log(">> check values: ", values);
        const { email, password } = values;
        const res = await authenticate({
            email: email,
            password: password,
        });
        console.log(">> check res: ", res);
        if (res?.error) {
            notification.error({
                message: "Error login",
                description: res.error,
                duration: 3
            });
            if ('code' in res && res.code === 2) {
                router.push("/verify-email");
            }
        } else {
            //redirect to home page
            router.push("/dashboard");
        }
    };

    return (
        <Row justify={"center"} style={{ marginTop: "30px" }}>
            <Col xs={24} md={16} lg={8}>
                <fieldset style={{
                    padding: "15px",
                    margin: "5px",
                    border: "1px solid #ccc",
                    borderRadius: "5px"
                }}>
                    <legend>Đăng Nhập</legend>
                    <Form
                        name="basic"
                        onFinish={onFinish}
                        autoComplete="off"
                        layout='vertical'
                    >
                        <Form.Item
                            label="Email"
                            name="email"
                            rules={[
                                { required: true, message: 'Please input your email!' },
                                { type: 'email', message: 'Invalid email format!' }
                            ]}
                        >
                            <Input />
                        </Form.Item>

                        <Form.Item
                            label="Password"
                            name="password"
                            rules={[
                                { required: true, message: 'Please input your password!' },
                                { min: 6, message: 'Password must be at least 6 characters!' }
                            ]}
                        >
                            <Input.Password />
                        </Form.Item>



                        <Form.Item
                        >
                            <Button type="primary" htmlType="submit">
                                Login
                            </Button>
                        </Form.Item>
                    </Form>
                    <Link href={"/"}><ArrowLeftOutlined /> Quay lại trang chủ</Link>
                    <Divider />
                    <div style={{ textAlign: "center" }}>
                        Chưa có tài khoản? <Link href={"/auth/register"}>Đăng ký tại đây</Link>
                    </div>
                </fieldset>
            </Col>
        </Row>
    )
}

export default Login;