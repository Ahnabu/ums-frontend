import { useGetAllSemestersQuery } from "../../../redux/features/admin/academicManagement.api"


const AcademicSemester = () => {

    const { data } = useGetAllSemestersQuery(undefined)
    return (
        <div>academicSemester</div>
    )
}

export default AcademicSemester