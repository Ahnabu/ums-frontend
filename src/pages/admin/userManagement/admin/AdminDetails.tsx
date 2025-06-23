import { useParams } from 'react-router-dom';
import { Card, Col, Descriptions, Row, Spin, Tag, Typography, Avatar } from 'antd';
import { UserOutlined } from '@ant-design/icons';
import { useGetSingleAdminQuery } from '../../../../redux/features/admin/userManagement.api';

const { Title, Text } = Typography;

const AdminDetails = () => {
    const { adminId } = useParams();
    const { data: adminData, isLoading } = useGetSingleAdminQuery(adminId);
    const admin = adminData?.data;

    if (isLoading) {
        return (
            <div className="flex justify-center items-center h-screen">
                <Spin size="large" tip="Loading admin information..." />
            </div>
        );
    }

    if (!admin) {
        return (
            <div className="p-8 text-center">
                <Title level={3} type="danger">Admin not found</Title>
                <Text>The admin information you're looking for could not be found.</Text>
            </div>
        );
    }
    console.log("Admin Details:", admin);
    return (
        <div className="p-6">
            <Card className="shadow-md">
                <Row gutter={[24, 24]}>
                    {/* Header with admin basic info */}
                    <Col span={24}>
                        <div className="flex items-center gap-4 bg-red-50 p-4 rounded-lg">
                            <div>
                                {admin.profileImg ? (
                                    <Avatar
                                        size={100}
                                        src={admin.profileImg}
                                        alt={admin.name?.firstName}
                                    />
                                ) : (
                                    <Avatar size={100} icon={<UserOutlined />} />
                                )}
                            </div>
                            <div>
                                <Title level={2} style={{ margin: 0 }}>{`${admin.name.firstName} ${admin.name.middleName} ${admin.name.lastName}`} </Title>
                                <div className="flex gap-3 items-center">
                                    <Tag color="red">ID: {admin.id}</Tag>
                                    <Tag color="volcano">{admin.designation}</Tag>
                                    <Tag color="orange">Admin</Tag>
                                </div>
                                <Text type="secondary">Joined on: {new Date(admin.user?.createdAt || "").toLocaleDateString()}</Text>
                            </div>
                        </div>
                    </Col>

                    {/* Personal Information */}
                    <Col xs={24} lg={12}>
                        <Card title="Personal Information" bordered={false} className="h-full">
                            <Descriptions column={1} bordered size="small">
                                <Descriptions.Item label="Full Name">{admin.fullName}</Descriptions.Item>
                                <Descriptions.Item label="Name">
                                    First: {admin.name.firstName} <br />
                                    Middle: {admin.name.middleName || 'N/A'} <br />
                                    Last: {admin.name.lastName}
                                </Descriptions.Item>
                                <Descriptions.Item label="Gender">{admin.gender}</Descriptions.Item>
                                <Descriptions.Item label="Date of Birth">
                                    {new Date(admin.dateOfBirth).toLocaleDateString()}
                                </Descriptions.Item>
                                <Descriptions.Item label="Blood Group">{admin.bloodGroup || 'N/A'}</Descriptions.Item>
                            </Descriptions>
                        </Card>
                    </Col>

                    {/* Contact Information */}
                    <Col xs={24} lg={12}>
                        <Card title="Contact Information" bordered={false} className="h-full">
                            <Descriptions column={1} bordered size="small">
                                <Descriptions.Item label="Email">{admin.email}</Descriptions.Item>
                                <Descriptions.Item label="Contact No">{admin.contactNo}</Descriptions.Item>
                                <Descriptions.Item label="Emergency Contact">{admin.emergencyContactNo}</Descriptions.Item>
                                <Descriptions.Item label="Present Address">{admin.presentAddress}</Descriptions.Item>
                                <Descriptions.Item label="Permanent Address">{admin.permanentAddress}</Descriptions.Item>
                            </Descriptions>
                        </Card>
                    </Col>

                    {/* Professional Information */}
                    <Col xs={24} lg={12}>
                        <Card title="Professional Information" bordered={false} className="h-full">
                            <Descriptions column={1} bordered size="small">
                                <Descriptions.Item label="Designation">{admin.designation}</Descriptions.Item>
                                <Descriptions.Item label="Admin ID">{admin.id}</Descriptions.Item>
                                <Descriptions.Item label="Status">{admin.user?.status}</Descriptions.Item>
                                <Descriptions.Item label="Role">{admin.user?.role}</Descriptions.Item>
                            </Descriptions>
                        </Card>
                    </Col>

                    {/* Account Information */}
                    <Col xs={24} lg={12}>
                        <Card title="Account Information" bordered={false} className="h-full">
                            <Descriptions column={1} bordered size="small">
                                <Descriptions.Item label="User ID">{admin.id}</Descriptions.Item>
                                <Descriptions.Item label="Email">{admin.email}</Descriptions.Item>

                                <Descriptions.Item label="Password Change Required">
                                    {admin.user?.needsPasswordChange ? "Yes" : "No"}
                                </Descriptions.Item>
                            </Descriptions>
                        </Card>
                    </Col>
                </Row>
            </Card>
        </div>
    );
};

export default AdminDetails;