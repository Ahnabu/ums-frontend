import {
    Button,
    Pagination,
    Space,
    Table,
    type TableColumnsType,
    type TableProps,
} from 'antd';
import { useState } from 'react';

import { useGetAllAdminsQuery } from '../../../../redux/features/admin/userManagement.api';
import { Link } from 'react-router-dom';
import type { TAdmin } from '../../../../types/userManagement.types';
import type { TQueryParam } from '../../../../types/global';

export type TTableData = Pick<
    TAdmin,
    'fullName' | 'id' | 'email' | 'contactNo'
>;

const AdminData = () => {
    const [params, setParams] = useState<TQueryParam[]>([]);
    const [page, setPage] = useState(1);
    const {
        data: adminData,
        isFetching,
    } = useGetAllAdminsQuery([
        { name: 'page', value: page },
        { name: 'sort', value: 'id' },
        ...params,
    ]);


    const metaData = adminData?.meta;

    const tableData = adminData?.data?.map(
        ({ _id, fullName, id, email, contactNo }) => ({
            key: _id,
            fullName,
            id,
            email,
            contactNo,
        })
    );

    const columns: TableColumnsType<TTableData> = [
        {
            title: 'Name',
            key: 'name',
            dataIndex: 'fullName',
        },

        {
            title: 'ID No.',
            key: 'id',
            dataIndex: 'id',
        },
        {
            title: 'Email',
            key: 'email',
            dataIndex: 'email',
        },
        {
            title: 'Contact No.',
            key: 'contactNo',
            dataIndex: 'contactNo',
        },
        {
            title: 'Action',
            key: 'x',
            render: (item) => {
                return (
                    <Space>
                        <Link to={`/admin/admin-data/${item.key}`}>
                            <Button>Details</Button>
                        </Link>
                        <Button>Update</Button>
                        <Button>Block</Button>
                    </Space>
                );
            },
            width: '1%',
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

            filters.name?.forEach((item) =>
                queryParams.push({ name: 'name', value: item })
            );

            filters.year?.forEach((item) =>
                queryParams.push({ name: 'year', value: item })
            );

            setParams(queryParams);
        }
    };

    return (
        <>
            <Table
                loading={isFetching}
                columns={columns}
                dataSource={tableData}
                onChange={onChange}
                pagination={false}
            />
            <Pagination
                current={page}
                onChange={(value) => setPage(value)}
                pageSize={metaData?.limit}
                total={metaData?.total}
            />
        </>
    );
};

export default AdminData;