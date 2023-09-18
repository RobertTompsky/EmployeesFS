import CustomInput from "../../components/CustomInput";
import Layout from "../../components/Layout";
import { Card, Form, Row, Space, Typography } from "antd";
import PasswordInput from "../../components/PasswordInput";
import CustomButton from "../../components/CustomButton";
import { Link, useNavigate } from "react-router-dom";
import { Paths } from "../../paths";
import { useState } from "react";
import { useRegisterMutation } from "../../app/services/auth";
import {User} from '@prisma/client'
import { isErrorWithMessage } from "../../utils/IsErrorWithMessage";
import ErrorMessage from "../../components/ErrMessage";

type RegisterD = Omit<User, 'id'> & {confirmPassword: string}
const Register = () => {
    const navigate = useNavigate()
    const [error, setError] = useState('')
    const [registerUser] = useRegisterMutation()

    const register = async (data: RegisterD) => {
        try {
            await registerUser(data).unwrap()
            navigate('/')
        } catch (error) {
            const maybeError = isErrorWithMessage(error)
            if (maybeError) {
                setError(error.data.message)
            } else {
                setError("Неизвестная ошибка")
            }
        }
    }
    return (
        <Layout>
                <Row align='middle' justify="center">
                    <Card title='Регистрация' style={{width: "30rem"}}>
                        <Form onFinish={ register }>
                            <CustomInput type="text" name="name" placeholder="Имя"/>
                            <CustomInput type="email" name="email" placeholder="Email"/>
                            <PasswordInput name="password" placeholder="Пароль"/>
                            <PasswordInput name="confirmPassword" placeholder="Повторите пароль"/>
                            <CustomButton type="primary" htmlType="submit">Войти</CustomButton>
                        </Form>
                        <Space direction="vertical" size='large'>
                            <Typography.Text>
                                Уже есть аккаунт? <Link to={Paths.login}>Войти</Link>
                            </Typography.Text>
                            <ErrorMessage message={error}/>
                        </Space>
                    </Card>
                </Row>
            </Layout>
    );
};

export default Register;