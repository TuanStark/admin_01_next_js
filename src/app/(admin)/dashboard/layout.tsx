import React from "react";
import { Layout } from "antd";
import AdminSidebar from "../../../components/layout/adminSidebar";
import AdminHeader from "../../../components/layout/adminHeader";
import AdminFooter from "../../../components/layout/adminFooter";
import AdminContent from "../../../components/layout/adminContent";

const AdminLayout = ({
    children,
  }: Readonly<{
    children: React.ReactNode;
  }>) => {
    const { Content } = Layout;
    return (
       
        <Layout>
        <AdminSidebar />
        <Layout>
            <AdminHeader />
            <AdminContent>
                {children}
            </AdminContent>
            <AdminFooter />
        </Layout>
    </Layout>
    );
};

export default AdminLayout;