import React from 'react'
import { useMutation } from '@tanstack/react-query'
import { useNavigate } from 'react-router-dom'

import Wrapper from '../../components/__atom/FormWrapper'
import Form from './components/Form'
import { createCategory } from './services'
import { message } from 'antd'

function CreateCategory() {
    const navigate = useNavigate()
    const createCategoryMutation = useMutation(createCategory, {
        onSuccess: (data) => {
            if (data.status === 200) {
                message.success('Category created')
                navigate('/admin/loaiTour/list')
            }
            else message.error('Something went wrong!')
        },
    })
    return (
        <Wrapper
            title='Thêm Loại Tour'
            description='Vui lòng điền tên loại tour mà website chưa có'
        >
            <Form handleSubmit={createCategoryMutation}></Form>
        </Wrapper>
    )
}

export default CreateCategory
