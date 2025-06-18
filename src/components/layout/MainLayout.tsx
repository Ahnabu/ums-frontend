
import { Button, Layout, theme } from 'antd';
import { Outlet } from 'react-router-dom';
import Sidebar from './Sidebar';
import { useAppDispatch } from '../../redux/hooks';
import { logout } from '../../redux/features/auth/authSlice';



const { Header, Content, Footer } = Layout;


const MainLayout = () => {

    const dispatch = useAppDispatch();
    const handleLogout = () => {
        dispatch(logout())
    }
    const {
        token: { colorBgContainer, borderRadiusLG },
    } = theme.useToken();

    return (
        <Layout style={{ height: '100%', width: '98.5vw', margin: '0 auto', alignSelf: 'center' }}>
            <Sidebar />
            <Layout style={{ width: '100%', height: '100vh' }}>
                <Header style={{ padding: 0, background: colorBgContainer }} >
                    <Button onClick={handleLogout}>
                        <span style={{ fontSize: '1.5rem', fontWeight: 'bold' }}>Logout</span>
                    </Button>
                </Header>
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
                    {new Date().getFullYear()}
                </Footer>
            </Layout>
        </Layout>
    );
};

export default MainLayout;