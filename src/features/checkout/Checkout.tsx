import React, { useEffect, useState } from 'react'
import { Formik, Form, Field, ErrorMessage } from 'formik'
import * as Yup from 'yup'
import { getCart } from '../../services'

import classNames from 'classnames/bind'
import styles from './Checkout.module.scss'
import { Breadcrumb, Input, message, Select } from 'antd'
import { Link, useNavigate } from 'react-router-dom'
import Heading from './components/Heading'
import Total from './components/Total'
import { useAppSelector } from '../../hooks'
import { useMutation, useQuery } from '@tanstack/react-query'
import { createOrder } from './services'
import { createAddress, getAddresses } from '../../services'
import Address from '../../model/address'
import { goPayment } from './services'
const cl = classNames.bind(styles)

const { Option } = Select

const AddressSchema = Yup.object().shape({
    city_id: Yup.number()
        .min(1, 'Please choose city')
        .required('Please choose city'),
    district_id: Yup.number().min(1, 'Please choose district'),
    ward_id: Yup.number().min(1, 'Please choose ward'),
    address: Yup.string().required('Please enter your delivery address'),
    phone: Yup.string()
        .trim()
        .matches(/(84|0[3|5|7|8|9])+([0-9]{8})\b/, 'Invalid phone number')
        .required('Please enter a valid phone number'),
})

