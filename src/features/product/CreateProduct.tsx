import React from 'react'
import { message } from 'antd'
import { useMutation } from '@tanstack/react-query'
import { useNavigate } from 'react-router-dom'
import { createProduct } from './services'

import Wrapper from '../../components/__atom/FormWrapper'
import Form from './components/Form'

function CreateProduct() {
    const navigate = useNavigate()
    // const handleSubmit = useMutation(createProduct, {
    //     onSuccess: (data) => {
    //         if (data.status === 201) {
    //             console.log('CreateProduct line 15: add success')
    //             message.success('Đã Thêm Tour')
    //             navigate('/admin/tour/list')
    //         } else {
    //             console.log('Something went wrong!: ', data)
    //             message.error('Something went wrong!')
    //         }
    //     },
    // })
    const createProductMutation = useMutation(createProduct, {
        onSuccess: (data) => {
            // console.log('Mutation success. Data:');
            if (data.status === 201) {
                message.success('Tour added')
                navigate('/admin/tour/list')
            } else {
                // message.error('Something went wrong!')
            }
        },
        onError: (error) => {
            console.error('Mutation error:', error);
            // message.error('Something went wrong!')

            // Xử lý lỗi, hiển thị thông báo lỗi, v.v. 
        }
    })

    return (
        <Wrapper
            title='Thêm Tour'
            description='Nhập các thông tin cho Tour'
        >
            <Form handleSubmit={createProductMutation}></Form>
        </Wrapper>
    )
}



export default CreateProduct
