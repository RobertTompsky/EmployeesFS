import { LoginOutlined, TeamOutlined, UserOutlined } from '@ant-design/icons';
import styles from './index.module.css'
import { Layout, Space, Typography } from 'antd'
import CustomButton from '../CustomButton';
import { Link, useNavigate } from 'react-router-dom';
import { Paths } from '../../paths';
import { useDispatch, useSelector } from 'react-redux';
import { logout, selectUser } from '../../features/auth/authSlice';
const Header = () => {
    const user = useSelector(selectUser)
    const navigate = useNavigate()
    const dispatch = useDispatch()

    const onLogoutClick = () => {
        dispatch(logout())
        localStorage.removeItem('token')
        navigate('/login')
    }
    return (
        <Layout.Header className={styles.header}>
            <Space align='center'>
                <TeamOutlined className={styles.teamIcon} />
                <Link to={Paths.home}>
                    <CustomButton type='link'>
                        <Typography.Title level={1}>
                            Сотрудники
                        </Typography.Title>
                    </CustomButton>
                </Link>
            </Space>
            {
                user ? (
                    <CustomButton type='link' icon={<LoginOutlined />} onClick={onLogoutClick}>Выйти</CustomButton>
                ) :
                    <Space align='baseline'>
                        <Link to={Paths.register} >
                            <CustomButton type='text' icon={<UserOutlined />}>Зарегистрироваться</CustomButton>
                        </Link>
                        <Link to={Paths.login}>
                            <CustomButton type='text' icon={<LoginOutlined />}>Войти</CustomButton>
                        </Link>
                    </Space>
            }
        </Layout.Header>
    );
};

export default Header;