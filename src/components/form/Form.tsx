import { Form } from 'antd';
import type { ReactNode } from 'react';
import {
    type FieldValues,
    FormProvider,
    type SubmitHandler,
    useForm,
} from 'react-hook-form';

type TFormConfig = {
    defaultValues?: Record<string, any>;
    resolver?: any;
};

type TFormProps = {
    onSubmit: SubmitHandler<FieldValues>;
    children: ReactNode;
} & TFormConfig;

const CustomForm = ({
    onSubmit,
    children,
    defaultValues,
    resolver,
}: TFormProps) => {
    const formConfig: TFormConfig = {};

    if (defaultValues) {
        formConfig['defaultValues'] = defaultValues;
    }

    if (resolver) {
        formConfig['resolver'] = resolver;
    }

    const methods = useForm(formConfig);

    return (
        <FormProvider {...methods}>
            <Form layout="vertical" onFinish={methods.handleSubmit(onSubmit)}>
                {children}
            </Form>
        </FormProvider>
    );
};

export default CustomForm;