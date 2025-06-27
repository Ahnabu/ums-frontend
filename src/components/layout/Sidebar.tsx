import { Layout, Menu } from 'antd';
import { sidebarItemsGenerator } from '../../utils/sidebarItemsGenerator';
import { adminPaths } from '../../routes/admin.routes';
import { facultyPaths } from '../../routes/faculty.routes';
import { studentPaths } from '../../routes/student.routes';
import { useAppSelector } from '../../redux/hooks';
import {
    type TUser, useCurrentToken,
} from '../../redux/features/auth/authSlice';
import { verifyToken } from '../../utils/verifyToken';
import { superAdminPaths } from '../../routes/superAdmin.routes';

const { Sider } = Layout;

const userRole = {
    ADMIN: 'admin',
    FACULTY: 'faculty',
    STUDENT: 'student',
    SUPER_ADMIN: 'superAdmin',
};

const Sidebar = () => {
    const token = useAppSelector(useCurrentToken);

    let user;

    if (token) {
        user = verifyToken(token);
    }

    let sidebarItems;
    switch ((user as TUser)!.role) {
        case userRole.ADMIN:
            sidebarItems = sidebarItemsGenerator(adminPaths, userRole.ADMIN);
            break;
        case userRole.SUPER_ADMIN:

            sidebarItems = sidebarItemsGenerator(superAdminPaths, userRole.SUPER_ADMIN);
            break;
        case userRole.FACULTY:
            sidebarItems = sidebarItemsGenerator(facultyPaths, userRole.FACULTY);
            break;
        case userRole.STUDENT:
            sidebarItems = sidebarItemsGenerator(studentPaths, userRole.STUDENT);
            break;
    }
    return (
        <Sider
            breakpoint="xxl"
            collapsedWidth="0"
            onBreakpoint={(broken) => {
                console.log(broken);
            }}
            style={{ height: "100vh", position: "sticky", top: 0, left: 0, zIndex: 1000 }}
        >

            <div
                style={{
                    color: 'white',
                    height: '4rem',
                    display: 'flex',
                    justifyContent: 'center',
                    alignItems: 'center',
                }}
            >
                <h1>PH Uni</h1>
            </div>
            <Menu
                theme="dark"
                mode="inline"
                defaultSelectedKeys={['4']}
                items={sidebarItems}
            />
        </Sider>
    );
};

export default Sidebar;