import { Form, Input } from 'antd';
import { Controller } from 'react-hook-form';

type TInputProps = {
    type: string;
    name: string;
    label?: string;
    placeholder?: string;
};
const FormInput = ({ type, name, label, placeholder }: TInputProps) => {
    return (
        <div style={{ marginBottom: '20px' }}>
            <Controller
                name={name}
                render={({ field }) => (
                    <Form.Item label={label}>
                        <Input {...field} type={type} id={name} size="large" placeholder={placeholder} />
                    </Form.Item>
                )}
            />
        </div>
    );
};


export default FormInput