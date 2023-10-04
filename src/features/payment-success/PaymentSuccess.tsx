import { Link } from 'react-router-dom'
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { faCircleCheck } from '@fortawesome/free-regular-svg-icons'

import classNames from 'classnames/bind'
import styles from './PaymentSuccess.module.scss'
import Button from '../../components/__atom/Button'
const cl = classNames.bind(styles)

function PaymentSuccess() {
    return (
        <div className={cl('wrapper')}>
            <FontAwesomeIcon icon={faCircleCheck} className={cl('check')} />
            <div className={cl('title')}>Thank You!</div>
            <div className={cl('sub')}>Payment done successfully</div>
            <Button to='/' type='primary' size='large'>
                Home
            </Button>
        </div>
    )
}

export default PaymentSuccess
