import { CloseOutlined, SearchOutlined } from '@ant-design/icons'
import { Link } from 'react-router-dom'
import { Empty, Input, Spin } from 'antd'
import Product from '../../../model/tour'

import classNames from 'classnames/bind'
import styles from './Search.module.scss'
const cl = classNames.bind(styles)

interface Props {
    value: string
    onChange: any
    className?: string
    visible: boolean
    loading: boolean
    products: Product[]
    onClose: Function
    onSearch: Function
}

function Search({
    value,
    onChange,
    products,
    loading = false,
    className,
    visible = false,
    onClose,
    onSearch,
}: Props) {
    return (
        <div className={`${className} ${cl('wrapper', { visible: visible })}`}>
            <div className={`grid wide ${cl('inner')}`}>
                <div className={cl('nav')}>
                    <div className={cl('text')}>What are you looking for?</div>
                    <div onClick={() => onClose()} className={cl('icon')}>
                        <CloseOutlined />
                    </div>
                </div>
                <div className={cl('search')}>
                    <Input
                        className={cl('input')}
                        onChange={(e) => onChange(e.target.value)}
                        value={value}
                        size='large'
                        bordered={false}
                        placeholder='Search...'
                    />
                    <div onClick={() => onSearch()} className={cl('icon')}>
                        <SearchOutlined />
                    </div>
                </div>
                <div className={cl('results')}>
                    {loading ? (
                        <Spin className={cl('spin')} />
                    ) : products.length > 0 ? (
                        products.map((x: Product) => (
                            <Link
                                key={x.id}
                                to={`/product/${x.id}`}
                                className={cl('result-item')}
                            >
                                {x.name}
                            </Link>
                        ))
                    ) : (
                        <Empty />
                    )}
                </div>
            </div>
        </div>
    )
}

export default Search
