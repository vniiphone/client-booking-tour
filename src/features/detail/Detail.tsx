import { useState } from 'react'
import { Link, useParams, useNavigate } from 'react-router-dom'
import { Breadcrumb, Image, InputNumber, message, Spin } from 'antd'
import { useQuery, useMutation, useQueryClient } from '@tanstack/react-query'
import dayjs from 'dayjs'
import { useAppSelector } from '../../hooks'
import Button from '../../components/__atom/Button'
import { getTours, getTourById, getLichTrinhTourById } from '../../services'
import { addToCart } from '../../services'
import { Carousel } from 'antd'
// import { Carousel } from 'react-responsive-carousel'
import classNames from 'classnames/bind'
import styles from './Detail.module.scss'
import User from '../../model/user'
import DiemDen from '../../model/diemDen'
import KhachSan from '../../model/khachSan'
const cl = classNames.bind(styles)

interface Props {
    id: number
}
// interface LichTrinh {
//     // id: number
//     phuongTien: string
//     sttLichTrinh: number
//     tenLichTrinh: string
//     ghiChu: string
//     lichTrinhChiTiet: string
//     diemDen: Array<DiemDen>
//     khachSan: KhachSan
// }

function Detail() {
    const queryClient = useQueryClient()
    const [quantity, setQuantity] = useState(1)
    const navigate = useNavigate()
    const user: User = useAppSelector((state) => state.auth)
    const { id } = useParams()
    const tourQuery = useQuery(['tour'], () => getTourById({ id }))
    const lichTrinhTourQuery = useQuery(['lichTrinhTour'], () => getLichTrinhTourById({ id }))

    console.log(lichTrinhTourQuery.data)
    console.log(tourQuery.data)

    const addToCartMutation = useMutation(addToCart, {
        onSuccess: (data) => {
            if (data.status === 200 || data.status === 201)
                message.success('Added to cart')
            else message.error('Product is out of stock')
            queryClient.invalidateQueries(['cart'])
        },
    })

    interface LichTrinh {
        // id: number
        phuongTien: string
        sttLichTrinh: number
        tenLichTrinh: string
        ghiChu: string
        lichTrinhChiTiet: string
        diemDen: Array<DiemDen>
        khachSan: KhachSan
    }

    const handleAddToCart = (e: Event) => {
        e.preventDefault()
        e.stopPropagation()
        if (!user.hasOwnProperty('id') || !id) navigate('/login')
        else
            addToCartMutation.mutate({
                tour_id: parseInt(id),
                quantity: quantity,
                user_id: user.id,
            })
    }
    const imageUrls = tourQuery.data?.imageUrls || [];

    const itemImage = () => {


    }

    return (
        <div className={cl('wrapper')}>
            <Breadcrumb>
                <Breadcrumb.Item>
                    <Link to='/'>Trang Chủ</Link>
                </Breadcrumb.Item>
                <Breadcrumb.Item>
                    <Link to='/tour'>Chuyến Đi</Link>
                </Breadcrumb.Item>
                {tourQuery?.data && (
                    <Breadcrumb.Item>
                        <Link to={`/tour/${tourQuery.data.id}`}>
                            {tourQuery.data.name}
                        </Link>
                    </Breadcrumb.Item>
                )}
            </Breadcrumb>
            <div className={cl('main')}>
                {tourQuery.isLoading ? (
                    <Spin />
                ) : (
                    <>
                        <div className={cl('image-wrapper')}>
                            {imageUrls.length > 0 && ( // Kiểm tra xem mảng có hình ảnh không
                                <Carousel
                                    className={cl('carousel')} effect="fade" autoplay>
                                    {imageUrls.map((imageUrl: string, index: number) => (
                                        <div className={cl('carousel-item')} key={index}>
                                            <img className={cl('image')} src={imageUrl} alt="Không tải được" />
                                        </div>
                                    ))}
                                </Carousel>
                            )}
                            {/* </div> */}
                            {/* <Image
                                className={cl('image')}
                                src={tourQuery.data.imageUrls[1]}
                                fallback='https://product.hstatic.net/1000026716/product/ban-phim-co-akko-pc75b-plus-v2-black-gold-11_3d105b6dfbe2492284562002c6f995f5.jpg'
                            ></Image> */}
                        </div> <div className={cl('info')}>
                            <div className={cl('name')}>
                                {tourQuery.data.name}
                            </div>
                            <div className={cl('soLuongVe')}>
                                Số lượng vé: {tourQuery.data.soLuongVe}
                            </div>
                            <div className={cl('noiKhoiHanh')}>
                                Nơi khởi hành: {tourQuery.data.noiKhoiHanh}
                            </div>
                            <div className={cl('ngayGioXuatPhat')}>
                                Ngày giờ xuất phát:{' '}
                                {dayjs
                                    .unix(tourQuery.data.ngayGioXuatPhat)
                                    .format('DD-MM-YYYY HH:mm')}
                            </div>

                            <div className={cl('ngayVe')}>
                                Ngày về:{' '}
                                {dayjs
                                    .unix(tourQuery.data.ngayVe)
                                    .format('DD-MM-YYYY')}
                            </div>

                            <div className={cl('price')}>
                                {tourQuery.data.giaThamKhao.toLocaleString(
                                    'vi-VN',
                                    {
                                        style: 'currency',
                                        currency: 'VND',
                                        minimumFractionDigits: 0,
                                    }
                                )}
                            </div>
                            <div className={cl('text')}>
                                {tourQuery.data.tomTat}
                            </div>
                            <div className={cl('cart')}>
                                <InputNumber
                                    onChange={(value) => setQuantity(value)}
                                    value={quantity}
                                    size='large'
                                    max={tourQuery.data.soLuongVe}
                                    min={1}
                                    defaultValue={1}
                                />
                                <Button
                                    className={cl('button')}
                                    size='large'
                                    type='primary'
                                    onClick={handleAddToCart}
                                    disabled={tourQuery.data.soLuongVe === 0}
                                >
                                    Add to cart
                                </Button>
                            </div>
                        </div>
                    </>
                )}
            </div>

            <div className="lichTrinhTour"

            >
                {lichTrinhTourQuery.isLoading ? (
                    <Spin />
                ) : (
                    <div className={cl('info')}>
                        {lichTrinhTourQuery != null && lichTrinhTourQuery.data.map((lichTrinh: LichTrinh, index: any) => (
                            <>
                                <div className="content" key={index}>
                                    <div className={cl('textHeader')} >
                                        <h2>Ngày thứ  {lichTrinh.sttLichTrinh}</h2>
                                        {/* Thêm các thông tin khác tương tự */}
                                    </div>
                                    <div className={cl('textContent')} >
                                        <p> Tên Lịch Trình: {lichTrinh.tenLichTrinh}</p>
                                        {/* Thêm các thông tin khác tương tự */}
                                    </div>
                                    <div className={cl('textContent')}>
                                        <p>Ghi Chú: {lichTrinh.ghiChu}</p>
                                    </div>
                                    <div className={cl('textContent')}>
                                        <p>Di Chuyển: {lichTrinh.phuongTien}</p>
                                    </div>
                                    <div className={cl('textContent')}>
                                        <p>Chi Tiết: {lichTrinh.lichTrinhChiTiet}</p>
                                    </div>
                                    {lichTrinh.diemDen.length > 0 &&
                                        lichTrinh.diemDen.map((diemDen: DiemDen, index: any) => (
                                            <div className={cl('childOfContent')}>
                                                <div className={cl('textHeaderChild')}>
                                                    <h3>Điểm Tham Quan: {diemDen.name}</h3>
                                                </div>
                                                <div className={cl('textContent')}>
                                                    <h3>Giá tham khảo vé tham quan: <> </>
                                                        {diemDen.giaVeThamQuan.toLocaleString(
                                                            'vi-VN',
                                                            {
                                                                style: 'currency',
                                                                currency: 'VND',
                                                                minimumFractionDigits: 0,
                                                            }
                                                        )}
                                                    </h3>
                                                </div>
                                                <div className={cl('textContent')}>
                                                    <h3>Địa Chỉ: {diemDen.diaChi}</h3>
                                                </div>
                                                <div className={cl('textContent')}>
                                                    <h3>Giới thiệu: {diemDen.noiDung}</h3>
                                                </div>
                                            </div>
                                        ))}

                                    {lichTrinh.khachSan != null &&
                                        <div className={cl('childOfContent')}>
                                            <div className={cl('textHeaderChild')}>
                                                <h3>Khách Sạn: {lichTrinh.khachSan.name}</h3>
                                            </div>
                                            <div className={cl('textContent')}>
                                                <h3>Giá tham khảo cho giường đơn: <> </>

                                                    {lichTrinh.khachSan.giaPhong.toLocaleString(
                                                        'vi-VN',
                                                        {
                                                            style: 'currency',
                                                            currency: 'VND',
                                                            minimumFractionDigits: 0,
                                                        }
                                                    )}/Đêm
                                                </h3>
                                            </div>
                                            <div className={cl('textContent')}>
                                                <h3>Địa Chỉ Khách Sạn: {lichTrinh.khachSan.diaChiKsan}</h3>
                                            </div>
                                            <div className={cl('textContent')}>
                                                <h3>Liên Hệ Khách Sạn: {lichTrinh.khachSan.phone}</h3>
                                            </div>
                                        </div>
                                    }

                                </div>
                            </>

                            // <div className={cl('khachSan')}>
                            //         <p>Khách Sạn:</p>
                            //         <p>ID: {lichTrinh.khachSan.id}</p>
                            //         <p>Name: {lichTrinh.khachSan.name}</p>
                            //         {/* Thêm các thông tin khác về khách sạn */}
                            //     </div>

                        ))}

                    </div>


                )}

            </div>
        </div>
    )
}

export default Detail
