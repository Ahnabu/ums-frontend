import { Form, Select } from 'antd';
import { useEffect } from 'react';
import { Controller, useFormContext, useWatch } from 'react-hook-form';

type TCustomSelectProps = {
    label: string;
    name: string;
    options: { value: string; label: string; disabled?: boolean }[] | undefined;
    disabled?: boolean;
    mode?: 'multiple' | undefined;
    onValueChange: React.Dispatch<React.SetStateAction<string>>;
};

const CustomSelectWithWatch = ({
    label,
    name,
    options,
    disabled,
    mode,
    onValueChange,
}: TCustomSelectProps) => {
    const method = useFormContext();
    const inputValue = useWatch({
        control: method.control,
        name,
    });

    useEffect(() => {
        onValueChange(inputValue);
    }, [inputValue]);

    return (
        <Controller
            name={name}
            render={({ field, fieldState: { error } }) => (
                <Form.Item label={label}>
                    <Select
                        mode={mode}
                        style={{ width: '100%' }}
                        {...field}
                        options={options}
                        size="large"
                        disabled={disabled}
                    />
                    {error && <small style={{ color: 'red' }}>{error.message}</small>}
                </Form.Item>
            )}
        />
    );
};

export default CustomSelectWithWatch;