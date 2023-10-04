import React from 'react'
import { message, Table } from 'antd'
import type { ColumnsType } from 'antd/es/table'

import Button from '../../components/__atom/Button'
import Wrapper from '../../components/__atom/FormWrapper'
import { Edit, Delete } from '../../components/__atom/ActionIcon'
import { useMutation, useQuery } from '@tanstack/react-query'
import { deleteBrand, getBrands } from './service'
import { AxiosError } from 'axios'

interface DataType {
    key: string
    id: number
    name: string
}

function ListBrand() {
    const brandQuery = useQuery(['brands'], getBrands)

    const deleteBrandMutation = useMutation(deleteBrand, {
        onSuccess: (data) => {
            if (data.status === 200) message.success('Brand deleted')
            brandQuery.refetch()
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
            title: 'Name',
            dataIndex: 'name',
            key: 'name',
        },
        {
            title: 'Action',
            dataIndex: undefined,
            key: 'action',
            render: (_, record) => (
                <div className='d-flex flex-align-center gap-3'>
                    <Edit to={`/admin/loaiTour/${record.id}`}></Edit>
                    <Delete
                        onClick={() => deleteBrandMutation.mutate(record.id)}
                    />
                </div>
            ),
        },
    ]

    const data: DataType[] = brandQuery.isLoading
        ? []
        : brandQuery.data.map((x: DataType) => ({
              ...x,
              key: x.id,
          }))
    return (
        <Wrapper title='Brands' description={`Manage all partners's brand`}>
            <Button
                type='primary'
                to='/admin/brand/create'
                className='mt-4 mb-4'
            >
                Add new brand
            </Button>
            <Table
                loading={brandQuery.isLoading}
                columns={columns}
                dataSource={data}
            />
        </Wrapper>
    )
}

export default ListBrand
