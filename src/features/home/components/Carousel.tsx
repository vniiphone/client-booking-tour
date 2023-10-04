import { Carousel } from 'antd'

import banner1 from '../../../assets/img/global/banner1.jpg'
import banner2 from '../../../assets/img/global/banner2.jpg'

import classNames from 'classnames/bind'
import styles from '../Home.module.scss'
const cl = classNames.bind(styles)

function CarouselComp() {
    return (
        <Carousel className={cl('carousel')} autoplay>
            <div className={cl('carousel-item')}>
                <img src={banner1} alt='' className={cl('banner')} />
                <div className={cl('carousel-content')}>
                    <div>Your world</div>
                    <div>Your choices</div>
                </div>
            </div>
            <div className={cl('carousel-item')}>
                <img src={banner2} alt='' className={cl('banner')} />
                <div className={cl('carousel-content')}>
                    <div>Enjoy</div>
                    <div>Immersive experiences</div>
                </div>
            </div>
        </Carousel>
    )
}

export default CarouselComp
