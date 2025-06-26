import { Button, Col, Divider, Row } from 'antd';
import { useState } from 'react';
import type { FieldValues, SubmitHandler } from 'react-hook-form';
import CustomForm from '../../../components/form/Form';
import FormInput from '../../../components/form/FormInput';
import CustomSelectWithWatch from '../../../components/form/CustomSelectWithWatch';
import { toast } from 'sonner';
import {
    useGetAllRegisteredSemestersQuery,
    useAddOfferedCourseMutation
} from '../../../redux/features/admin/courseManagement.api';
import {
    useGetAllAcademicFacultyQuery,
    useGetAllAcademicDepartmentQuery
} from '../../../redux/features/admin/academicManagement.api';
import { useGetAllCoursesQuery } from '../../../redux/features/admin/courseManagement.api';
import { useGetAllFacultiesQuery } from '../../../redux/features/admin/userManagement.api';
import { daysOptions } from '../../../constants/global';
import CustomSelect from '../../../components/form/Select';

const OfferCourse = () => {
    // State for controlling the form flow
    const [semesterRegistrationId, setSemesterRegistrationId] = useState<string>('');
    const [academicFacultyId, setAcademicFacultyId] = useState<string>('');
    const [academicDepartmentId, setAcademicDepartmentId] = useState<string>('');
    const [courseId, setCourseId] = useState<string>('');

    // Add this mutation
    const [addOfferedCourse, { isLoading: isSubmitting }] = useAddOfferedCourseMutation();

    // Get all registered semesters
    const { data: semesterData, isLoading: isSemesterLoading } = useGetAllRegisteredSemestersQuery(undefined);

    // Get all academic faculties
    const { data: academicFacultyData, isLoading: isFacultyLoading } = useGetAllAcademicFacultyQuery(undefined);

    // Get all academic departments based on selected faculty
    const { data: academicDepartmentData, isLoading: isDepartmentLoading } = useGetAllAcademicDepartmentQuery(
        academicFacultyId ? [{ name: 'academicFaculty', value: academicFacultyId }] : undefined,
        { skip: !academicFacultyId }
    );

    // Get all courses
    const { data: coursesData, isLoading: isCoursesLoading } = useGetAllCoursesQuery(undefined,
        // {
        // skip: !academicDepartmentId
        // }
    );

    // Get all faculties based on selected department
    const { data: facultiesData, isLoading: isFacultiesLoading } = useGetAllFacultiesQuery(
        academicDepartmentId ? [{ name: 'academicDepartment', value: academicDepartmentId }] : undefined,
        { skip: !academicDepartmentId }
    );

    // Convert data to options for select fields
    const semesterOptions = semesterData?.data?.map((item) => ({
        value: item._id,
        label: `${item.academicSemester.name} ${item.academicSemester.year} (${item.status})`,
    })) || [];

    const academicFacultyOptions = academicFacultyData?.data?.map((item) => ({
        value: item._id,
        label: item.name,
    })) || [];

    const academicDepartmentOptions = academicDepartmentData?.data?.map((item) => ({
        value: item._id,
        label: item.name,
    })) || [];

    const courseOptions = coursesData?.data?.map((item) => ({
        value: item._id,
        label: `${item.title} (${item.prefix}${item.code})`,
    })) || [];

    const facultyOptions = facultiesData?.data?.map((item) => ({
        value: item._id,
        label: `${item.name.firstName} ${item.name.lastName} (${item.designation})`,
    })) || [];

    const onSubmit: SubmitHandler<FieldValues> = async (data) => {
        try {
            // Get the selected semester registration data to include required fields
            const selectedSemester = semesterData?.data?.find(
                semester => semester._id === data.semesterRegistration
            );

            if (!selectedSemester) {
                toast.error("Selected semester not found");
                return;
            }

            // Format the data for API submission according to backend requirements
            const offeredCourseData = {
                academicSemester: selectedSemester.academicSemester._id,

                // Include the form data
                semesterRegistration: data.semesterRegistration,
                academicFaculty: data.academicFaculty,
                academicDepartment: data.academicDepartment,
                course: data.course,
                faculty: data.faculty,

                // Convert section to string - backend expects string not number
                section: String(data.section),

                maxCapacity: Number(data.maxCapacity),
                days: data.days,

                // Format time values in "HH:MM" format
                startTime: data.startTime || "09:00",
                endTime: data.endTime || "10:30"
            };

            console.log("Offered Course Data:", offeredCourseData);

            // Call the API to create the offered course
            await addOfferedCourse(offeredCourseData).unwrap();
            toast.success("Offered course created successfully!");

        } catch (error: any) {
            console.error("Error creating offered course:", error);

            // Display more specific error message if available
            if (error.data?.message) {
                toast.error(`Error: ${error.data.message}`);
            } else {
                toast.error("Failed to create offered course. Please try again.");
            }
        }
    };

    // Default values for the form
    const defaultValues = {
        semesterRegistration: '',
        academicFaculty: '',
        academicDepartment: '',
        course: '',
        faculty: '',
        section: 1,
        maxCapacity: 30,
        days: [],
        startTime: '',
        endTime: ''
    };

    return (
        <div className="p-5">
            <h1 className="text-2xl font-bold mb-6">Create Offered Course</h1>

            <div className="bg-white p-6 rounded-lg shadow">
                <CustomForm onSubmit={onSubmit} defaultValues={defaultValues}>
                    <Divider orientation="left">Basic Information</Divider>

                    <Row gutter={[16, 16]}>
                        {/* Semester Registration Selection */}
                        <Col xs={24} md={12} lg={8}>
                            <CustomSelectWithWatch
                                onValueChange={setSemesterRegistrationId}
                                label="Semester Registration"
                                name="semesterRegistration"
                                options={semesterOptions}
                                disabled={isSemesterLoading}
                            />
                        </Col>

                        {/* Academic Faculty Selection */}
                        <Col xs={24} md={12} lg={8}>
                            <CustomSelectWithWatch
                                onValueChange={setAcademicFacultyId}
                                label="Academic Faculty"
                                name="academicFaculty"
                                options={academicFacultyOptions}
                                disabled={isFacultyLoading || !semesterRegistrationId}
                            />
                        </Col>

                        {/* Academic Department Selection */}
                        <Col xs={24} md={12} lg={8}>
                            <CustomSelectWithWatch
                                onValueChange={setAcademicDepartmentId}
                                label="Academic Department"
                                name="academicDepartment"
                                options={academicDepartmentOptions}
                                disabled={isDepartmentLoading || !academicFacultyId}
                            />
                        </Col>
                    </Row>

                    <Divider orientation="left">Course & Faculty</Divider>

                    <Row gutter={[16, 16]}>
                        {/* Course Selection */}
                        <Col xs={24} md={12} lg={8}>
                            <CustomSelectWithWatch
                                onValueChange={setCourseId}
                                label="Course"
                                name="course"
                                options={courseOptions}
                                disabled={isCoursesLoading || !academicDepartmentId}
                            />
                        </Col>

                        {/* Faculty Selection - Multiple */}
                        <Col xs={24} md={12} lg={8}>
                            <CustomSelect
                                label="Faculty"
                                name="faculty"

                                options={facultyOptions}
                                disabled={isFacultiesLoading || !academicDepartmentId || !courseId}
                            />
                        </Col>

                        {/* Section */}
                        <Col xs={24} md={12} lg={8}>
                            <FormInput
                                type="number"
                                name="section"
                                label="Section"
                            // disabled={!courseId}
                            />
                        </Col>

                        {/* Max Capacity */}
                        <Col xs={24} md={12} lg={8}>
                            <FormInput
                                type="number"
                                name="maxCapacity"
                                label="Max Capacity"
                            // disabled={!courseId}
                            />
                        </Col>
                    </Row>

                    <Divider orientation="left">Schedule</Divider>

                    <Row gutter={[16, 16]}>
                        {/* Days Selection */}
                        <Col xs={24} md={12} lg={8}>
                            <CustomSelect
                                label="Days"
                                name="days"
                                options={daysOptions}
                                disabled={!courseId}
                                mode="multiple"
                            />
                        </Col>

                        {/* Start Time */}
                        <Col xs={24} md={12} lg={8}>
                            <FormInput
                                type="time"
                                name="startTime"
                                label="Start Time"
                                disabled={!courseId}
                            />
                        </Col>

                        {/* End Time */}
                        <Col xs={24} md={12} lg={8}>
                            <FormInput
                                type="time"
                                name="endTime"
                                label="End Time"
                                disabled={!courseId}
                            />
                        </Col>
                    </Row>

                    <Button
                        type="primary"
                        htmlType="submit"
                        loading={isSubmitting}
                        disabled={!courseId || isSubmitting}
                        style={{ marginTop: '20px' }}
                    >
                        {isSubmitting ? 'Creating...' : 'Create Offered Course'}
                    </Button>
                </CustomForm>
            </div>
        </div>
    );
};

export default OfferCourse;