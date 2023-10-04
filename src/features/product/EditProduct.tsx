import { useMutation, useQuery } from '@tanstack/react-query'
import { useParams } from 'react-router-dom'
import { message } from 'antd'
import React from 'react'
import { editProduct } from './services'

import Wrapper from '../../components/__atom/FormWrapper'
import Form from './components/Form'

function EditProduct() {
    const editProductMutation = useMutation(editProduct, {
        onSuccess: (data) => {
            if (data.status === 201) {
                message.success('Product updated')
            }
            else message.error('Something went wrong!')
        },
    })
    return (
        <Wrapper
            title='Edit product'
            description='Change product specifications'
        >
            <Form edit handleSubmit={editProductMutation}></Form>
        </Wrapper>
    )
}

export default EditProduct
