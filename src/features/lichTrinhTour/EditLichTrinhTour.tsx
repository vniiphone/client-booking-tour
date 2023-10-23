import { useMutation, useQuery } from '@tanstack/react-query'
import { useParams } from 'react-router-dom'
import { message } from 'antd'
import React from 'react'
import { editLichTrinhTour } from './services'

import Wrapper from '../../components/__atom/FormWrapper'
import Form from './components/Form'

function EditLichTrinhTour() {
  const editLichTrinhTourMutation = useMutation(editLichTrinhTour, {
    onSuccess: (data) => {
      if (data.status === 201) {
        message.success('Lich Trinh updated')
      }
      else message.error('Something went wrong!')
    },
  })
  return (
    <Wrapper
      title='Chỉnh Sửa Thông Tin Lich Trinh Tour'
    // description='Chỉnh sửa thông tin tour'
    >
      <Form edit handleSubmit={editLichTrinhTourMutation}></Form>
    </Wrapper>
  )
}

export default EditLichTrinhTour
