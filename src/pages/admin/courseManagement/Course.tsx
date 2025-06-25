import { Button, Modal, Table } from 'antd';

import { useState } from 'react';
import { useAddFacultiesMutation, useGetAllCoursesQuery } from '../../../redux/features/admin/courseManagement.api';
import { useGetAllFacultiesQuery } from '../../../redux/features/admin/userManagement.api';
import CustomForm from '../../../components/form/Form';
import CustomSelect from '../../../components/form/Select';



const Courses = () => {
    // const [params, setParams] = useState<TQueryParam[] | undefined>(undefined);

    const { data: courses, isFetching } = useGetAllCoursesQuery(undefined);

    const tableData = courses?.data?.map(({ _id, title, prefix, code }) => ({
        key: _id,
        title,
        code: `${prefix}${code}`,
    }));

    const columns = [
        {
            title: 'Title',
            key: 'title',
            dataIndex: 'title',
        },
        {
            title: 'Code',
            key: 'code',
            dataIndex: 'code',
        },
        {
            title: 'Action',
            key: 'x',
            render: (item: any) => {
                return <AddFacultyModal facultyInfo={item} />;
            },
        },
    ];

    // const onChange: TableProps<TTableData>['onChange'] = (
    //   _pagination,
    //   filters,
    //   _sorter,
    //   extra
    // ) => {
    //   if (extra.action === 'filter') {
    //     const queryParams: TQueryParam[] = [];
    //     setParams(queryParams);
    //   }
    // };

    return (
        <Table
            loading={isFetching}
            columns={columns}
            dataSource={tableData}
        // onChange={onChange}
        />
    );
};

const AddFacultyModal = ({ facultyInfo }: any) => {
    const [isModalOpen, setIsModalOpen] = useState(false);
    const { data: facultiesData } = useGetAllFacultiesQuery(undefined);
    const [addFaculties] = useAddFacultiesMutation();

    const facultiesOption = facultiesData?.data?.map((item) => ({
        value: item._id,
        label: item.fullName,
    }));

    const handleSubmit = (data: any) => {
        const facultyData = {
            courseId: facultyInfo.key,
            data,
        };

        console.log(facultyData);

        addFaculties(facultyData);
    };

    const showModal = () => {
        setIsModalOpen(true);
    };

    const handleCancel = () => {
        setIsModalOpen(false);
    };

    return (
        <>
            <Button onClick={showModal}>Add Faculty</Button>
            <Modal
                title="Basic Modal"
                open={isModalOpen}
                onCancel={handleCancel}
                footer={null}
            >
                <CustomForm onSubmit={handleSubmit}>
                    <CustomSelect
                        mode="multiple"
                        options={facultiesOption}
                        name="faculties"
                        label="Faculty"
                    />
                    <Button htmlType="submit">Submit</Button>
                </CustomForm>
            </Modal>
        </>
    );
};

export default Courses;