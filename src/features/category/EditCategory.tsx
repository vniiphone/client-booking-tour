import { useMutation } from '@tanstack/react-query'
import { message } from 'antd'
import React from 'react'
import Wrapper from '../../components/__atom/FormWrapper'
import Form from './components/Form'
import { updateCategory } from './services'

function EditCategory() {
    const updateCategoryMutation = useMutation(updateCategory, {
        onSuccess: (data) => {
            if (data.status === 200) {
                message.success('Cập nhật Loại Tour thành công')
            } else message.error('Something went wrong!')
        },
    })
    return (
        <Wrapper
            title='Chỉnh Sửa: '
            description='Chỉnh sửa tên Loại Tour'
        >
            <Form edit handleSubmit={updateCategoryMutation}></Form>
        </Wrapper>
        
    )
}

export default EditCategory
