import { useParams } from 'react-router-dom';
import { Card, Col, Descriptions, Row, Spin, Tag, Typography, Avatar } from 'antd';
import { UserOutlined } from '@ant-design/icons';
import { useGetSingleFacultyQuery } from '../../../../redux/features/admin/userManagement.api';

const { Title, Text } = Typography;

const FacultyDetails = () => {
    const { facultyId } = useParams();
    const { data: facultyData, isLoading } = useGetSingleFacultyQuery(facultyId);
    const faculty = facultyData?.data;

    if (isLoading) {
        return (
            <div className="flex justify-center items-center h-screen">
                <Spin size="large" tip="Loading faculty information..." />
            </div>
        );
    }

    if (!faculty) {
        return (
            <div className="p-8 text-center">
                <Title level={3} type="danger">Faculty not found</Title>
                <Text>The faculty information you're looking for could not be found.</Text>
            </div>
        );
    }


    return (
        <div className="p-6">
            <Card className="shadow-md">
                <Row gutter={[24, 24]}>
                    {/* Header with faculty basic info */}
                    <Col span={24}>
                        <div className="flex items-center gap-4 bg-green-50 p-4 rounded-lg">
                            <div>
                                {faculty.profileImg ? (
                                    <Avatar
                                        size={100}
                                        src={faculty.profileImg}
                                        alt={faculty.name?.firstName}
                                    />
                                ) : (
                                    <Avatar size={100} icon={<UserOutlined />} />
                                )}
                            </div>
                            <div>
                                <Title level={2} style={{ margin: 0 }}>{`${faculty.name.firstName} ${faculty.name.middleName} ${faculty.name.lastName}`}</Title>
                                <div className="flex gap-3 items-center">
                                    <Tag color="green">ID: {faculty.id}</Tag>
                                    <Tag color="gold">{faculty.designation}</Tag>
                                    <Tag color="cyan">{faculty.academicDepartment?.name}</Tag>
                                </div>
                                <Text type="secondary">Faculty Member</Text>
                            </div>
                        </div>
                    </Col>

                    {/* Personal Information */}
                    <Col xs={24} lg={12}>
                        <Card title="Personal Information" bordered={false} className="h-full">
                            <Descriptions column={1} bordered size="small">
                                <Descriptions.Item label="Full Name">{faculty.fullName}</Descriptions.Item>
                                <Descriptions.Item label="Name">
                                    First: {faculty.name.firstName} <br />
                                    Middle: {faculty.name.middleName || 'N/A'} <br />
                                    Last: {faculty.name.lastName}
                                </Descriptions.Item>
                                <Descriptions.Item label="Gender">{faculty.gender}</Descriptions.Item>
                                <Descriptions.Item label="Date of Birth">
                                    {new Date(faculty.dateOfBirth).toLocaleDateString()}
                                </Descriptions.Item>
                                <Descriptions.Item label="Blood Group">{faculty.bloodGroup || 'N/A'}</Descriptions.Item>
                            </Descriptions>
                        </Card>
                    </Col>

                    {/* Contact Information */}
                    <Col xs={24} lg={12}>
                        <Card title="Contact Information" bordered={false} className="h-full">
                            <Descriptions column={1} bordered size="small">
                                <Descriptions.Item label="Email">{faculty.email}</Descriptions.Item>
                                <Descriptions.Item label="Contact No">{faculty.contactNo}</Descriptions.Item>
                                <Descriptions.Item label="Emergency Contact">{faculty.emergencyContactNo}</Descriptions.Item>
                                <Descriptions.Item label="Present Address">{faculty.presentAddress}</Descriptions.Item>
                                <Descriptions.Item label="Permanent Address">{faculty.permanentAddress}</Descriptions.Item>
                            </Descriptions>
                        </Card>
                    </Col>

                    {/* Academic Information */}
                    <Col xs={24} lg={12}>
                        <Card title="Academic Information" bordered={false} className="h-full">
                            <Descriptions column={1} bordered size="small">
                                <Descriptions.Item label="Faculty ID">{faculty.id}</Descriptions.Item>
                                <Descriptions.Item label="Designation">{faculty.designation}</Descriptions.Item>
                                <Descriptions.Item label="Academic Department">
                                    {faculty.academicDepartment?.name}
                                </Descriptions.Item>
                                <Descriptions.Item label="Academic Faculty">
                                    {faculty.academicDepartment?.academicFaculty?.name}
                                </Descriptions.Item>
                            </Descriptions>
                        </Card>
                    </Col>

                    {/* Account Information */}
                    <Col xs={24} lg={12}>
                        <Card title="Account Information" bordered={false} className="h-full">
                            <Descriptions column={1} bordered size="small">
                                <Descriptions.Item label="User ID">
                                    {typeof faculty.user === 'string' ? faculty.user : faculty.id}
                                </Descriptions.Item>

                                <Descriptions.Item label="Role">
                                    Faculty
                                </Descriptions.Item>
                                <Descriptions.Item label="Created At">
                                    {typeof faculty.user === 'string' ? 'N/A' :
                                        faculty.user?.createdAt ? new Date(faculty.user.createdAt).toLocaleString() : 'N/A'}
                                </Descriptions.Item>
                                <Descriptions.Item label="Last Updated">
                                    {typeof faculty.user === 'string' ? 'N/A' :
                                        faculty.user?.updatedAt ? new Date(faculty.user.updatedAt).toLocaleString() : 'N/A'}
                                </Descriptions.Item>
                            </Descriptions>
                        </Card>
                    </Col>
                </Row>
            </Card>
        </div>
    );
};

export default FacultyDetails;