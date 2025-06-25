import type { FieldValues, SubmitHandler } from 'react-hook-form';
import { Button, Col, Flex } from 'antd';
import { toast } from 'sonner';

import type { TResponse } from '../../../types/global';
import { useAddCourseMutation, useGetAllCoursesQuery } from '../../../redux/features/admin/courseManagement.api';
import CustomForm from '../../../components/form/Form';
import FormInput from '../../../components/form/FormInput';
import CustomSelect from '../../../components/form/Select';

const CreateCourse = () => {
    const [createCourse] = useAddCourseMutation();
    const { data: courses } = useGetAllCoursesQuery(undefined);

    const preRequisiteCoursesOptions = courses?.data?.map((item) => ({
        value: item._id,
        label: item.title,
    }));

    const onSubmit: SubmitHandler<FieldValues> = async (data) => {
        const toastId = toast.loading('Creating...');

        const courseData = {
            ...data,
            code: Number(data.code),
            credits: Number(data.credits),
            isDeleted: false,
            preRequisiteCourses: data.preRequisiteCourses
                ? data.preRequisiteCourses?.map((item: any) => ({
                    course: item,
                    isDeleted: false,
                }))
                : [],
        };

        console.log(courseData);

        try {
            const res = (await createCourse(courseData)) as TResponse<any>;
            console.log(res);
            if (res.error) {
                toast.error(res.error.data.message, { id: toastId });
            } else {
                toast.success('Semester created', { id: toastId });
            }
        } catch (err) {
            toast.error('Something went wrong', { id: toastId });
            console.error(err);
        }
    };

    return (
        <Flex justify="center" align="center">
            <Col span={6}>
                <CustomForm onSubmit={onSubmit}>
                    <FormInput type="text" name="title" label="Title" />
                    <FormInput type="text" name="prefix" label="Prefix" />
                    <FormInput type="text" name="code" label="Code" />
                    <FormInput type="text" name="credits" label="Credits" />
                    <CustomSelect
                        mode="multiple"
                        options={preRequisiteCoursesOptions}
                        name="preRequisiteCourses"
                        label="preRequisiteCourses"
                    />
                    <Button htmlType="submit">Submit</Button>
                </CustomForm>
            </Col>
        </Flex>
    );
};

export default CreateCourse;