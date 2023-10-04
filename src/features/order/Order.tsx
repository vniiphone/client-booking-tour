import { useMutation, useQuery, useQueryClient } from '@tanstack/react-query'
import { message, Popconfirm, Table, Tag } from 'antd'
import { ColumnsType } from 'antd/es/table'
import React, { useMemo } from 'react'
import { Delete } from '../../components/__atom/ActionIcon'
import Wrapper from '../../components/__atom/FormWrapper'
import Address from '../../model/address'
import CartItem from '../../model/cart-item'
import Product from '../../model/tour'
import formatCurrency from '../../utils/formatCurrency'
import Expand from './components/Expand'
import { deleteInvoice, getInvoices } from './services'

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
    wasPay: boolean
    address: Address
    user: IUser
    cartItems: CartItem[]
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
                title: 'User name',
                dataIndex: 'username',
                key: 'username',
                render: (_, record) => <div>{record.user.username}</div>,
            },
            {
                title: 'Payment confirm at',
                dataIndex: 'timeCreate',
                key: 'timeCreate',
            },
            {
                title: 'Total',
                dataIndex: 'totalPrice',
                key: 'totalPrice',
                render: (value) => formatCurrency(value),
            },
            {
                title: 'Status',
                dataIndex: 'status',
                key: 'status',
                render: (value: boolean) =>
                    value ? (
                        <Tag color={'volcano'}>PENDING</Tag>
                    ) : (
                        <Tag color={'geekblue'}>PAID</Tag>
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
        <Wrapper title='Invoices' description={`Manage all invoices`}>
            <Table
                columns={columns}
                loading={invoicesQuery.isLoading}
                expandable={{
                    expandedRowRender: (record, index) => (
                        <Expand
                            address={record.address}
                            record={record.cartItems}
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
