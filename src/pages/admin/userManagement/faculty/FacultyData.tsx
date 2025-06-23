import {
  Button,
  Pagination,
  Space,
  Table,
  type TableColumnsType,
  type TableProps,
} from 'antd';
import { useState } from 'react';
import { Link } from 'react-router-dom';
import { useGetAllFacultiesQuery } from '../../../../redux/features/admin/userManagement.api';
import type { TFaculty } from '../../../../types/userManagement.types';
import type { TQueryParam } from '../../../../types/global';

export type TTableData = Pick<
  TFaculty,
  'fullName' | 'id' | 'email' | 'contactNo' | 'designation'
>;

const FacultyData = () => {
  const [params, setParams] = useState<TQueryParam[]>([]);
  const [page, setPage] = useState(1);
  const {
    data: facultyData,
    isFetching,
  } = useGetAllFacultiesQuery([
    { name: 'page', value: page },
    { name: 'sort', value: 'id' },
    ...params,
  ]);

  const metaData = facultyData?.meta;

  const tableData = facultyData?.data?.map(
    ({ _id, fullName, id, email, contactNo, designation }) => ({
      key: _id,
      fullName,
      id,
      email,
      contactNo,
      designation,
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
      title: 'Designation',
      key: 'designation',
      dataIndex: 'designation',
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
            <Link to={`/admin/faculty-data/${item.key}`}>
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

      filters.designation?.forEach((item) =>
        queryParams.push({ name: 'designation', value: item })
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

export default FacultyData;