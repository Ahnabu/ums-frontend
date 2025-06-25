import { Form, Select } from 'antd';
import { Controller } from 'react-hook-form';

type TSelectProps = {
    label: string;
    name: string;
    placeholder?: string;
    options: { value: string; label: string; disabled?: boolean }[] | undefined;
    disabled?: boolean;
    mode?: 'multiple' | undefined;
};

const CustomSelect = ({ label, name, options, placeholder, mode }: TSelectProps) => {
    return (
        <Controller
            name={name}
            render={({ field, fieldState: { error } }) => (
                <Form.Item label={label}>
                    <Select
                        style={{ width: '100%' }}
                        {...field}
                        options={options}
                        size="large"
                        mode={mode}
                        placeholder={placeholder}
                    />
                    {error && <small style={{ color: 'red' }}>{error.message}</small>}
                </Form.Item>
            )}
        />
    );
};

export default CustomSelect;