
import { Button } from 'antd';
import { useForm, type FieldValues } from 'react-hook-form';
import { useLoginMutation } from '../redux/features/auth/authApi';
import { useAppDispatch } from '../redux/hooks';
import { setUser, type TUser } from '../redux/features/auth/authSlice';
import { verifyToken } from '../utils/verifyToken';
import { useNavigate } from 'react-router-dom';
import { toast } from 'sonner';

const Login = () => {

    const navigate = useNavigate()
    const dispatch = useAppDispatch();
    const { register, handleSubmit } = useForm({
        defaultValues: {
            userId: 'A-0002',
            password: 'admin12345',
        },
    });

    const [login] = useLoginMutation();

    const onSubmit = async (data: FieldValues) => {
        const toastId = toast.loading('Logging in...');

        try {
            const userInfo = {
                id: data.userId,
                password: data.password,
            };

            const res = await login(userInfo).unwrap();
            const user = verifyToken(res.data.accessToken) as TUser;

            dispatch(setUser({ user: user, token: res.data.accessToken }));
            navigate(`/${user?.role}/dashboard`, { replace: true });
            toast.success('Login successful!', { id: toastId });
        } catch (err) {
            console.error('Login failed:', err);
            toast.error('Login failed. Please check your credentials.', { id: toastId });
        }

    };

    return (
        <form onSubmit={handleSubmit(onSubmit)}>
            <div>
                <label htmlFor="id">ID: </label>
                <input type="text" id="id" {...register('userId')} />
            </div>
            <div>
                <label htmlFor="password">Password: </label>
                <input type="text" id="password" {...register('password')} />
            </div>
            <Button htmlType="submit">Login</Button>
        </form>
    );
};

export default Login;