import image from '../../assets/img/components/403.jpg'
import classNames from 'classnames/bind'
import styles from './Unauthorized.module.scss'
import Button from '../../components/__atom/Button'
const cl = classNames.bind(styles)

function Unauthorized() {
    return (
        <div className={cl('wrapper')}>
            <img src={image} alt='' className={cl('img')} />
            <Button to='/' size='large' type='primary'>
                Return home
            </Button>
        </div>
    )
}

export default Unauthorized
