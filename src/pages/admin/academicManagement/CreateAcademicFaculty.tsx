import { Button, Col, Flex } from "antd";
import FormInput from "../../../components/form/FormInput";
import { zodResolver } from "@hookform/resolvers/zod";
import CustomForm from "../../../components/form/Form";
import { academicFacultySchema } from "../../../schemas/academicManagement.schema";
import { toast } from "sonner";
import type { TResponse } from "../../../types/global";
import { useAddAcademicFacultyMutation } from "../../../redux/features/admin/academicManagement.api";
import type { FieldValues, SubmitHandler } from "react-hook-form";

const CreateAcademicFaculty = () => {
    const [addAcademicFaculty] = useAddAcademicFacultyMutation();
    const currentDate = new Date();
    const formattedDate = currentDate.toISOString();

    const onSubmit: SubmitHandler<FieldValues> = async (data) => {
        const toastId = toast.loading('Creating...');


        const facultyData = {
            name: data.name,
            createdAt: formattedDate,
            updatedAt: formattedDate,
        };

        try {
            const res = (await addAcademicFaculty(facultyData)) as TResponse<any>;
            console.log(res);
            if (res.error) {
                toast.error(res.error.data.message, { id: toastId });
            } else {
                toast.success('Faculty created', { id: toastId });
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
                    resolver={zodResolver(academicFacultySchema)}
                >
                    <FormInput type="text" name="name" label="Name of the Faculty" placeholder="Name of the Faculty" />

                    <Button htmlType="submit">Submit</Button>
                </CustomForm>
            </Col>
        </Flex>
    );
}

export default CreateAcademicFaculty