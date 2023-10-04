import { useMutation } from '@tanstack/react-query'
import { message } from 'antd'
import React from 'react'
import Wrapper from '../../components/__atom/FormWrapper'
import Form from './components/Form'
import { updateBrand } from './service'

function EditBrand() {
    const updateBrandMutation = useMutation(updateBrand, {
        onSuccess: (data) => {
            if (data.status === 200) {
                message.success('Brand updated')
            } else message.error('Something went wrong!')
        },
    })
    return (
        <Wrapper
            title='Edit Brand:'
            description='Add new brand by providing a unique name'
        >
            <Form edit handleSubmit={updateBrandMutation}></Form>
        </Wrapper>
    )
}

export default EditBrand
