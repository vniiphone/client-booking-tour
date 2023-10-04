import { useState } from 'react'
import { Input, Image, Upload, Select } from 'antd'
import { useParams } from 'react-router-dom'
import { useQuery } from '@tanstack/react-query'
import axios from 'axios'
import moment from 'moment'
import { Formik, Form, Field, ErrorMessage } from 'formik'
import ImgCrop from 'antd-img-crop'
import * as Yup from 'yup'

import { getProductById } from '../../../services'
import Button from '../../../components/__atom/Button'
import productPlaceholder from '../../../assets/img/components/product_placeholder.png'
import { getPrerequisites } from '../services'

const { Option } = Select

const ProductSchema = Yup.object().shape({
    name: Yup.string().min(1).required('Name is required!'),
    price: Yup.number()
        .min(1, 'Invalid price!')
        .max(1000000000, 'Too big!')
        .required('Price is required'),
    description: Yup.string().min(1).required('Description is required'),
    modelYear: Yup.number()
        .min(1000, `Product can't be that old :)`)
        .max(moment().year(), `Back to the future huh?`)
        .required('Model year is required'),
    stock: Yup.number()
        .min(1, `Product quantity must greater than 1`)
        .required('Stock quantity is required'),
    brand_id: Yup.number().min(1, 'Please select brand'),
    category_id: Yup.number().min(1, 'Please select category'),
    imageUrl: Yup.string().required('Please upload image'),
})

interface Props {
    edit?: boolean
    handleSubmit: any
}

