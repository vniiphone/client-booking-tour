import { Link } from 'react-router-dom'
import { useState } from 'react'
import { Select, Breadcrumb, Spin } from 'antd'
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { faBorderAll, faTableCells } from '@fortawesome/free-solid-svg-icons'
import { useQuery } from '@tanstack/react-query'

import Item from '../../components/__combined/ProductItem'
import { getTours } from '../../services/tourService'
import Tour from '../../model/tour'

import classNames from 'classnames/bind'
import styles from './List.module.scss'
import Pagination from '../../components/__layout/Pagination'
const cl = classNames.bind(styles)

function List() {
    const [gridValue, setGridValue] = useState([3, 4, 6])
    const [filter, setFilter] = useState({ page: 0, sortBy: '' })

    const toursQuery = useQuery(['tours', filter], () =>
    getTours(filter)
    )

    const onFetchNewData = (page: number) => {
        setFilter((prev) => ({ ...prev, page }))
    }

    const handleChangeOrder = (value: string) => {
        setFilter((prev) => ({ ...prev, sortBy: value }))
    }

    return (
        <div className={cl('wrapper')}>
            <Breadcrumb>
                <Breadcrumb.Item>
                    <Link to='/'>Trang Chủ</Link>
                </Breadcrumb.Item>
                <Breadcrumb.Item>
                    <Link to='/tour'>Chuyến ĐI</Link>
                </Breadcrumb.Item>
            </Breadcrumb>
            <div className={cl('heading')}>
                Tours ({toursQuery?.data?.totalElements || 0})
            </div>
            <div className={cl('filter')}>
                <div className={cl('sort')}>
                    <span> SORT BY:</span>
                    <Select value={filter.sortBy} onChange={handleChangeOrder}>
                        <Select.Option value={''}>Mặc địnhh</Select.Option>
                        <Select.Option value='price'>Giá</Select.Option>
                        <Select.Option value='name'>Tên</Select.Option>
                    </Select>
                </div>
                <div className={cl('grid')}>
                    <FontAwesomeIcon
                        onClick={() => setGridValue([4, 6, 12])}
                        icon={faBorderAll}
                        className={cl('grid-icon', {
                            active: gridValue[0] === 4,
                        })}
                    />
                    <FontAwesomeIcon
                        onClick={() => setGridValue([3, 4, 6])}
                        icon={faTableCells}
                        className={cl('grid-icon', {
                            active: gridValue[0] === 3,
                        })}
                    />
                </div>
            </div>
            <div className={cl('list')}>
                <div className='row'>
                    {toursQuery.isLoading ? (
                        <Spin />
                    ) : (
                        toursQuery.data.content.map((x: Tour) => (
                            <div
                                key={x.id}
                                className={`col l-${gridValue[0]} m-${gridValue[1]} c-${gridValue[2]}`}
                            >
                                <div className={cl('item')}>
                                    <Item {...x} />
                                </div>
                            </div>
                        ))
                    )}
                    {toursQuery?.data && (
                        <Pagination
                            page={toursQuery.data.number}
                            pages={toursQuery.data.totalPages}
                            offset={2}
                            onFetchNewData={onFetchNewData}
                        ></Pagination>
                    )}
                </div>
            </div>
        </div>
    )
}

export default List
