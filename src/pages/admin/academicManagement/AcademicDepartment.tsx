import { useState } from "react";
import type { TQueryParam } from "../../../types/global";
import { useGetAllAcademicDepartmentQuery, useGetAllAcademicFacultyQuery } from "../../../redux/features/admin/academicManagement.api";
import { Button, Table, type TableColumnsType, type TableProps } from "antd";
import type { TAcademicDepartment } from "../../../types/academicManagement.type";

export type TTableData = Pick<
    TAcademicDepartment,
    'name' | 'academicFaculty' | 'createdAt'
>;
const AcademicDepartment = () => {

    const [params, setParams] = useState<TQueryParam[] | undefined>(undefined);
    const {
        data: departmentData,

        isFetching,
    } = useGetAllAcademicDepartmentQuery(params);

    const { data: semesterData } = useGetAllAcademicFacultyQuery(undefined);


    const tableData = departmentData?.data?.map(
        ({ _id, name, academicFaculty, createdAt }) => ({
            key: _id,
            name,
            academicFaculty,
            createdAt,

        })
    );

    const faculties = semesterData?.data?.map((item) => ({
        text: item.name,
        value: item._id,
    }));
    const columns: TableColumnsType<TTableData> = [
        {
            title: 'Name',
            key: 'name',
            dataIndex: 'name',

        },

        {
            title: 'Academic Faculty',
            key: 'academicFaculty',
            dataIndex: 'academicFaculty',
            filters: faculties,
            render: (academicFaculty) => academicFaculty?.name

        },
        {
            title: 'Created At',
            key: 'createdAt',
            dataIndex: 'createdAt',
        },
        {
            title: 'Action',
            key: 'x',
            render: () => {
                return (
                    <div>
                        <Button>Update</Button>
                    </div>
                );
            },
        },
    ];

    const onChange: TableProps<TTableData>['onChange'] = (
        _pagination,
        filters,
        _sorter,
        extra
    ) => {
        if (extra.action === 'filter') {
            const queryParams: TQueryParam[] = [];

            filters.academicFaculty?.forEach((item) =>
                queryParams.push({ name: 'academicFaculty', value: item })
            );



            setParams(queryParams);
        }
    };

    return (
        <Table
            loading={isFetching}
            columns={columns}
            dataSource={tableData}
            onChange={onChange}
        />
    );

}

export default AcademicDepartment