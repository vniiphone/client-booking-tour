import { useMutation, useQuery } from '@tanstack/react-query'
import { useParams } from 'react-router-dom'
import { message } from 'antd'
import React from 'react'
import { editTour } from './services'

import Wrapper from '../../components/__atom/FormWrapper'
import Form from './components/Form'

function EditProduct() {
    const editProductMutation = useMutation(editTour, {
        onSuccess: (data) => {
            if (data.status === 201) {
                message.success('Tour updated')
            }
            else message.error('Something went wrong!')
        },
    })
    return (
        <Wrapper
            title='Chỉnh Sửa Thông Tin Tour'
        // description='Chỉnh sửa thông tin tour'
        >
            <Form edit handleSubmit={editProductMutation}></Form>
        </Wrapper>
    )
}

export default EditProduct
