import type { FieldValues, SubmitHandler } from "react-hook-form";
import Form from "../../../components/form/Form"
import FormInput from "../../../components/form/FormInput"
import { Button } from "antd";

const CreateAcademicSemester = () => {
    const handleSubmit: SubmitHandler<FieldValues> = (data) => {
        console.log(data);
    }
    return (
        <Form onSubmit={handleSubmit} >

            <FormInput type="text" name="title" label="Title" />
            <Button type="primary" htmlType="submit" className="mt-4">
                Create Academic Semester
            </Button>
        </Form>
    )
}

export default CreateAcademicSemester