import { Controller, type FieldValues, type SubmitHandler } from 'react-hook-form';
import { Button, Col, Divider, Form, Input, Row } from 'antd';
import { useAddAdminMutation } from '../../../../redux/features/admin/userManagement.api';
import CustomForm from '../../../../components/form/Form';
import FormInput from '../../../../components/form/FormInput';
import CustomSelect from '../../../../components/form/Select';
import { bloodGroupOptions, genderOptions } from '../../../../constants/global';
import CustomDatePicker from '../../../../components/form/DatePicker';
import { toast } from 'sonner';

// Default values for development purposes
const adminDefaultValues = {
    name: {
        firstName: 'John',
        middleName: 'William',
        lastName: 'Smith'
    },
    gender: 'male',
    bloodGroup: 'A+',
    contactNo: '1234567890',
    emergencyContactNo: '9876543210',
    presentAddress: '123 Admin Avenue, Cityville',
    permanentAddress: '456 Manager Street, Townsville',
    designation: 'System Administrator',
    email: 'admin@example.com',
};

const CreateAdmin = () => {
    const [addAdmin, { data, error }] = useAddAdminMutation();

    if (data) {
        toast.success('Admin created successfully!');
    }
    if (error) {
        toast.error('Failed to create admin. Please try again.');
    }

    const onSubmit: SubmitHandler<FieldValues> = (data) => {
        const adminData = {
            password: 'admin123',
            admin: data,
        };

        const formData = new FormData();
        formData.append('data', JSON.stringify(adminData));

        if (data.image) {
            formData.append('file', data.image);
        }

        // For debugging
        // console.log("Admin data being sent:", JSON.stringify(adminData, null, 2));

        addAdmin(formData);
    };

    return (
        <Row justify="center">
            <Col span={24}>
                <CustomForm onSubmit={onSubmit} defaultValues={adminDefaultValues}>
                    <Divider>Personal Information</Divider>
                    <Row gutter={8}>
                        <Col span={24} md={{ span: 12 }} lg={{ span: 8 }}>
                            <FormInput type="text" name="name.firstName" label="First Name" />
                        </Col>
                        <Col span={24} md={{ span: 12 }} lg={{ span: 8 }}>
                            <FormInput type="text" name="name.middleName" label="Middle Name" />
                        </Col>
                        <Col span={24} md={{ span: 12 }} lg={{ span: 8 }}>
                            <FormInput type="text" name="name.lastName" label="Last Name" />
                        </Col>
                        <Col span={24} md={{ span: 12 }} lg={{ span: 8 }}>
                            <CustomSelect options={genderOptions} name="gender" label="Gender" />
                        </Col>
                        <Col span={24} md={{ span: 12 }} lg={{ span: 8 }}>
                            <CustomDatePicker name="dateOfBirth" label="Date of birth" />
                        </Col>
                        <Col span={24} md={{ span: 12 }} lg={{ span: 8 }}>
                            <CustomSelect
                                options={bloodGroupOptions}
                                name="bloodGroup"
                                label="Blood group"
                            />
                        </Col>
                        <Col span={24} md={{ span: 12 }} lg={{ span: 8 }}>
                            <FormInput
                                type="text"
                                name="designation"
                                label="Designation"
                            />
                        </Col>
                        <Col span={24} md={{ span: 12 }} lg={{ span: 8 }}>
                            <Controller
                                name="image"
                                render={({ field: { onChange, value, ...field } }) => (
                                    <Form.Item label="Profile Picture">
                                        <Input
                                            type="file"
                                            value={value?.fileName}
                                            {...field}
                                            onChange={(e) => onChange(e.target.files?.[0])}
                                        />
                                    </Form.Item>
                                )}
                            />
                        </Col>
                    </Row>

                    <Divider>Contact Information</Divider>
                    <Row gutter={8}>
                        <Col span={24} md={{ span: 12 }} lg={{ span: 8 }}>
                            <FormInput type="text" name="email" label="Email" />
                        </Col>
                        <Col span={24} md={{ span: 12 }} lg={{ span: 8 }}>
                            <FormInput type="text" name="contactNo" label="Contact" />
                        </Col>
                        <Col span={24} md={{ span: 12 }} lg={{ span: 8 }}>
                            <FormInput
                                type="text"
                                name="emergencyContactNo"
                                label="Emergency Contact"
                            />
                        </Col>
                        <Col span={24} md={{ span: 12 }} lg={{ span: 8 }}>
                            <FormInput
                                type="text"
                                name="presentAddress"
                                label="Present Address"
                            />
                        </Col>
                        <Col span={24} md={{ span: 12 }} lg={{ span: 8 }}>
                            <FormInput
                                type="text"
                                name="permanentAddress"
                                label="Permanent Address"
                            />
                        </Col>
                    </Row>

                    <Button type="primary" htmlType="submit" style={{ marginTop: '20px' }}>
                        Create Admin
                    </Button>
                </CustomForm>
            </Col>
        </Row>
    );
};

export default CreateAdmin;