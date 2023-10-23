import { Breadcrumb, Input, message } from 'antd'
import Button from '../../components/__atom/Button'
import { Link } from 'react-router-dom'
import { Form, Formik, Field, ErrorMessage } from 'formik'
import * as Yup from 'yup'
import { useDispatch } from 'react-redux'
import { useNavigate } from 'react-router-dom'

import { login } from './services'
import { loginSuccess } from '../../app/slices/authSlice'

import classNames from 'classnames/bind'
import styles from './Login.module.scss'
import { useMutation } from '@tanstack/react-query'
const cl = classNames.bind(styles)

const LoginSchema = Yup.object().shape({
    username: Yup.string().required('Required'),
    password: Yup.string()
        .min(1, 'Too Short!')
        .max(50, 'Too Long!')
        .required('Password is required'),
})

function Login() {
    const navigate = useNavigate()
    const dispatch = useDispatch()
    const loginMutation = useMutation(login, {
        onSuccess: (data) => {
            localStorage.setItem('token', data.data.accessToken)
            dispatch(loginSuccess(data.data))
            navigate('/')
        },
        onError: (data) => {
            message.error('Tài khoản hoặc mật khẩu sai!')
        },
    })
    const handleSubmit = async (values: any) => {
        loginMutation.mutate(values)
    }

    return (
        <div className={cl('wrapper')}>
            <Breadcrumb>
                <Breadcrumb.Item>
                    <Link to='/'>Home</Link>
                </Breadcrumb.Item>
                <Breadcrumb.Item>
                    <Link to='/login'>Đăng Nhập</Link>
                </Breadcrumb.Item>
            </Breadcrumb>
            {/* <div className={cl('heading')}>ĐÃ CÓ TÀI KHOẢN?</div> */}
            <div className={cl('container')}>
                <div className={cl('form')}>
                    <div className={cl('form-heading')}>
                        ĐĂNG KÝ TÀI KHOẢN
                    </div>
                    <div className={cl('text')}>

                    </div>
                    <Button to='/register' type='outline'>
                        TẠO TÀI KHOẢN
                    </Button>
                </div>
                <div className={cl('form')}>
                    <div className={cl('form-heading')}>ĐĂNG NHẬP</div>
                    <div className={cl('text')}>
                        Nếu bạn đã có tài khoản, vui lòng đăng nhập
                    </div>
                    <Formik
                        initialValues={{ username: '', password: '' }}
                        onSubmit={handleSubmit}
                        validationSchema={LoginSchema}
                    >
                        {({
                            errors,
                            touched,
                            values,
                            handleChange,
                            handleBlur,
                        }) => (
                            <Form className={cl('login')}>
                                <div className={cl('form-group')}>
                                    <Field
                                        component={Input}
                                        size='large'
                                        onChange={handleChange}
                                        onBlur={handleBlur}
                                        status={
                                            errors.username && touched.username
                                                ? 'error'
                                                : ''
                                        }
                                        name='username'
                                        id='username'
                                        value={values.username}
                                        placeholder='Enter username'
                                    ></Field>
                                    <ErrorMessage
                                        component='div'
                                        className='field-error'
                                        name='username'
                                    />
                                </div>
                                <div className={cl('form-group')}>
                                    <Field
                                        component={Input.Password}
                                        size='large'
                                        onChange={handleChange}
                                        onBlur={handleBlur}
                                        status={
                                            errors.password && touched.password
                                                ? 'error'
                                                : ''
                                        }
                                        name='password'
                                        id='password'
                                        value={values.password}
                                        placeholder='Enter password'
                                    ></Field>
                                    <ErrorMessage
                                        component='div'
                                        className='field-error'
                                        name='password'
                                    />
                                </div>
                                <div className={cl('actions')}>
                                    <Button type='outline'>ĐĂNG NHẬP</Button>
                                    <Link
                                        className={cl('link')}
                                        to='/password-recovery'
                                    >
                                        Quên mật khẩu?
                                    </Link>
                                </div>
                            </Form>
                        )}
                    </Formik>
                </div>
            </div>
        </div>
    )
}

export default Login
