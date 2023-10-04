import {
    AppleOutlined,
    CarryOutOutlined,
    CodepenOutlined,
    DashboardOutlined,
    DeploymentUnitOutlined,
} from '@ant-design/icons'

import Button from '../../../../components/__atom/Button'
import Group from './components/Group'

import classNames from 'classnames/bind'
import styles from './Sidebar.module.scss'
const cl = classNames.bind(styles)

function Sidebar() {
    return (
        <div className={cl('wrapper')}>
            <Button
                size='large'
                className={cl('item')}
                leftIcon={<DashboardOutlined />}
                to='/admin/dashboard'
            >
                Dashboard
            </Button>
            <Group title='management'>
                <Button
                    size='large'
                    className={cl('item')}
                    leftIcon={<AppleOutlined />}
                    to='/admin/brand/list'
                >
                    Brand
                </Button>
                <Button
                    size='large'
                    className={cl('item')}
                    leftIcon={<DeploymentUnitOutlined />}
                    to='/admin/category/list'
                >
                    Categories
                </Button>
                <Button
                    size='large'
                    className={cl('item')}
                    leftIcon={<CodepenOutlined />}
                    to='/admin/product/list'
                >
                    Products
                </Button>
                <Button
                    size='large'
                    className={cl('item')}
                    leftIcon={<CarryOutOutlined />}
                    to='/admin/order'
                >
                    Orders
                </Button>
            </Group>
        </div>
    )
}

export default Sidebar