function FormComp({ edit, handleSubmit }: Props) {
    const [loading, setLoading] = useState(false)

    const { id } = useParams()
    const productQuery = useQuery(['product'], () => getProductById({ id }), {
        enabled: !!id,
    })

    const prerequisitesQuery = useQuery(['prerequisites'], getPrerequisites)
    return (
        <Formik
            initialValues={
                !edit || productQuery.isLoading
                    ? {
                          name: '',
                          description: '',
                          price: 0,
                          modelYear: moment().year(),
                          stock: 0,
                          brand_id: 0,
                          category_id: 0,
                          imageUrl: '',
                          imagePublicId: '',
                      }
                    : {
                          ...productQuery.data,
                          category_id: productQuery.data.category.id,
                          brand_id: productQuery.data.brand.id,
                      }
            }
            enableReinitialize={true}
            onSubmit={(values) => handleSubmit.mutate(values)}
            validationSchema={ProductSchema}
        >
            {({
                values,
                errors,
                touched,
                handleChange,
                handleBlur,
                setFieldValue,
            }) => (
                <Form
                    style={{
                        display: 'flex',
                        flexDirection: 'column',
                        gap: '20px',
                    }}
                >
                    <div className='form-group'>
                        <label className='form-label' htmlFor='name'>
                            Name
                        </label>
                        <Field
                            component={Input}
                            onChange={handleChange}
                            onBlur={handleBlur}
                            size='large'
                            name='name'
                            id='name'
                            status={errors.name && touched.name ? 'error' : ''}
                            value={values.name}
                        />
                        <ErrorMessage
                            component='div'
                            className='form-error'
                            name='name'
                        />
                    </div>

                    <div className='form-group'>
                        <label className='form-label' htmlFor='description'>
                            Description
                        </label>
                        <Field
                            component={Input}
                            onChange={handleChange}
                            onBlur={handleBlur}
                            size='large'
                            name='description'
                            id='description'
                            status={
                                errors.description && touched.description
                                    ? 'error'
                                    : ''
                            }
                            value={values.description}
                        />
                        <ErrorMessage
                            component='div'
                            className='form-error'
                            name='description'
                        />
                    </div>

                    <div className='form-group'>
                        <label className='form-label' htmlFor='category'>
                            Category
                        </label>
                        <Select
                            id='category_id'
                            value={values.category_id}
                            onChange={(value) =>
                                setFieldValue('category_id', value)
                            }
                            size='large'
                            status={
                                errors.category_id && touched.category_id
                                    ? 'error'
                                    : ''
                            }
                        >
                            <Option value={0}>-- Select category --</Option>
                            {prerequisitesQuery?.data?.[1].map(
                                (c: { id: number; name: string }) => (
                                    <Option key={c.id} value={c.id}>
                                        {c.name}
                                    </Option>
                                )
                            )}
                        </Select>
                        <ErrorMessage
                            component='div'
                            className='form-error'
                            name='category_id'
                        />
                    </div>

                    <div className='form-group'>
                        <label className='form-label' htmlFor='category'>
                            Brand
                        </label>
                        <Select
                            id='brand_id'
                            value={values.brand_id}
                            onChange={(value) =>
                                setFieldValue('brand_id', value)
                            }
                            size='large'
                            status={
                                errors.brand_id && touched.brand_id
                                    ? 'error'
                                    : ''
                            }
                        >
                            <Option value={0}>-- Select brand --</Option>
                            {prerequisitesQuery?.data?.[0].map(
                                (c: { id: number; name: string }) => (
                                    <Option key={c.id} value={c.id}>
                                        {c.name}
                                    </Option>
                                )
                            )}
                        </Select>
                        <ErrorMessage
                            component='div'
                            className='form-error'
                            name='brand_id'
                        />
                    </div>

                    <div className='form-group'>
                        <label className='form-label' htmlFor='price'>
                            Price
                        </label>
                        <Field
                            component={Input}
                            onChange={handleChange}
                            onBlur={handleBlur}
                            size='large'
                            name='price'
                            id='price'
                            status={
                                errors.price && touched.price ? 'error' : ''
                            }
                            value={values.price}
                        />
                        <ErrorMessage
                            component='div'
                            className='form-error'
                            name='price'
                        />
                    </div>

                    <div className='form-group'>
                        <label className='form-label'>Model year</label>
                        <Field
                            component={Input}
                            onChange={handleChange}
                            onBlur={handleBlur}
                            size='large'
                            name='modelYear'
                            id='modelYear'
                            status={
                                errors.modelYear && touched.modelYear
                                    ? 'error'
                                    : ''
                            }
                            value={values.modelYear}
                        />
                        <ErrorMessage
                            component='div'
                            className='form-error'
                            name='modelYear'
                        />
                    </div>
                    <div className='form-group'>
                        <label className='form-label'>Stock</label>
                        <Field
                            component={Input}
                            onChange={handleChange}
                            onBlur={handleBlur}
                            size='large'
                            name='stock'
                            id='stock'
                            status={
                                errors.stock && touched.stock ? 'error' : ''
                            }
                            value={values.stock}
                        />
                        <ErrorMessage
                            component='div'
                            className='form-error'
                            name='stock'
                        />
                    </div>
                    <div className='form-group'>
                        <label className='form-label'>Image</label>
                        <Image
                            src={values.imageUrl}
                            width={400}
                            height={400}
                            alt='Product image'
                            fallback={productPlaceholder}
                        />
                        <ImgCrop
                            rotate
                            aspect={1 / 1}
                            modalWidth={800}
                            quality={0.8}
                        >
                            <Upload
                                name={`imageFile`}
                                id={`imageFile`}
                                maxCount={1}
                                beforeUpload={async (file) => {
                                    setLoading(true)
                                    const data = new FormData()
                                    data.append('file', file)
                                    data.append('upload_preset', 'spring_react')
                                    const uploadRes = await axios.post(
                                        'https://api.cloudinary.com/v1_1/dantocthang/image/upload',
                                        data,
                                        { withCredentials: false }
                                    )
                                    const { url, public_id } = uploadRes.data
                                    setFieldValue('imageUrl', url)
                                    setFieldValue('imagePublicId', public_id)
                                    setLoading(false)
                                    return false
                                }}
                                listType='picture-card'
                                showUploadList={false}
                            >
                                Upload image
                            </Upload>
                        </ImgCrop>
                        <ErrorMessage
                            component='div'
                            className='form-error'
                            name='imageUrl'
                        />
                    </div>

                    <div className='d-flex mt-4 flex-align-center gap-3'>
                        <Button to='/admin/product/list' type='outline'>
                            BACK
                        </Button>
                        <Button loading={loading}>
                            {edit ? 'SAVE' : 'CREATE'}
                        </Button>
                    </div>
                </Form>
            )}
        </Formik>
    )
}

export default FormComp
