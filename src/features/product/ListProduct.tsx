import { Image, Table } from 'antd'
import type { ColumnsType } from 'antd/es/table'
import { useQuery, useMutation } from '@tanstack/react-query'
import dayjs from 'dayjs'
import Button from '../../components/__atom/Button'
import Wrapper from '../../components/__atom/FormWrapper'
import { Edit, Delete, Add } from '../../components/__atom/ActionIcon'

import productPlaceholder from '../../assets/img/components/product_placeholder.png'

import { deleteTour, showTour } from './services'
import { getTours } from '../../services'
import Pagination from '../../components/__layout/Pagination'
import { useState } from 'react'

interface DataType {
    key: string
    id: number
    name: string
    giaThamKhao: number
    soLuongVe: number
    ngayGioXuatPhat: string
    ngayVe: string
    noiKhoiHanh: string
    visible: boolean
    imageUrls: Array<string>
}

function ListProduct() {

    const [page, setPage] = useState(0)
    const tourQuery = useQuery(['admin-products', page], () =>
        getTours({ page })
    )

    const deleteTourMuatation = useMutation(deleteTour, {
        onSuccess: (data) => {
            // console.log(data)
            tourQuery.refetch()
        },
    })
    const showTourMutation = useMutation(showTour, {
        onSuccess: (data) => {
            // console.log(data)
            tourQuery.refetch()
        },
    });


    const onFetchNewData = (page: number) => {
        setPage(page)
    }

    const columns: ColumnsType<DataType> = [
        {
            title: 'ID',
            dataIndex: 'id',
            key: 'id',
        },
        {
            title: 'Tên Tour',
            dataIndex: 'name',
            key: 'name',
        },
        // {
        //     title: 'Mã Tour',
        //     dataIndex: 'tourCode',
        //     key: 'tourCode',
        // },

        {
            title: 'Giá Tham Khảo',
            dataIndex: 'giaThamKhao',
            key: 'giaThamKhao',
            render: (text) => {
                {
                    return text.toLocaleString("vi-VN", {
                        style: "currency",
                        currency: "VND",
                        minimumFractionDigits: 0,
                    })
                }
            },
        },
        {
            title: 'Số Lượng Vé',
            dataIndex: 'soLuongVe',
            key: 'soLuongVe',
            responsive: ['lg'],
        }, {
            title: 'Nơi Khởi Hành',
            dataIndex: 'noiKhoiHanh',
            key: 'noiKhoiHanh',
            responsive: ['lg'],
        },
        {
            title: 'Ngày Giờ Xuất Phát',
            dataIndex: 'ngayGioXuatPhat',
            key: 'ngayGioXuatPhat',
            responsive: ['lg'],

        }, {
            title: 'Ngày Về',
            dataIndex: 'ngayVe',
            key: 'ngayVe',
            responsive: ['lg'],
        },
        {
            title: 'Visible',
            dataIndex: 'visible',
            key: 'visible',
            render: (text, record) => (
                <span>
                    <span>
                        {text ? (
                            <button onClick={() => deleteTourMuatation.mutate({ id: record.id })}>Đang Hiển Thị</button>
                        ) : (
                            <button onClick={() => showTourMutation.mutate({ id: record.id })}>Đang Ẩn</button>
                        )}
                    </span>
                </span>
            ),
        },
        {
            title: 'Action',
            dataIndex: undefined,
            key: 'action',
            render: (_, record) => (
                <div className='d-flex flex-align-center gap-3'>
                    <Add to={`/admin/lichtrinhtour/list/${record.id}`}></Add>
                    <Edit to={`/admin/tour/${record.id}`}></Edit>
                    {/* <Delete
                        onClick={() =>
                            deleteProductMuatation.mutate({ id: record.id })
                        }
                    /> */}
                </div>
            ),
        },
    ]

    const data: DataType[] = tourQuery.isLoading
        ? []
        : tourQuery.data.content.map((x: DataType) => ({
            ...x,
            key: x.id,
        }))

    return (
        <Wrapper title='Tour' description={`Quản Lí Chuyến Đi`}>
            <Button
                type='primary'
                to='/admin/tour/create'
                className='mt-4 mb-4'
            >
                Thêm Tour Mới
            </Button>
            <Table
                columns={columns}
                loading={tourQuery.isLoading}
                dataSource={data}
                pagination={false}
            />
            {tourQuery?.data && (
                <Pagination
                    page={tourQuery.data.number}
                    pages={tourQuery.data.totalPages}
                    offset={2}
                    onFetchNewData={onFetchNewData}
                ></Pagination>
            )}
        </Wrapper>
    )
}

export default ListProduct
