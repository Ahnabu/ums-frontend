import { createBrowserRouter } from "react-router-dom";
import App from "../App";
import About from "../pages/About";
import Contact from "../pages/Contact";
import Login from "../pages/Login";
import { routeGenerator } from "../utils/routesGenerator";
import { adminPaths } from "./admin.routes";
import { facultyPaths } from "./faculty.routes";
import { studentPaths } from "./student.routes";
import { superAdminPaths } from "./superAdmin.routes";
import ProtectedRoute from "../components/layout/ProtectedRoute";
import ChangePassword from "../pages/ChangePassword";


const router = createBrowserRouter([
    {
        path: "/",
        element: <App />,
        children: [
            {
                path: 'about',
                element: <About />
            },
            {
                path: 'contact',
                element: <Contact />
            }, {
                path: '/change-password',
                element: <ChangePassword />
            }
        ]
    },
    {
        path: "/superAdmin",
        element: <App />,
        children: routeGenerator(superAdminPaths)
    },
    {
        path: '/admin',
        element: (
            <ProtectedRoute role="admin">
                <App />
            </ProtectedRoute>
        ),
        children: routeGenerator(adminPaths),
    },
    {
        path: '/faculty',
        element: (
            <ProtectedRoute role="faculty">
                <App />
            </ProtectedRoute>
        ),
        children: routeGenerator(facultyPaths),
    },
    {
        path: '/student',
        element: (
            <ProtectedRoute role="student">
                <App />
            </ProtectedRoute>
        ),
        children: routeGenerator(studentPaths),
    },

    {
        path: '/login',
        element: <Login />
    }

])

export default router;