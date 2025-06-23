import { Controller, type FieldValues, type SubmitHandler } from 'react-hook-form';
import { Button, Col, Divider, Form, Input, Row } from 'antd';
import {
    useGetAllAcademicDepartmentQuery
} from '../../../../redux/features/admin/academicManagement.api';
import { useAddFacultyMutation } from '../../../../redux/features/admin/userManagement.api';
import CustomForm from '../../../../components/form/Form';
import FormInput from '../../../../components/form/FormInput';
import CustomSelect from '../../../../components/form/Select';
import { bloodGroupOptions, genderOptions } from '../../../../constants/global';
import CustomDatePicker from '../../../../components/form/DatePicker';
import { toast } from 'sonner';

// Default values for development purposes
const facultyDefaultValues = {
    name: {
        firstName: 'Dr.',
        middleName: 'Robert',
        lastName: 'Wilson'
    },
    gender: 'male',
    bloodGroup: 'B+',
    contactNo: '9876543210',
    emergencyContactNo: '1234567890',
    presentAddress: '123 Faculty Housing, University Campus',
    permanentAddress: '456 Oak Avenue, Townsville',
    designation: 'Assistant Professor',
    academicDepartment: '68037add713a39327ed76d40',
};

const CreateFaculty = () => {
    const [addFaculty, { data, error }] = useAddFacultyMutation();

    if (data) {
        toast.success('Faculty created successfully!');
    }
    if (error) {
        toast.error('Failed to create faculty. Please try again.');
    }

    const { data: dData, isLoading: dIsLoading } =
        useGetAllAcademicDepartmentQuery(undefined);

    const departmentOptions = dData?.data?.map((item) => ({
        value: item._id,
        label: item.name,
    }));


    const designationOptions = [
        { value: 'Professor', label: 'Professor' },
        { value: 'Associate Professor', label: 'Associate Professor' },
        { value: 'Assistant Professor', label: 'Assistant Professor' },
        { value: 'Lecturer', label: 'Lecturer' },
        { value: 'Adjunct Faculty', label: 'Adjunct Faculty' },
        { value: 'Research Fellow', label: 'Research Fellow' },
    ];

    const onSubmit: SubmitHandler<FieldValues> = (data) => {
        const facultyData = {
            password: 'faculty123',
            faculty: data,
        };

        const formData = new FormData();

        formData.append('data', JSON.stringify(facultyData));

        if (data.image) {
            formData.append('file', data.image);
        }

        // For debugging

        console.log("Faculty data being sent:", JSON.stringify(facultyData, null, 2));

        addFaculty(formData);
    };

    return (
        <Row justify="center">
            <Col span={24}>
                <CustomForm onSubmit={onSubmit} defaultValues={facultyDefaultValues}>
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

                    <Divider>Academic Information</Divider>
                    <Row gutter={8}>
                        <Col span={24} md={{ span: 12 }} lg={{ span: 8 }}>
                            <CustomSelect
                                options={designationOptions}
                                name="designation"
                                label="Designation"
                            />
                        </Col>
                        <Col span={24} md={{ span: 12 }} lg={{ span: 8 }}>
                            <CustomSelect
                                options={departmentOptions}
                                disabled={dIsLoading}
                                name="academicDepartment"
                                label="Academic Department"
                            />
                        </Col>
                    </Row>

                    <Button type="primary" htmlType="submit" style={{ marginTop: '20px' }}>
                        Create Faculty
                    </Button>
                </CustomForm>
            </Col>
        </Row>
    );
};

export default CreateFaculty;