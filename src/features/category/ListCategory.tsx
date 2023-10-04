import React from 'react'
import { useQuery, useMutation } from '@tanstack/react-query'
import { message, Table } from 'antd'
import type { ColumnsType } from 'antd/es/table'

import { getCategories, deleteCategory } from './services'

import Button from '../../components/__atom/Button'
import Wrapper from '../../components/__atom/FormWrapper'
import { Edit, Delete } from '../../components/__atom/ActionIcon'

interface DataType {
    key: string
    id: number
    name: string
    noiDung: string
}

function ListCategory() {
    const categoryQuery = useQuery(['categories'], getCategories)

    const deleteCategoryMutation = useMutation(deleteCategory, {
        onSuccess: (data) => {
            if (data.status === 200) message.success('Loại Tour deleted')
            else message.error('Something went wrong!')
            categoryQuery.refetch()
        },
        onError: (error: any) => {
            if (error?.response?.status >= 400)
                message.error(error.response.data)
        },
    })

    const columns: ColumnsType<DataType> = [
        {
            title: 'ID',
            dataIndex: 'id',
            key: 'id',
        },
        {
            title: 'Tên',
            dataIndex: 'name',
            key: 'name',
        },
        {
            title: 'Nội Dung',
            dataIndex: 'noiDung',
            key: 'noiDung',
        },
        {
            title: 'Visible',
            dataIndex: 'visible',
            key: 'visible',
        },
        {
            title: 'Action',
            dataIndex: undefined,
            key: 'action',
            render: (_, record) => (
                <div className='d-flex flex-align-center gap-3'>
                    <Edit
                        to={`/admin/loaiTour/${record.id}`}
                        onClick={() => console.log('hi')}
                    ></Edit>
                    <Delete
                        onClick={() => deleteCategoryMutation.mutate(record.id)}
                    />
                </div>
            ),
        },
    ]

    const data: DataType[] = categoryQuery.isLoading
        ? []
        : categoryQuery.data.map((x: DataType) => ({
              ...x,
              key: x.id,
          }))

    return (
        <Wrapper title='Categories' description={`Manage all categories`}>
            <Button
                type='primary'
                to='/admin/loaiTour/create'
                className='mt-4 mb-4'
            >
               Thêm Loại Tour
            </Button>
            <Table
                loading={categoryQuery.isLoading}
                columns={columns}
                dataSource={data}
            />
        </Wrapper>
    )
}

export default ListCategory
