import { Link } from 'react-router-dom'
import { useState } from 'react'
import { Select, Breadcrumb, Spin } from 'antd'
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { faBorderAll, faTableCells } from '@fortawesome/free-solid-svg-icons'
import { useQuery } from '@tanstack/react-query'

import Item from '../../components/__combined/ProductItem'
import { getProducts } from '../../services'
import Product from '../../model/tour'

import classNames from 'classnames/bind'
import styles from './List.module.scss'
import Pagination from '../../components/__layout/Pagination'
const cl = classNames.bind(styles)

function List() {
    const [gridValue, setGridValue] = useState([3, 4, 6])
    const [filter, setFilter] = useState({ page: 0, sortBy: '' })

    const productsQuery = useQuery(['products', filter], () =>
        getProducts(filter)
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
                    <Link to='/'>Home</Link>
                </Breadcrumb.Item>
                <Breadcrumb.Item>
                    <Link to='/product'>Product</Link>
                </Breadcrumb.Item>
            </Breadcrumb>
            <div className={cl('heading')}>
                Products ({productsQuery?.data?.totalElements || 0})
            </div>
            <div className={cl('filter')}>
                <div className={cl('sort')}>
                    <span> SORT BY:</span>
                    <Select value={filter.sortBy} onChange={handleChangeOrder}>
                        <Select.Option value={''}>Default</Select.Option>
                        <Select.Option value='price'>Price</Select.Option>
                        <Select.Option value='name'>Name</Select.Option>
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
                    {productsQuery.isLoading ? (
                        <Spin />
                    ) : (
                        productsQuery.data.content.map((x: Product) => (
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
                    {productsQuery?.data && (
                        <Pagination
                            page={productsQuery.data.number}
                            pages={productsQuery.data.totalPages}
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
