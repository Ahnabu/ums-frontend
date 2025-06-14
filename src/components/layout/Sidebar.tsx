import { Menu } from "antd";
import Sider from "antd/es/layout/Sider";
import sidebarItemsGenerator from "../../utils/sidebarItemsGenerator";
import { adminPaths } from "../../routes/admin.routes";
import { facultyPaths } from "../../routes/faculty.routes";
import { studentPaths } from "../../routes/student.routes";
import { useAppSelector } from "../../redux/hooks";
import { selectCurrentUser } from "../../redux/features/auth/authSlice";
import { superAdminPaths } from "../../routes/superAdmin.routes";

const userRole = {
    ADMIN: 'admin',
    SUPER_ADMIN: 'superAdmin',
    FACULTY: 'faculty',
    STUDENT: 'student'
}
const Sidebar = () => {

    const user = useAppSelector(selectCurrentUser);
    let sidebarItems;
    switch (user!.role) {
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
        default:
            break;
    }
    return (
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
            <Menu theme="dark" mode="inline" defaultSelectedKeys={['4']} items={sidebarItems} />
        </Sider>
    )
}

export default Sidebar