function Checkout() {
    const navigate = useNavigate()
    const user = useAppSelector((state) => state.auth)
    const [method, setMethod] = useState('vnpay')

    const cartQuery = useQuery(['cart'], () => getCart({ user_id: user.id }))

    const addressQuery = useQuery(['addresses'], () => getAddresses(user.id))

    const createAddressMutation = useMutation(createAddress, {
        onSuccess: (data) => {
            if (data.status === 200) {
                message.success('New address profile added!')
                createOrderMutation.mutate({
                    user_id: user.id,
                    address_id: data.data.id,
                })
            }
        },
    })

    const goPaymentMutation = useMutation(goPayment, {
        onSuccess: (data) => {
            if (data.status === 200) {
                window.location.href = data.data
            }
            // message.success('Order paid successfully!')
        },
    })

    const createOrderMutation = useMutation(createOrder, {
        onSuccess: (data) => {
            message.success('Order created successfully!')
            goPaymentMutation.mutate({
                invoice_id: data.data.invoiceId,
                user_id: user.id,
                method,
            })
        },
    })

    const handlePlaceOrder = async (values: any) => {
        let address_id = values.address_id
        if (address_id == 0) {
            createAddressMutation.mutate({
                user_id: user.id,
                ward_id: values.ward_id,
                phone: values.phone,
                address: values.address,
            })
        } else
            createOrderMutation.mutate({
                user_id: user.id,
                address_id: address_id,
            })
    }

    useEffect(() => {
        if (cartQuery?.data?.length === 0) {
            message.warning('Nothing to checkout!')
            navigate('/cart')
        }
    }, [])

    return (
        <div className={cl('wrapper')}>
            <Breadcrumb>
                <Breadcrumb.Item>
                    <Link to='/'>Home</Link>
                </Breadcrumb.Item>
                <Breadcrumb.Item>
                    <div>checkout</div>
                </Breadcrumb.Item>
            </Breadcrumb>
            <div className={cl('heading')}>CHECKOUT</div>
            <Formik
                initialValues={{
                    city_id: 0,
                    district_id: 0,
                    ward_id: 0,
                    address_id: 0,
                    address: '',
                    phone: '',
                }}
                validationSchema={AddressSchema}
                onSubmit={handlePlaceOrder}
            >
                {({
                    errors,
                    touched,
                    values,
                    handleChange,
                    handleBlur,
                    setFieldValue,
                    resetForm,
                }) => (
                    <Form className={cl('form')}>
                        <div className='row'>
                            <div className='col l-7 m-6 c-12'>
                                <Heading>Billing Details</Heading>
                                <div className={cl('info')}>
                                    <div className='form-group'>
                                        <label
                                            className='form-label'
                                            htmlFor='city_id'
                                        >
                                            City
                                        </label>
                                        <Select
                                            disabled={values.address_id !== 0}
                                            className={cl('select')}
                                            id='city_id'
                                            value={values.city_id}
                                            onChange={(value) =>
                                                setFieldValue('city_id', value)
                                            }
                                            size='large'
                                            status={
                                                errors.city_id &&
                                                touched.city_id
                                                    ? 'error'
                                                    : ''
                                            }
                                        >
                                            <Option value={0}>
                                                -- Select city --
                                            </Option>
                                            <Option value={1}>Can Tho</Option>
                                        </Select>
                                        <ErrorMessage
                                            component='div'
                                            className='form-error'
                                            name='city_id'
                                        />
                                    </div>
                                    <div className='form-group'>
                                        <label
                                            className='form-label'
                                            htmlFor='district_id'
                                        >
                                            District
                                        </label>
                                        <Select
                                            disabled={values.address_id !== 0}
                                            className={cl('select')}
                                            id='district_id'
                                            value={values.district_id}
                                            onChange={(value) =>
                                                setFieldValue(
                                                    'district_id',
                                                    value
                                                )
                                            }
                                            size='large'
                                            status={
                                                errors.district_id &&
                                                touched.district_id
                                                    ? 'error'
                                                    : ''
                                            }
                                        >
                                            <Option value={0}>
                                                -- Select district --
                                            </Option>
                                            <Option value={1}>Binh Thuy</Option>
                                        </Select>
                                        <ErrorMessage
                                            component='div'
                                            className='form-error'
                                            name='district_id'
                                        />
                                    </div>
                                    <div className='form-group'>
                                        <label
                                            className='form-label'
                                            htmlFor='ward_id'
                                        >
                                            Ward
                                        </label>
                                        <Select
                                            disabled={values.address_id !== 0}
                                            className={cl('select')}
                                            id='ward_id'
                                            value={values.ward_id}
                                            onChange={(value) =>
                                                setFieldValue('ward_id', value)
                                            }
                                            size='large'
                                            status={
                                                errors.ward_id &&
                                                touched.ward_id
                                                    ? 'error'
                                                    : ''
                                            }
                                        >
                                            <Option value={0}>
                                                -- Select ward --
                                            </Option>
                                            <Option value={1}>
                                                Long Tuyen
                                            </Option>
                                        </Select>
                                        <ErrorMessage
                                            component='div'
                                            className='form-error'
                                            name='ward_id'
                                        />
                                    </div>
                                    <div className='form-group'>
                                        <label
                                            className='form-label'
                                            htmlFor='address'
                                        >
                                            Address
                                        </label>
                                        <Field
                                            disabled={values.address_id !== 0}
                                            component={Input}
                                            onChange={handleChange}
                                            onBlur={handleBlur}
                                            size='large'
                                            name='address'
                                            id='address'
                                            status={
                                                errors.address &&
                                                touched.address
                                                    ? 'error'
                                                    : ''
                                            }
                                            value={values.address}
                                        />
                                        <ErrorMessage
                                            component='div'
                                            className='form-error'
                                            name='address'
                                        />
                                    </div>
                                    <div className='form-group'>
                                        <label
                                            className='form-label'
                                            htmlFor='phone'
                                        >
                                            Phone
                                        </label>
                                        <Field
                                            disabled={values.address_id !== 0}
                                            component={Input}
                                            onChange={handleChange}
                                            onBlur={handleBlur}
                                            size='large'
                                            name='phone'
                                            id='phone'
                                            status={
                                                errors.phone && touched.phone
                                                    ? 'error'
                                                    : ''
                                            }
                                            value={values.phone}
                                        />
                                        <ErrorMessage
                                            component='div'
                                            className='form-error'
                                            name='phone'
                                        />
                                    </div>
                                </div>
                                <div className={cl('profile')}>
                                    <span className={cl('profile-label')}>
                                        Or choose address profile:{' '}
                                    </span>
                                    <Select
                                        className={cl('profile-select')}
                                        value={values.address_id}
                                        onChange={(addressId: number) => {
                                            const a = addressQuery?.data?.find(
                                                (x: Address) =>
                                                    x.id === addressId
                                            )
                                            if (!a) resetForm()
                                            else {
                                                setFieldValue(
                                                    'address_id',
                                                    a.id
                                                )
                                                setFieldValue(
                                                    'ward_id',
                                                    a.ward.id
                                                )
                                                setFieldValue(
                                                    'district_id',
                                                    a.ward.district.id
                                                )
                                                setFieldValue(
                                                    'city_id',
                                                    a.ward.district.city.id
                                                )
                                                setFieldValue(
                                                    'address',
                                                    a.address
                                                )
                                                setFieldValue('phone', a.phone)
                                            }
                                        }}
                                        size='large'
                                    >
                                        <Option value={0}>
                                            -- Choose profile --
                                        </Option>
                                        {addressQuery?.data?.map(
                                            (a: Address) => (
                                                <Option key={a.id} value={a.id}>
                                                    Profile {a.id}: {a.address},{' '}
                                                    {a.phone}
                                                </Option>
                                            )
                                        )}
                                    </Select>
                                </div>
                            </div>
                            <div className='col l-5 m-6 c-12'>
                                <Total
                                    method={method}
                                    setMethod={setMethod}
                                    cart={cartQuery.data}
                                ></Total>
                            </div>
                        </div>
                    </Form>
                )}
            </Formik>
        </div>
    )
}

export default Checkout
