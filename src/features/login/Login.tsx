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
            message.error('Username or password is incorrect!')
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
                    <Link to='/login'>Home</Link>
                </Breadcrumb.Item>
            </Breadcrumb>
            <div className={cl('heading')}>ALREADY REGISTERED?</div>
            <div className={cl('container')}>
                <div className={cl('form')}>
                    <div className={cl('form-heading')}>NEW CUSTOMER</div>
                    <div className={cl('text')}>
                        By creating an account with our store, you will be able
                        to move through the checkout process faster, store
                        multiple shipping addresses, view and track your orders
                        in your account and more.
                    </div>
                    <Button to='/register' type='outline'>
                        CREATE AN ACCOUNT
                    </Button>
                </div>
                <div className={cl('form')}>
                    <div className={cl('form-heading')}>LOGIN</div>
                    <div className={cl('text')}>
                        If you have an account with us, please log in.
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
                                    <Button type='outline'>LOGIN</Button>
                                    <Link
                                        className={cl('link')}
                                        to='/password-recovery'
                                    >
                                        Lost your password?
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
