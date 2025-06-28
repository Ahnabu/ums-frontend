import { Button, Row } from 'antd';

import type { FieldValues, SubmitHandler } from 'react-hook-form';
import { useChangePasswordMutation } from '../redux/features/admin/userManagement.api';
import { useAppDispatch } from '../redux/hooks';
import { logout } from '../redux/features/auth/authSlice';
import { useNavigate } from 'react-router-dom';
import type { TResponse } from '../types/global';
import CustomForm from '../components/form/Form';
import FormInput from '../components/form/FormInput';

const ChangePassword = () => {
    const [changePassword] = useChangePasswordMutation();
    const dispatch = useAppDispatch();
    const navigate = useNavigate();

    const onSubmit: SubmitHandler<FieldValues> = async (data) => {
        console.log(data);

        const res = (await changePassword(data)) as TResponse<any>;
        console.log(res?.data?.success);
        if (res?.data?.success) {
            dispatch(logout());
            navigate('/login');
        }
    };

    return (
        <Row justify="center" align="middle" style={{ height: '100vh' }}>
            <CustomForm onSubmit={onSubmit}>
                <FormInput type="text" name="oldPassword" label="Old Password" />
                <FormInput type="text" name="newPassword" label="New Password" />
                <Button htmlType="submit">Login</Button>
            </CustomForm>
        </Row>
    );
};

export default ChangePassword;