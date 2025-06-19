import type { FieldValues, SubmitHandler } from "react-hook-form";
import { toast } from "sonner";
import { useAddAcademicDepartmentMutation, useGetAllAcademicFacultyQuery } from "../../../redux/features/admin/academicManagement.api";
import type { TResponse } from "../../../types/global";
import { Button, Col, Flex } from "antd";
import { academicDepartmentSchema } from "../../../schemas/academicManagement.schema";
import CustomForm from "../../../components/form/Form";
import { zodResolver } from "@hookform/resolvers/zod";
import CustomSelect from "../../../components/form/Select";
import FormInput from "../../../components/form/FormInput";

const CreateAcademicDepartment = () => {
    const [addAcademicDepartment] = useAddAcademicDepartmentMutation();


    const { data: facultyData } = useGetAllAcademicFacultyQuery(undefined);

    const faculties = facultyData?.data?.map((item) => ({
        label: item.name,
        value: item._id,
    }));
    const onSubmit: SubmitHandler<FieldValues> = async (data) => {
        const toastId = toast.loading('Creating...');
        const currentDate = new Date();
        const formattedDate = currentDate.toISOString();

        const departmentData = {
            name: data.name,
            academicFaculty: data.academicFaculty,
            createdAt: formattedDate,
            updatedAt: formattedDate,
        };

        try {
            const res = (await addAcademicDepartment(departmentData)) as TResponse<any>;
            console.log(res);
            if (res.error) {
                toast.error(res.error.data.message, { id: toastId });
            } else {
                toast.success('Department created', { id: toastId });
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
                    resolver={zodResolver(academicDepartmentSchema)}
                >
                    <FormInput type="text" name="name" label="Name of the Department" placeholder="Please put a department name" />
                    <CustomSelect label="Academic Faculty" name="academicFaculty" options={faculties!} placeholder="Please select Faculty" />


                    <Button htmlType="submit">Submit</Button>
                </CustomForm>
            </Col>
        </Flex>
    );
}

export default CreateAcademicDepartment