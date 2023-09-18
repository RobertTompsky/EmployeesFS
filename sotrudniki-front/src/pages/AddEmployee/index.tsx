import {useState, useEffect} from 'react';
import Layout from '../../components/Layout';
import { Row } from 'antd';
import EmployeeForm from '../../components/EmployeeForm';
import { useNavigate } from 'react-router-dom';
import { useSelector } from 'react-redux';
import { selectUser } from '../../features/auth/authSlice';
import { useAddEmployeeMutation } from '../../app/services/employees';
import { Employee } from '@prisma/client';
import { Paths } from '../../paths';
import { isErrorWithMessage } from '../../utils/IsErrorWithMessage';



const AddEmployee = () => {
    const [error, setError] = useState('')
    const [AddEmployee] = useAddEmployeeMutation()
    const handleAddEmployee = async (data: Employee) => {
        try {
            await AddEmployee(data).unwrap()
            navigate(`${Paths.status}/created`)
        } catch (err) {
            const maybeError = isErrorWithMessage(err)
            if (maybeError) {
                setError(err.data.message)
            } else {
                setError('Неизвестная ошибка')
            }

        }
    }
    const navigate = useNavigate()
    const user = useSelector(selectUser)

    useEffect(() => {
        if (!user) {
            navigate('/login')
        }
    }, [navigate, user])
    return (
        <Layout>
            <Row align='middle' justify='center'>
                <EmployeeForm 
                title='Добавить сотрудника'
                btnText='Добавить'
                onFinish={handleAddEmployee}
                error={error}/>
            </Row>
        </Layout>
    );
};

export default AddEmployee;