import React from 'react'
import { message } from 'antd'
import { useMutation } from '@tanstack/react-query'
import { useNavigate } from 'react-router-dom'
import { createLichTrinhTour } from './services'

import Wrapper from '../../components/__atom/FormWrapper'
import Form from './components/Form'

function CreateLichTrinhTour() {
  const navigate = useNavigate()

  const createLichTrinhTourMutation = useMutation(createLichTrinhTour, {
    onSuccess: (data) => {
      console.log('Mutation success. Data:');
      if (data.status === 201) {
        message.success('Lịch Trình Tour added')
        // navigate('/admin/lichtrinhtour/list')
      } else {
        message.error('Something went wrong!')
      }
    },
    onError: (error) => {
      console.error('Mutation error:', error);
      // Xử lý lỗi, hiển thị thông báo lỗi, v.v. 
    }
  })

  return (
    <Wrapper
      title='Thêm Lịch Trình Tour'
    >
      <Form handleSubmit={createLichTrinhTourMutation}></Form>
    </Wrapper>
  )
}



export default CreateLichTrinhTour
