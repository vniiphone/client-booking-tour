import { useEffect, useState } from 'react'

import { Link, useParams, useNavigate } from 'react-router-dom'
import { Image, Table } from 'antd'

import type { ColumnsType } from 'antd/es/table'
import { useQuery, useMutation } from '@tanstack/react-query'
import Button from '../../components/__atom/Button'
import Wrapper from '../../components/__atom/FormWrapper'
import { Edit, Delete, Add } from '../../components/__atom/ActionIcon'


import { deleteLichTrinhTour } from './services'
import { getTourById, getTours, getLichTrinhTourById } from '../../services'
import Pagination from '../../components/__layout/Pagination'
// import LichTrinhTour from '../../model/lichTrinhTour'

interface LichTrinhTour {
  key: string
  id: number
  phuongTien: string
  sttLichTrinh: number
  tenLichTrinh: string
  ghiChu: string
  lichTrinhChiTiet: string
  nameKhachSan: string
  diaChiKhachSan: string
  giaPhongKhachSan: number
  phoneKhachSan: string
}

function ListLichTrinhTour() {

  const { id } = useParams()
  const navigate = useNavigate()

  console.log("Tour ID: ", id)

  const lichTrinhTourQuery = useQuery(['admin-lichtrinhtour'], () =>
    getLichTrinhTourById({ id })
  )

  // console.log(lichTrinhTourQuery.data)


  const deleteLichTrinhTourMuatation = useMutation(deleteLichTrinhTour, {
    onSuccess: (data) => {
      console.log(data)
      lichTrinhTourQuery.refetch()
    },
  })



  const cot: ColumnsType<LichTrinhTour> = [

    {
      title: 'ID',
      dataIndex: 'id',
      key: 'id',
    },

    {
      title: 'Tên Lịch Trình',
      dataIndex: 'tenLichTrinh',
      key: 'tenLichTrinh'
    },
    {
      title: 'STT Lịch Trình',
      dataIndex: 'sttLichTrinh',
      key: 'sttLichTrinh'
    },
    {
      title: 'Ghi Chú',
      dataIndex: 'ghiChu',
      key: 'ghiChu'
    },
    {
      title: 'Phương Tiện',
      dataIndex: 'phuongTien',
      key: 'phuongTien'
    },
    {
      title: 'Hành Động',
      key: 'action',
      render: (_: any, record) => (
        <div className='d-flex flex-align-center gap-3'>
          <Edit
            to={`/admin/lichtrinhtour/${id}/${record.id}`}
          ></Edit>
          <Delete
            onClick={() =>
              deleteLichTrinhTourMuatation.mutate({ id: record.id })
            }
          />
        </div>
      ),
    },

  ]


  const dataSources: LichTrinhTour[] = lichTrinhTourQuery.isLoading
    ? []
    : lichTrinhTourQuery.data.map((x: LichTrinhTour) => ({
      ...x,
      key: x.id,
    }))


  return (
    <Wrapper title='Lịch Trình Tour' description={`Quản Lí Lịch Trình Tour`}>
      <div>
        <Button
          type='primary'
          to={`/admin/lichTrinhTour/create/${id}`}
        >
          Thêm Lịch Trình Tour
        </Button>
      </div>
      <Table
        columns={cot}
        loading={lichTrinhTourQuery.isLoading}
        dataSource={dataSources}
        pagination={false}
      />

    </Wrapper>
  )
}

export default ListLichTrinhTour
