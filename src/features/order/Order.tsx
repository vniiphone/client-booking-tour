import { useMutation, useQuery, useQueryClient } from '@tanstack/react-query'
import { message, Popconfirm, Table, Tag } from 'antd'
import { ColumnsType } from 'antd/es/table'
import React, { useMemo } from 'react'
import { Delete } from '../../components/__atom/ActionIcon'
import Wrapper from '../../components/__atom/FormWrapper'
// import Address from '../../model/address'
import CartItem from '../../model/cart-item'
// import Product from '../../model/tour'
import formatCurrency from '../../utils/formatCurrency'
import Expand from './components/Expand'
import { deleteInvoice, getInvoices } from './services'
import Profile from '../../model/profile'
import Tour from '../../model/tour'

interface IUser {
    id: number
    username: string
    email: string
    password: string
    role: string
}

interface DataType {
    key: React.Key
    invoiceId: number
    method: string
    timeCreate: string
    totalPrice: number
    paymentMethod: string
    wasPay: boolean
    profile: Profile
    user: IUser
    cartItems: CartItem[]
    tour: Tour
    soLuongVeDaDat: number
}

function Order() {
    const queryClient = useQueryClient()
    const invoicesQuery = useQuery(['admin-invoices'], getInvoices)

    const deleteInvoiceMutation = useMutation(deleteInvoice, {
        onSuccess: (data) => {
            if (data.status === 200) message.success('Invoice deleted')
            else message.error('Something went wrong')
            queryClient.invalidateQueries(['admin-invoices'])
        },
    })

    const data: DataType[] = invoicesQuery.isLoading
        ? []
        : invoicesQuery.data.map((x: DataType) => ({
            ...x,
            key: x.invoiceId,
        }))

    const columns: ColumnsType<DataType> = useMemo(
        () => [
            {
                title: 'username',
                dataIndex: 'username',
                key: 'username',
                render: (_, record) => <div>{record.user.username}</div>,
            },
            {
                title: 'Hình Thức Thanh Toán',
                dataIndex: 'paymentMethod',
                key: 'paymentMethod',
            },
            {
                title: 'Thanh Toán Lúc',
                dataIndex: 'timeCreate',
                key: 'timeCreate',
            },
            {
                title: 'Tổng Cộng',
                dataIndex: 'totalPrice',
                key: 'totalPrice',
                render: (value) => formatCurrency(value),
            },
            {
                title: 'Số Lượng Vé Mua',
                dataIndex: 'soLuongVeDaDat',
                key: 'soLuongVeDaDat',
                // render: (value) => formatCurrency(value),
            },
            {
                title: 'Trạng Thái Thanh Toán',
                dataIndex: 'status',
                key: 'status',
                render: (value: boolean) =>
                    value ? (
                        <Tag color={'volcano'}>Đang Chờ</Tag>
                    ) : (
                        <Tag color={'geekblue'}>Đã Thanh Toán</Tag>
                    ),
            },
            {
                title: 'Action',
                dataIndex: '',
                key: 'x',
                render: (_, record) => (
                    <Popconfirm
                        title='This action can not be undone!'
                        onConfirm={() =>
                            deleteInvoiceMutation.mutate(record.invoiceId)
                        }
                    >
                        <Delete />
                    </Popconfirm>
                ),
            },
        ],
        []
    )
    return (
        <Wrapper title='Hóa Đơn' description={`Manage all invoices`}>
            <Table
                columns={columns}
                loading={invoicesQuery.isLoading}
                expandable={{
                    expandedRowRender: (record, index) => (
                        <Expand
                            profile={record.profile}
                            record={record.cartItems}
                            tour={record.tour}
                        />
                    ),
                    // rowExpandable: (record) => record.name !== 'Not Expandable',
                }}
                dataSource={data}
            />
        </Wrapper>
    )
}

export default Order
