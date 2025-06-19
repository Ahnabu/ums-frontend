import type { FieldValues, SubmitHandler } from 'react-hook-form';

import { Button, Col, Flex } from 'antd';


import { zodResolver } from '@hookform/resolvers/zod';

import { toast } from 'sonner';
import CustomForm from '../../../components/form/Form';
import CustomSelect from '../../../components/form/Select';
import { semesterOptions } from '../../../constants/semester';
import { monthOptions } from '../../../constants/global';
import { academicSemesterSchema } from '../../../schemas/academicManagement.schema';
import type { TResponse } from '../../../types/global';
import { useAddAcademicSemesterMutation } from '../../../redux/features/admin/academicManagement.api';


const currentYear = new Date().getFullYear();
const yearOptions = [0, 1, 2, 3, 4].map((number) => ({
    value: String(currentYear + number),
    label: String(currentYear + number),
}));

const CreateAcademicSemester = () => {
    const [addAcademicSemester] = useAddAcademicSemesterMutation();

    const onSubmit: SubmitHandler<FieldValues> = async (data) => {
        const toastId = toast.loading('Creating...');

        const name = semesterOptions[Number(data?.name) - 1]?.label;

        const semesterData = {
            name,
            code: data.name,
            year: data.year,
            startMonth: data.startMonth,
            endMonth: data.endMonth,
        };

        try {
            const res = (await addAcademicSemester(semesterData)) as TResponse<any>;
            console.log(res);
            if (res.error) {
                toast.error(res.error.data.message, { id: toastId });
            } else {
                toast.success('Semester created', { id: toastId });
            }
        } catch (err) {
            toast.error('Something went wrong', { id: toastId });
            console.log(err)
        }
    };

    return (
        <Flex justify="center" align="center">
            <Col span={6}>
                <CustomForm
                    onSubmit={onSubmit}
                    resolver={zodResolver(academicSemesterSchema)}
                >
                    <CustomSelect label="Name" name="name" placeholder='Please select a semester' options={semesterOptions} />
                    <CustomSelect label="Year" name="year" placeholder='Please select a year' options={yearOptions} />
                    <CustomSelect
                        label="Start Month"
                        name="startMonth"
                        options={monthOptions}
                        placeholder='Please select a start month'
                    />
                    <CustomSelect label="End Month" name="endMonth" options={monthOptions}
                        placeholder='Please select a end month'
                    />

                    <Button htmlType="submit">Submit</Button>
                </CustomForm>
            </Col>
        </Flex>
    );
};

export default CreateAcademicSemester;