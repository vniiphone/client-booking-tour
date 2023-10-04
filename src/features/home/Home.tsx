import { useAppSelector } from '../../hooks'

import Carousel from './components/Carousel'
import List from './components/List'

import classNames from 'classnames/bind'
import styles from './Home.module.scss'
const cl = classNames.bind(styles)

function Home() {
    const user = useAppSelector((state) => state.auth)
    return (
        <div className={cl('wrapper')}>
            <Carousel />
            <List />
        </div>
    )
}

export default Home
