import { Button, Col, Flex } from 'antd';
import type { FieldValues, SubmitHandler } from 'react-hook-form';
import CustomSelectWithWatch from '../../../components/form/CustomSelectWithWatch';

import { useState } from 'react';

import moment from 'moment';


import CustomTimePicker from '../../../components/form/CustomTimePicker';
import { useCreateOfferedCourseMutation, useGetAllCoursesQuery, useGetAllRegisteredSemestersQuery, useGetCourseFacultiesQuery } from '../../../redux/features/admin/courseManagement.api';
import { useGetAllAcademicDepartmentQuery, useGetAllAcademicFacultyQuery } from '../../../redux/features/admin/academicManagement.api';
import CustomForm from '../../../components/form/Form';
import CustomSelect from '../../../components/form/Select';
import FormInput from '../../../components/form/FormInput';
import { daysOptions } from '../../../constants/global';

const OfferCourse = () => {
    const [courseId, setCourseId] = useState('');

    const [addOfferedCourse] = useCreateOfferedCourseMutation();

    const { data: semesterRegistrationData } = useGetAllRegisteredSemestersQuery([
        { name: 'sort', value: 'year' },
        { name: 'status', value: 'UPCOMING' },
    ]);

    const { data: academicFacultyData } = useGetAllAcademicFacultyQuery(undefined);

    const { data: academicDepartmentData } =
        useGetAllAcademicDepartmentQuery(undefined);

    const { data: coursesData } = useGetAllCoursesQuery(undefined);

    const { data: facultiesData, isFetching: fetchingFaculties } =
        useGetCourseFacultiesQuery(courseId, { skip: !courseId });

    const semesterRegistrationOptions = semesterRegistrationData?.data?.map(
        (item) => ({
            value: item._id,
            label: `${item.academicSemester.name} ${item.academicSemester.year}`,
        })
    );

    const academicFacultyOptions = academicFacultyData?.data?.map((item) => ({
        value: item._id,
        label: item.name,
    }));

    const academicDepartmentOptions = academicDepartmentData?.data?.map(
        (item) => ({
            value: item._id,
            label: item.name,
        })
    );

    const courseOptions = coursesData?.data?.map((item) => ({
        value: item._id,
        label: item.title,
    }));

    const facultiesOptions = facultiesData?.data?.faculties?.map((item: any) => ({
        value: item._id,
        label: item.fullName,
    }));

    const onSubmit: SubmitHandler<FieldValues> = async (data) => {
        const offeredCourseData = {
            ...data,
            maxCapacity: Number(data.maxCapacity),
            section: Number(data.section),
            startTime: moment(new Date(data.startTime)).format('HH:mm'),
            endTime: moment(new Date(data.endTime)).format('HH:mm'),
        };

        const res = await addOfferedCourse(offeredCourseData);
        console.log(res);
    };

    return (
        <Flex justify="center" align="center">
            <Col span={6}>
                <CustomForm onSubmit={onSubmit}>
                    <CustomSelect
                        name="semesterRegistration"
                        label="Semester Registrations"
                        options={semesterRegistrationOptions}
                    />
                    <CustomSelect
                        name="academicFaculty"
                        label="Academic Faculty"
                        options={academicFacultyOptions}
                    />
                    <CustomSelect
                        name="academicDepartment"
                        label="Academic Department"
                        options={academicDepartmentOptions}
                    />
                    <CustomSelectWithWatch
                        onValueChange={setCourseId}
                        options={courseOptions}
                        name="course"
                        label="Course"
                    />
                    <CustomSelect
                        disabled={!courseId || fetchingFaculties}
                        name="faculty"
                        label="Faculty"
                        options={facultiesOptions}
                    />
                    <FormInput type="text" name="section" label="Section" />
                    <FormInput type="text" name="maxCapacity" label="Max Capacity" />
                    <CustomSelect
                        mode="multiple"
                        options={daysOptions}
                        name="days"
                        label="Days"
                    />
                    <CustomTimePicker name="startTime" label="Start Time" />
                    <CustomTimePicker name="endTime" label="End Time" />

                    <Button htmlType="submit">Submit</Button>
                </CustomForm>
            </Col>
        </Flex>
    );
};

export default OfferCourse;