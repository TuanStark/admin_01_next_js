
'use client'
import { Layout } from 'antd';


export default function AdminFooter() {
    const { Footer } = Layout;

    return (
        <>
            <Footer style={{ textAlign: 'center' }}>
                    TuanStark ©{new Date().getFullYear()} Created by TuanStark
                </Footer>
        </>
    );
}