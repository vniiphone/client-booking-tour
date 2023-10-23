import { Breadcrumb, Input, message } from 'antd'
import Button from '../../components/__atom/Button'
import { Link } from 'react-router-dom'
import { Form, Formik, Field, ErrorMessage } from 'formik'
import * as Yup from 'yup'

import classNames from 'classnames/bind'
import styles from './Register.module.scss'
import { useMutation } from '@tanstack/react-query'
import { createAccount } from './services'
const cl = classNames.bind(styles)

const SignupSchema = Yup.object().shape({
    // username: Yup.string()
    //     .min(1, 'Name too short')
    //     .max(50, 'Name too long')
    //     .required('Enter your username'),
    // email: Yup.string().email('Invalid email').required('Required'),
    // password: Yup.string()
    //     .min(6, 'Too Short!')
    //     .max(40, 'Too Long!')
    //     .required('Password is required')
    //     .matches(
    //         /^(?=.*[a-z])(?=.*[A-Z])(?=.*\d).{6,50}$/,
    //         'Password must contains at least one Uppercase letter, one lowercase letter and a number'
    //     ),
    // confirmPassword: Yup.string().oneOf(
    //     [Yup.ref('password'), null],
    //     'Passwords must match'
    // ),
})
function Register() {
    const createAccountMutation = useMutation(createAccount, {
        onSuccess: (data) => {
            console.log(data)
            if (data.status === 200) message.success('Sign up successfully')
        },
        onError: (error: any) => {
            message.error(error.response.data.message)
        },
    })

    return (
        <div className={cl('wrapper')}>
            <Breadcrumb>
                <Breadcrumb.Item>
                    <Link to='/'>Home</Link>
                </Breadcrumb.Item>
                <Breadcrumb.Item>
                    <Link to='/register'>ĐĂNG KÝ</Link>
                </Breadcrumb.Item>
            </Breadcrumb>
            <div className={cl('heading')}>TẠO TÀI KHOẢN</div>
            <div className={cl('container')}>
                <div className={cl('form')}>
                    <div className={cl('form-heading')}>
                        THÔNG TIN CÁ NHÂN
                    </div>
                    <Formik
                        initialValues={{
                            username: '',
                            email: '',
                            password: '',
                            confirmPassword: '',
                        }}
                        onSubmit={(values) =>
                            createAccountMutation.mutate(values)
                        }
                        validationSchema={SignupSchema}
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
                                    <label
                                        htmlFor='username'
                                        className={cl('form-label')}
                                    >
                                        TÊN TÀI KHOẢN *
                                    </label>
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
                                        placeholder='Enter full name'
                                    ></Field>
                                    <ErrorMessage
                                        component='div'
                                        className='field-error'
                                        name='username'
                                    />
                                </div>
                                <div className={cl('form-group')}>
                                    <label
                                        htmlFor='email'
                                        className={cl('form-label')}
                                    >
                                        EMAIL CÁ NHÂN*
                                    </label>
                                    <Field
                                        component={Input}
                                        size='large'
                                        onChange={handleChange}
                                        onBlur={handleBlur}
                                        status={
                                            errors.email && touched.email
                                                ? 'error'
                                                : ''
                                        }
                                        name='email'
                                        id='email'
                                        value={values.email}
                                        placeholder='Enter email'
                                    ></Field>
                                    <ErrorMessage
                                        component='div'
                                        className='field-error'
                                        name='email'
                                    />
                                </div>
                                <div className={cl('form-group')}>
                                    <label
                                        htmlFor='password'
                                        className={cl('form-label')}
                                    >
                                        MẬT KHẨU *
                                    </label>
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
                                <div className={cl('form-group')}>
                                    <label
                                        htmlFor='confirmPassword'
                                        className={cl('form-label')}
                                    >
                                        XÁC NHẬN MẬT KHẨU *
                                    </label>
                                    <Field
                                        component={Input.Password}
                                        size='large'
                                        onChange={handleChange}
                                        onBlur={handleBlur}
                                        status={
                                            errors.confirmPassword &&
                                                touched.confirmPassword
                                                ? 'error'
                                                : ''
                                        }
                                        name='confirmPassword'
                                        id='confirmPassword'
                                        value={values.confirmPassword}
                                        placeholder='Confirm password'
                                    ></Field>
                                    <ErrorMessage
                                        component='div'
                                        className='field-error'
                                        name='confirmPassword'
                                    />
                                </div>
                                <div className={cl('actions')}>
                                    <Button type='outline'>ĐĂNG KÝ</Button>
                                    <span>or</span>
                                    <Link className={cl('link')} to='/'>
                                        Trở về trang chủ
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

export default Register
