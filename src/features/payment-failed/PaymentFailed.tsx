import { Link } from 'react-router-dom'

import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { faCircleXmark } from '@fortawesome/free-regular-svg-icons'

import classNames from 'classnames/bind'
import styles from './PaymentFailed.module.scss'
import Button from '../../components/__atom/Button'
const cl = classNames.bind(styles)

function PaymentFailed() {
    return (
        <div className={cl('wrapper')}>
            <FontAwesomeIcon icon={faCircleXmark} className={cl('xmark')} />
            <div className={cl('title')}>Transaction Failed</div>
            <div className={cl('sub')}>Unfortunately payment was rejected</div>
            <Button to='/' type='outline' size='large'>
                Home
            </Button>
        </div>
    )
}

export default PaymentFailed
