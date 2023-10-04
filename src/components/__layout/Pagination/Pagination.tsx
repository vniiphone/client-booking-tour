import React from 'react'

import classNames from 'classnames/bind'
import styles from './Pagination.module.scss'
import {
    DoubleLeftOutlined,
    DoubleRightOutlined,
    LeftOutlined,
    RightOutlined,
} from '@ant-design/icons'
const cl = classNames.bind(styles)

interface Props {
    page: number
    offset: number
    pages: number
    onFetchNewData: Function
}

function Pagination({
    page,
    offset = 2,
    pages,
    onFetchNewData = () => {},
}: Props) {

    return (
        <div className={cl('wrapper')}>
            <ul className={cl('list')}>
                <li
                    onClick={() => onFetchNewData(0)}
                    className={cl('item', { disabled: page === 0 })}
                >
                    <span className={cl('link')}>
                        <DoubleLeftOutlined />
                    </span>
                </li>
                <li
                    onClick={() => onFetchNewData(page - 1)}
                    className={cl('item', { disabled: page === 0 })}
                >
                    <span className={cl('link')}>
                        <LeftOutlined />
                    </span>
                </li>
                {new Array(pages).fill(0).map((item, index) => {
                    const calOffset = Math.abs(page - index - 1)
                    if (calOffset <= offset)
                        return (
                            <li
                                onClick={() => onFetchNewData(index)}
                                key={index}
                                className={cl('item', {
                                    active: page === index,
                                })}
                            >
                                <span className={cl('link')}>{index + 1}</span>
                            </li>
                        )
                    if (calOffset === offset + 1)
                        return (
                            <li key={index} className={cl('item')}>
                                <span className={cl('link')}>...</span>
                            </li>
                        )
                })}
                <li
                    onClick={() => onFetchNewData(page + 1)}
                    className={cl('item', { disabled: page === pages - 1 })}
                >
                    <span className={cl('link')}>
                        <RightOutlined />
                    </span>
                </li>
                <li
                    onClick={() => onFetchNewData(pages - 1)}
                    className={cl('item', { disabled: page === pages - 1 })}
                >
                    <span className={cl('link')}>
                        <DoubleRightOutlined />
                    </span>
                </li>
            </ul>
        </div>
    )
}

export default Pagination
