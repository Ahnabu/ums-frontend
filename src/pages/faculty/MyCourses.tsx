import { Button, Col, Flex } from 'antd';

import { useGetAllFacultyCoursesQuery } from '../../redux/features/faculty/facultyCourses.api';
import { useNavigate } from 'react-router-dom';
import type { FieldValues, SubmitHandler } from 'react-hook-form';
import CustomForm from '../../components/form/Form';
import CustomSelect from '../../components/form/Select';

const MyCourses = () => {
    const { data: facultyCoursesData } = useGetAllFacultyCoursesQuery(undefined);
    const navigate = useNavigate();

    console.log(facultyCoursesData);

    const semesterOptions = facultyCoursesData?.data?.map((item: any) => ({
        label: `${item.academicSemester.name} ${item.academicSemester.year}`,
        value: item.semesterRegistration._id,
    }));

    const courseOptions = facultyCoursesData?.data?.map((item: any) => ({
        label: item.course.title,
        value: item.course._id,
    }));

    const onSubmit: SubmitHandler<FieldValues> = (data) => {
        navigate(`/faculty/courses/${data.semesterRegistration}/${data.course}`);
    };

    return (
        <Flex justify="center" align="center">
            <Col span={6}>
                <CustomForm onSubmit={onSubmit}>
                    <CustomSelect
                        options={semesterOptions}
                        name="semesterRegistration"
                        label="Semester"
                    />
                    <CustomSelect options={courseOptions} name="course" label="Course" />
                    <Button htmlType="submit">Submit</Button>
                </CustomForm>
            </Col>
        </Flex>
    );
};

export default MyCourses;