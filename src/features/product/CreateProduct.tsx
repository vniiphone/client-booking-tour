import React from 'react'
import { message } from 'antd'
import { useMutation } from '@tanstack/react-query'
import { useNavigate } from 'react-router-dom'
import { createProduct } from './services'

import Wrapper from '../../components/__atom/FormWrapper'
import Form from './components/Form'

function CreateProduct() {
    const navigate = useNavigate()
    const createProductMutation = useMutation(createProduct, {
        onSuccess: (data) => {
            if (data.status === 201) {
                message.success('Product added')
                navigate('/admin/product/list')
            } else message.error('Something went wrong!')
        },
    })

    return (
        <Wrapper
            title='Add product'
            description='Fill all the required informations'
        >
            <Form handleSubmit={createProductMutation}></Form>
        </Wrapper>
    )
}

export default CreateProduct
