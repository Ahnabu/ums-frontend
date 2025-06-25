import { Button, Col, Flex } from 'antd';

import { useState } from 'react';
import type { FieldValues, SubmitHandler } from 'react-hook-form';
import CustomForm from '../../../components/form/Form';
import FormInput from '../../../components/form/FormInput';
import CustomSelectWithWatch from '../../../components/form/CustomSelectWithWatch';
import { useGetAllAcademicFacultyQuery } from '../../../redux/features/admin/academicManagement.api';

const OfferCourse = () => {
    const [id, setId] = useState('');

    console.log('Inside parent component', id);

    const { data: academicFacultyData } = useGetAllAcademicFacultyQuery(undefined);

    const academicSemesterOptions = academicFacultyData?.data?.map((item) => ({
        value: item._id,
        label: item.name,
    }));

    const onSubmit: SubmitHandler<FieldValues> = (data) => {
        console.log(data);
    };

    return (
        <Flex justify="center" align="center">
            <Col span={6}>
                <CustomForm onSubmit={onSubmit}>
                    <CustomSelectWithWatch
                        onValueChange={setId}
                        label="Academic Semester"
                        name="academicSemester"
                        options={academicSemesterOptions}
                    />
                    <FormInput disabled={!id} type="text" name="test" label="Test" />
                    <Button htmlType="submit">Submit</Button>
                </CustomForm>
            </Col>
        </Flex>
    );
};

export default OfferCourse;