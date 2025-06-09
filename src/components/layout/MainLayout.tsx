
import { Layout, Menu, theme } from 'antd';
import { Outlet } from 'react-router-dom';
import { adminSidebarItems } from '../../routes/admin.routes';


const { Header, Content, Footer, Sider } = Layout;


const MainLayout = () => {
    const {
        token: { colorBgContainer, borderRadiusLG },
    } = theme.useToken();

    return (
        <Layout style={{ height: '100vh', width: '98.5vw', margin: '0 auto', alignSelf: 'center' }}>
            <Sider
                breakpoint="xxl"
                collapsedWidth="0"
                onBreakpoint={(broken) => {
                    console.log(broken);
                }}
                onCollapse={(collapsed, type) => {
                    console.log(collapsed, type);
                }}
            >
                <div className="demo-logo-vertical" style={{ textAlign: "center", alignItems: "center" }} >
                    <h1 >UMS</h1>
                </div>
                <Menu theme="dark" mode="inline" defaultSelectedKeys={['4']} items={adminSidebarItems} />
            </Sider>
            <Layout style={{ width: '100%', height: '100vh' }}>
                <Header style={{ padding: 0, background: colorBgContainer }} />
                <Content style={{ margin: '24px 16px 0' }}>
                    <div
                        style={{
                            padding: 24,
                            minHeight: 360,
                            background: colorBgContainer,
                            borderRadius: borderRadiusLG,
                            width: '100%',
                        }}
                    >
                        <Outlet />
                    </div>
                </Content>
                <Footer style={{ textAlign: 'center' }}>
                    Ant Design ©{new Date().getFullYear()} Created by Ant UED
                </Footer>
            </Layout>
        </Layout>
    );
};

export default MainLayout;