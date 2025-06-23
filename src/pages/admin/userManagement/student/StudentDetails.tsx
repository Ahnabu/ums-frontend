import { useParams } from 'react-router-dom';
import { Card, Col, Descriptions, Row, Spin, Tag, Typography, Avatar } from 'antd';
import { UserOutlined } from '@ant-design/icons';
import { useGetSingleStudentQuery } from '../../../../redux/features/admin/userManagement.api';

const { Title, Text } = Typography;

const StudentDetails = () => {
    const { studentId } = useParams();
    const { data: studentData, isLoading } = useGetSingleStudentQuery(studentId);
    const student = studentData?.data;

    if (isLoading) {
        return (
            <div className="flex justify-center items-center h-screen">
                <Spin size="large" tip="Loading student information..." />
            </div>
        );
    }

    if (!student) {
        return (
            <div className="p-8 text-center">
                <Title level={3} type="danger">Student not found</Title>
                <Text>The student information you're looking for could not be found.</Text>
            </div>
        );
    }

    return (
        <div className="p-6">
            <Card className="shadow-md">
                <Row gutter={[24, 24]}>
                    {/* Header with student basic info */}
                    <Col span={24}>
                        <div className="flex items-center gap-4 bg-blue-50 p-4 rounded-lg">
                            <div>
                                {student.profileImg ? (
                                    <Avatar
                                        size={100}
                                        src={student.profileImg}
                                        alt={student.name?.firstName}
                                    />
                                ) : (
                                    <Avatar size={100} icon={<UserOutlined />} />
                                )}
                            </div>
                            <div>
                                <Title level={2} style={{ margin: 0 }}>{`${student.name.firstName} ${student.name.middleName} ${student.name.lastName}`} </Title>
                                <div className="flex gap-3 items-center">
                                    <Tag color="blue">ID: {student.id}</Tag>
                                    <Tag color="green">{student.academicDepartment?.name}</Tag>
                                    <Tag color="purple">{student.admissionSemester?.name} {student.admissionSemester?.year}</Tag>
                                </div>
                                <Text type="secondary">Admitted on: {new Date(student.createdAt).toLocaleDateString()}</Text>
                            </div>
                        </div>
                    </Col>

                    {/* Personal Information */}
                    <Col xs={24} lg={12}>
                        <Card title="Personal Information" bordered={false} className="h-full">
                            <Descriptions column={1} bordered size="small">
                                <Descriptions.Item label="Full Name">{student.fullName}</Descriptions.Item>
                                <Descriptions.Item label="Name">
                                    First: {student.name.firstName} <br />
                                    Middle: {student.name.middleName || 'N/A'} <br />
                                    Last: {student.name.lastName}
                                </Descriptions.Item>
                                <Descriptions.Item label="Gender">{student.gender}</Descriptions.Item>
                                <Descriptions.Item label="Date of Birth">
                                    {new Date(student.dateOfBirth).toLocaleDateString()}
                                </Descriptions.Item>
                                <Descriptions.Item label="Blood Group">{student.bloodGroup || 'N/A'}</Descriptions.Item>
                            </Descriptions>
                        </Card>
                    </Col>

                    {/* Contact Information */}
                    <Col xs={24} lg={12}>
                        <Card title="Contact Information" bordered={false} className="h-full">
                            <Descriptions column={1} bordered size="small">
                                <Descriptions.Item label="Email">{student.email}</Descriptions.Item>
                                <Descriptions.Item label="Contact No">{student.contactNo}</Descriptions.Item>
                                <Descriptions.Item label="Emergency Contact">{student.emergencyContactNo}</Descriptions.Item>
                                <Descriptions.Item label="Present Address">{student.presentAddress}</Descriptions.Item>
                                <Descriptions.Item label="Permanent Address">{student.permanentAddress}</Descriptions.Item>
                            </Descriptions>
                        </Card>
                    </Col>

                    {/* Academic Information */}
                    <Col xs={24} lg={12}>
                        <Card title="Academic Information" bordered={false} className="h-full">
                            <Descriptions column={1} bordered size="small">
                                <Descriptions.Item label="Academic Department">
                                    {student.academicDepartment?.name}
                                </Descriptions.Item>
                                <Descriptions.Item label="Academic Faculty">
                                    {student.academicDepartment?.academicFaculty?.name}
                                </Descriptions.Item>
                                <Descriptions.Item label="Admission Semester">
                                    {student.admissionSemester?.name} {student.admissionSemester?.year}
                                </Descriptions.Item>
                                <Descriptions.Item label="Student ID">{student.id}</Descriptions.Item>
                            </Descriptions>
                        </Card>
                    </Col>

                    {/* Guardian Information */}
                    <Col xs={24} lg={12}>
                        <Card title="Guardian Information" bordered={false} className="h-full">
                            <Descriptions column={1} bordered size="small">
                                <Descriptions.Item label="Father's Name">{student.guardian?.fatherName}</Descriptions.Item>
                                <Descriptions.Item label="Father's Occupation">{student.guardian?.fatherOccupation}</Descriptions.Item>
                                <Descriptions.Item label="Father's Contact">{student.guardian?.fatherContactNo}</Descriptions.Item>
                                <Descriptions.Item label="Mother's Name">{student.guardian?.motherName}</Descriptions.Item>
                                <Descriptions.Item label="Mother's Occupation">{student.guardian?.motherOccupation}</Descriptions.Item>
                                <Descriptions.Item label="Mother's Contact">{student.guardian?.motherContactNo}</Descriptions.Item>
                            </Descriptions>
                        </Card>
                    </Col>

                    {/* Local Guardian Information */}
                    <Col span={24}>
                        <Card title="Local Guardian Information" bordered={false}>
                            <Descriptions column={{ xs: 1, md: 2 }} bordered size="small">
                                <Descriptions.Item label="Name">{student.localGuardian?.name}</Descriptions.Item>
                                <Descriptions.Item label="Occupation">{student.localGuardian?.occupation}</Descriptions.Item>
                                <Descriptions.Item label="Contact No">{student.localGuardian?.contactNo}</Descriptions.Item>
                                <Descriptions.Item label="Address">{student.localGuardian?.address}</Descriptions.Item>
                            </Descriptions>
                        </Card>
                    </Col>
                </Row>
            </Card>
        </div>

    );
};

export default StudentDetails;