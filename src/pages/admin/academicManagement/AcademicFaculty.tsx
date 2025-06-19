import { useState } from "react";
import { useGetAllAcademicFacultyQuery } from "../../../redux/features/admin/academicManagement.api";
import type { TQueryParam } from "../../../types/global";
import { Button, Table, type TableColumnsType, type TableProps } from "antd";
import type { TAcademicFaculty } from "../../../types/academicManagement.type";

export type TTableData = Pick<
    TAcademicFaculty,
    'name' | 'updatedAt' | 'createdAt'
>;
const AcademicFaculty = () => {


    const [params, setParams] = useState<TQueryParam[] | undefined>(undefined);
    const {
        data: semesterData,
        isLoading,
        isFetching,
    } = useGetAllAcademicFacultyQuery(params);

    console.log({ isLoading, isFetching });

    const tableData = semesterData?.data?.map(
        ({ _id, name, createdAt, updatedAt }) => ({
            key: _id,
            name,
            createdAt,
            updatedAt,

        })
    );

    const columns: TableColumnsType<TTableData> = [


        {
            title: 'Name',
            key: 'name',
            dataIndex: 'name',
        },
        {
            title: 'Created At',
            key: 'createdAt',
            dataIndex: 'createdAt',
        },
        {
            title: 'Updated At',
            key: 'updatedAt',
            dataIndex: 'updatedAt',
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

            filters.createdAt?.forEach((item) =>
                queryParams.push({ name: 'createdAt', value: item })
            );

            filters.updatedAt?.forEach((item) =>
                queryParams.push({ name: 'updatedAt', value: item })
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
};



export default AcademicFaculty