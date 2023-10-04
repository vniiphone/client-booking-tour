import { Image, Table } from 'antd'
import type { ColumnsType } from 'antd/es/table'
import { useQuery, useMutation } from '@tanstack/react-query'
import dayjs from 'dayjs'
import FormatMoney from "format-money-js"
import Button from '../../components/__atom/Button'
import Wrapper from '../../components/__atom/FormWrapper'
import { Edit, Delete } from '../../components/__atom/ActionIcon'
import productPlaceholder from '../../assets/img/components/product_placeholder.png'

import { deleteProduct } from './services'
import { getProducts } from '../../services'
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
    visible : boolean
    imageUrls: Array<string>
}
function timestampToDateTime(timestamp: number): string {
    const dateTime = dayjs.unix(timestamp); // Chuyển đổi timestamp thành DateTime
    return dateTime.format('DD-MM-YYYY HH:mm'); // Định dạng kiểu DateTime
}
function timestampToDate(timestamp: number): string {
    const date = dayjs.unix(timestamp); // Chuyển đổi timestamp thành DateTime
    return date.format('DD-MM-YYYY'); // Định dạng kiểu DateTime
}
function ListProduct() {
    const { FormatMoney } = require('format-money-js');

    const fm = new FormatMoney({
        decimals: 2
      });
    const [page, setPage] = useState(0)
    const productsQuery = useQuery(['admin-products', page], () =>
        getProducts({ page })
    )
    const deleteProductMuatation = useMutation(deleteProduct, {
        onSuccess: (data) => {
            console.log(data)
            productsQuery.refetch()
        },
    })

    const onFetchNewData = (page: number) => {
        setPage(page)
    }

    const columns: ColumnsType<DataType> = [
        {
            title: 'ID',
            dataIndex: 'id',
            key: 'id',
        },
        // {
        //     title: 'Ảnh Đại Diện',
        //     dataIndex: '',
        //     key: 'image',
        //     render: (_, record) => (
        //         <Image
        //             width={100}
        //             height={100}
        //             src={
        //                 record.imageUrls[0] ||
        //                 'https://product.hstatic.net/1000026716/product/ban-phim-co-akko-pc75b-plus-v2-black-gold-11_3d105b6dfbe2492284562002c6f995f5.jpg'
        //             }
        //             fallback={productPlaceholder}
        //         />
        //     ),
        //     width: 132,
        //     responsive: ['md'],
        // },
        {
            title: 'Tên Tour',
            dataIndex: 'name',
            key: 'name',
        },
        {
            title: 'Giá Tham Khảo',
            dataIndex: 'giaThamKhao',
            key: 'giaThamKhao',
            render: (text) => {
                // Chuyển đổi timestamp thành kiểu DateTime và định dạng
                const money = fm.from(text, { symbol: 'VND' });
                return money;
              },
        },
        {
            title: 'Số Lượng Vé',
            dataIndex: 'soLuongVe',
            key: 'soLuongVe',
            responsive: ['lg'],
        },{
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
            render: (text) => {
                // Chuyển đổi timestamp thành kiểu DateTime và định dạng
                const dateTime = dayjs.unix(text);
                return dateTime.format('DD-MM-YYYY HH:mm');
              },

        },     {
            title: 'Ngày Về',
            dataIndex: 'ngayVe',
            key: 'ngayVe',
            responsive: ['lg'],
            render: (text) => {
                // Chuyển đổi timestamp thành kiểu DateTime và định dạng
                const dateTime = dayjs.unix(text);
                return dateTime.format('DD-MM-YYYY');
              },

        },
        {
            title: 'Action',
            dataIndex: undefined,
            key: 'action',
            render: (_, record) => (
                <div className='d-flex flex-align-center gap-3'>
                    <Edit to={`/admin/tour/${record.id}`}></Edit>
                    <Delete
                        onClick={() =>
                            deleteProductMuatation.mutate({ id: record.id })
                        }
                    />
                </div>
            ),
        },
    ]

    const data: DataType[] = productsQuery.isLoading
        ? []
        : productsQuery.data.content.map((x: DataType) => ({
              ...x,
              key: x.id,
          }))

    return (
        <Wrapper title='Products' description={`Manage all products`}>
            <Button
                type='primary'
                to='/admin/product/create'
                className='mt-4 mb-4'
            >
                Add new product
            </Button>
            <Table
                columns={columns}
                loading={productsQuery.isLoading}
                dataSource={data}
                pagination={false}
            />
            {productsQuery?.data && (
                <Pagination
                    page={productsQuery.data.number}
                    pages={productsQuery.data.totalPages}
                    offset={2}
                    onFetchNewData={onFetchNewData}
                ></Pagination>
            )}
        </Wrapper>
    )
}

export default ListProduct
