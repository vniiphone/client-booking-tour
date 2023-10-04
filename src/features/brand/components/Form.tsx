import { useQuery } from '@tanstack/react-query'
import { Input } from 'antd'
import { Formik, Form, Field, ErrorMessage } from 'formik'
import { useNavigate, useParams } from 'react-router-dom'
import * as Yup from 'yup'
import Button from '../../../components/__atom/Button'
import { getBrandByID } from '../service'

const BrandSchema = Yup.object().shape({
    name: Yup.string().min(1).required('Required'),
})

interface Props {
    edit?: boolean
    handleSubmit: any
}

function FormComp({ edit, handleSubmit = () => {} }: Props) {
    const navigate = useNavigate()
    const { id } = useParams()
    const brandQuery = useQuery(['brand'], () => getBrandByID(id || 1), {
        enabled: !!id,
    })
    return (
        <Formik
            initialValues={
                !edit || brandQuery.isLoading
                    ? {
                          name: '',
                      }
                    : {
                          ...brandQuery.data,
                      }
            }
            enableReinitialize={true}
            onSubmit={(values) => handleSubmit.mutate(values)}
            validationSchema={BrandSchema}
        >
            {({ values, errors, handleChange, handleBlur }) => (
                <Form>
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
                            status={errors.name ? 'error' : ''}
                            value={values.name}
                        />
                       <ErrorMessage
                            component='div'
                            className='form-error'
                            name='name'
                        />
                    </div>
                    <div className='d-flex mt-4 flex-align-center gap-3'>
                        <Button to='/admin/brand/list' type='outline'>
                            BACK
                        </Button>
                        <Button>{edit ? 'SAVE' : 'CREATE'}</Button>
                    </div>
                </Form>
            )}
        </Formik>
    )
}

export default FormComp
