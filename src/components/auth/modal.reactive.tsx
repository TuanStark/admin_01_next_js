'use client'

import { useHasMounted } from "@/utils/customHook";
import { Button, Form, Input, Modal, Steps, notification } from "antd"
import { useState, useEffect } from "react"
import { UserOutlined, SolutionOutlined, CheckOutlined } from "@ant-design/icons";
import { sendRequest } from "@/utils/api";
import { IBackendRes } from "@/types/backend";

const ModalReactive = (props: any) => {
    const { isModalOpen, setIsModalOpen, userEmail } = props;
    const [form] = Form.useForm();
    const [userId, setUserId] = useState("");

    const hasMounted = useHasMounted();
    const [current, setCurrent] = useState(0);

    useEffect(() => {
        if (userEmail) {
            form.setFieldsValue({
                email: userEmail
            });
        }
    }, [userEmail]);
    if (!hasMounted) return <></>;
    const onFinish1 = async (values: any) => {
        console.log(">> check values: ", values);
        const { email } = values;
        const res = await sendRequest<IBackendRes<any>>({
            url: `${process.env.NEXT_PUBLIC_BACKEND_URL}/api/v1/auth/retry-active`,
            method: "POST",
            body: { email }
        });
        if (res?.data) {
            setUserId(res?.data?._id);
            setCurrent(1);
        }else{
            notification.error({
                message: "Gửi lại mã kích hoạt thất bại",
                description: res?.message
            });
        }
    }

    // hanh dong active tai khoan
    const onFinish2 = async (values: any) => {
        console.log(">> check values: ", values);
        const { code } = values;
        const res = await sendRequest<IBackendRes<any>>({
            url: `${process.env.NEXT_PUBLIC_BACKEND_URL}/api/v1/auth/check-code`,
            method: "POST",
            body: { code, userId }
        });
        if (res?.data) {
            setCurrent(2);
        }else{
            notification.error({
                message: "Gửi lại mã kích hoạt thất bại",
                description: res?.message
            });
        }
    }
    return (
        <>
            <Modal
                open={isModalOpen}
                title="Kich hoat tai khoan"
                onOk={() => isModalOpen(false)}
                onCancel={() => isModalOpen(true)}
                maskClosable={false}
            >
                <Steps
                    current={current}
                    items={[
                        {
                            title: 'Login',
                            icon: <UserOutlined />,
                            // status: 'finish',
                        },
                        {
                            title: 'Verification',
                            icon: <SolutionOutlined />,
                            // status: 'finish',
                        },
                        {
                            title: 'Done',
                            icon: <CheckOutlined />,
                            // status: 'wait',
                        },
                    ]}
                />
                {current === 0 &&
                    <>
                        <div style={{ margin: "20px 0" }}>
                            <p>Tai khoan chua kich hoat</p>

                        </div>
                        <Form
                            name="verify"
                            autoComplete="off"
                            layout='vertical'
                            form={form}
                            onFinish={onFinish1}
                        >
                            <Form.Item
                                label=""
                                name="email"
                            >
                                <Input disabled value={userEmail} />
                            </Form.Item>
                            <Form.Item
                            >
                                <Button type="primary" htmlType="submit">
                                    Resend
                                </Button>
                            </Form.Item>
                        </Form>
                    </>
                }
                {current === 1 &&
                    <>
                    <div style={{ margin: "20px 0" }}>
                        <p>Nhập mã xác thực</p>

                    </div>
                    <Form
                        name="verify"
                        autoComplete="off"
                        layout='vertical'
                        form={form}
                        onFinish={onFinish2}
                    >
                        <Form.Item
                            label="Code"
                            name="code"
                            rules={
                                [{ required: true, 
                                    message: 'Please input your code!' 
                                }]}
                        >
                            <Input/>
                        </Form.Item>
                        <Form.Item
                        >
                            <Button type="primary" htmlType="submit">
                                Active
                            </Button>
                        </Form.Item>
                    </Form>
                </>}
                {current === 2 &&
                   <>
                    <div style={{ margin: "20px 0" }}>
                        <p>Kich hoat tai khoan thanh cong. Vui long dang nhap lai</p>
                    </div>
                   </>}
            </Modal>
        </>
    )
}

export default ModalReactive;