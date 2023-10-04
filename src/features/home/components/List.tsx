import { useQuery } from '@tanstack/react-query'

import { getProducts } from '../../../services'

import Item from '../../../components/__combined/ProductItem'
import Product from '../../../model/tour'

import classNames from 'classnames/bind'
import styles from '../Home.module.scss'
import { Spin } from 'antd'
import Button from '../../../components/__atom/Button'
const cl = classNames.bind(styles)

function List() {
    const productsQuery = useQuery(['user-products'], () =>
        getProducts({ page: 0 })
    )
    return (
        <div className='grid wide'>
            <div className={cl('list-wrapper')}>
                <div className={cl('list-heading')}>TENDING</div>
                <div className={cl('list-subheading')}>
                    TOP VIEW IN THIS WEEK
                </div>
                <div className='row'>
                    {productsQuery.isLoading ? (
                        <Spin />
                    ) : (
                        productsQuery.data.content.map((item: Product) => (
                            <div key={item.id} className='col l-3 m-4 c-6'>
                                <Item {...item} />
                            </div>
                        ))
                    )}
                </div>
                <Button className={cl('see')} to='/product' type='outline'>
                    SEE ALL
                </Button>
            </div>
        </div>
    )
}

export default List
