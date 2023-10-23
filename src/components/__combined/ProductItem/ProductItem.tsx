import { Link, useNavigate } from 'react-router-dom'
import { useMutation, useQueryClient } from '@tanstack/react-query'

import { useAppSelector } from '../../../hooks'
import { addToCart } from '../../../services'
import Button from '../../../components/__atom/Button'
import image4 from "../../../assets/img/global/LOGO.png"
import classNames from 'classnames/bind'
import styles from './ProductItem.module.scss'
import { message } from 'antd'
const cl = classNames.bind(styles)

interface Props {
    id: number
    name: string
    tomTat: string
    giaThamKhao: number
    soLuongVe: number
    ngayGioXuatPhat: string
    ngayVe: string
    noiKhoiHanh: string
    visible: boolean
    loaiTour_id: number
    imageUrls: string
    imagePublicIds: string
    loaiTour: {}
}

function ProductItem({ id, name, giaThamKhao, imageUrls, soLuongVe }: Props) {
    const queryClient = useQueryClient()
    const navigate = useNavigate()
    const user = useAppSelector((state) => state.auth)
    const addToCartMutation = useMutation(addToCart, {
        onSuccess: (data) => {
            if (data.status === 200 || data.status === 201)
                message.success('Thêm Thành công')
            else message.error('Tour hết vé')
            queryClient.invalidateQueries(['cart'])
        },
    })

    const handleAddToCart = (e: Event) => {
        e.preventDefault()
        e.stopPropagation()
        if (!user.hasOwnProperty('id')) navigate('/login')
        else
            addToCartMutation.mutate({
                tour_id: id,
                quantity: 1,
                user_id: user.id,
            })
    }

    return (
        <Link to={`/tour/${id}`} className={cl('item-wrapper')}>
            <img
                src={
                    imageUrls || image4
                }
                alt=''
                className={cl('item-img')}
            />
            <div className={cl('item-info')}>
                <div className={cl('item-name')}>{name}</div>
                <div className={cl('item-price')}>
                    {giaThamKhao.toLocaleString(
                        'vi-VN',
                        {
                            style: 'currency',
                            currency: 'VND',
                            minimumFractionDigits: 0,
                        }
                    )}
                </div>
                <Button
                    onClick={handleAddToCart}
                    className={cl('item-add')}
                    type='primary'
                    disabled={soLuongVe === 0}
                >
                    Thêm vào Yêu Thích
                </Button>
            </div>
            {/* <div className={cl('category')}>{category.name}</div> */}
        </Link>
    )
}

export default ProductItem
