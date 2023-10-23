import React from 'react'

import classNames from 'classnames/bind'
import styles from '../Order.module.scss'
import Product from '../../../model/tour'
import CartItem from '../../../model/cart-item'
import Item from './Item'
import Address from '../../../model/address'
import Profile from '../../../model/profile'
import Tour from '../../../model/tour'

const cl = classNames.bind(styles)

function Expand({ record, profile, tour }: { record: CartItem[]; profile: Profile; tour: Tour }) {
    return (
        <div className={cl('wrapper')}>
            <div className={cl('row')}>
                <span className={cl('label')}>Họ và Tên:</span>
                <span
                    className={cl('value')}
                >{profile.lastName} {profile.name}</span>
            </div>
            <div className={cl('row')}>
                <span className={cl('label')}>Số Định Danh:</span>
                <span
                    className={cl('value')}
                >{profile.soCCCD}</span>
            </div>
            <div className={cl('row')}>
                <span className={cl('label')}>Tuổi:</span>
                <span
                    className={cl('value')}
                >{profile.age}</span>
            </div>
            <div className={cl('row')}>
                <span className={cl('label')}>Số Điện Thoại:</span>
                <span
                    className={cl('value')}
                >{profile.phoneNumber}</span>
            </div>

            <div className={cl('row')}>
                <span className={cl('label')}>Địa Chỉ:</span>
                <span
                    className={cl('value')}
                >{`${profile.diaChiNha},${profile.phuongXa} ${profile.huyenThi}, ${profile.tinhThanh}`}</span>

            </div>
            <div className={cl('row')}>
                <span className={cl('label')}>Tên Tour:</span>
                <span
                    className={cl('value')}
                >{tour.name}</span>
                <span className={cl('label')}>Ngày khởi hành:</span>
                <span
                    className={cl('value')}
                >{tour.ngayGioXuatPhat}</span>
                <span className={cl('label')}>Nơi khởi hành:</span>
                <span
                    className={cl('value')}
                >{tour.noiKhoiHanh}</span>
            </div>


            {/* {record.map((x) => (
                <Item key={x.id} item={x} />
            ))} */}
        </div>
    )
}

export default Expand
