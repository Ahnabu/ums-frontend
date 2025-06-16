import { Button, Row } from 'antd';
import type { FieldValues } from 'react-hook-form';
import { useLoginMutation } from '../redux/features/auth/authApi';
import { useAppDispatch } from '../redux/hooks';
import { type TUser, setUser } from '../redux/features/auth/authSlice';
import { verifyToken } from '../utils/verifyToken';
import { useNavigate } from 'react-router-dom';
import { toast } from 'sonner';
import Form from '../components/form/Form';
import FormInput from '../components/form/FormInput';

const Login = () => {
    const navigate = useNavigate();
    const dispatch = useAppDispatch();
    // const { register, handleSubmit } = useForm({
    //   defaultValues: {
    //     userId: 'A-0002',
    //     password: 'admin123',
    //   },
    // });

    const defaultValues = {
        userId: 'A-0002',
        password: 'admin123',
    };

    const [login] = useLoginMutation();

    const onSubmit = async (data: FieldValues) => {
        console.log(data);
        const toastId = toast.loading('Logging in');

        try {
            const userInfo = {
                id: data.userId,
                password: data.password,
            };
            const res = await login(userInfo).unwrap();
            const user = verifyToken(res.data.accessToken) as TUser;
            dispatch(setUser({ user: user, token: res.data.accessToken }));
            toast.success('Logged in', { id: toastId, duration: 2000 });
            navigate(`/${user.role}/dashboard`);
        } catch (err) {
            toast.error('Something went wrong', { id: toastId, duration: 2000 });
        }
    };

    return (
        <Row justify="center" align="middle" style={{ height: '100vh' }}>
            <Form onSubmit={onSubmit} defaultValues={defaultValues}>
                <FormInput type="text" name="userId" label="ID:" />
                <FormInput type="text" name="password" label="Password" />
                <Button htmlType="submit">Login</Button>
            </Form>
        </Row>
    );
};

export default Login;