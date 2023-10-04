import { QueryClient, useMutation, useQueryClient } from '@tanstack/react-query'
import { message } from 'antd'
import React from 'react'
import { useNavigate } from 'react-router-dom'

import Wrapper from '../../components/__atom/FormWrapper'
import { createCategory } from '../category/services'
import Form from './components/Form'
import { createBrand } from './service'

function CreateBrand() {
    const queryClient = useQueryClient()
    const navigate = useNavigate()
    const createBrandMutation = useMutation(createBrand, {
        onSuccess: (data) => {
            if (data.status === 200) {
                message.success('Brand created')
                queryClient.invalidateQueries(['brands'])
                navigate('/admin/brand/list')
            } else message.error('Something went wrong!')
        },
    })
    return (
        <Wrapper
            title='Add Brand'
            description='Add new brand by providing a unique name'
        >
            <Form handleSubmit={createBrandMutation}></Form>
        </Wrapper>
    )
}

export default CreateBrand
