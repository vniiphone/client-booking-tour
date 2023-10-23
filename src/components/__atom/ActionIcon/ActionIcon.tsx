import { EditOutlined, DeleteOutlined, FileAddOutlined } from '@ant-design/icons'
import { Popconfirm } from 'antd'
import { Link } from 'react-router-dom'

import classNames from 'classnames/bind'
import styles from './ActionIcon.module.scss'
const cl = classNames.bind(styles)

interface Props {
    onClick?: Function
    to?: string
}

const Add = ({ onClick = () => { }, to }: Props) => {
    return (
        <Link
            to={to || '/'}
            onClick={() => onClick()}
            className={cl('wrapper', 'add')}
        >
            <FileAddOutlined className={cl('icon')} />
        </Link>
    )
}

const Edit = ({ onClick = () => { }, to }: Props) => {
    return (
        <Link
            to={to || '/'}
            onClick={() => onClick()}
            className={cl('wrapper', 'edit')}
        >
            <EditOutlined className={cl('icon')} />
        </Link>
    )
}

const Delete = ({ onClick = () => { } }: Props) => {
    return (
        <Popconfirm title='Are you sure?' onConfirm={() => onClick()}>
            <div className={cl('wrapper', 'delete')}>
                <DeleteOutlined className={cl('icon')} />
            </div>
        </Popconfirm>
    )
}



export { Edit, Delete, Add }
