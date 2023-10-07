import { useAppSelector } from '../../hooks'

import List from './components/List'

import classNames from 'classnames/bind'
import styles from './Home.module.scss'
const cl = classNames.bind(styles)


function LichTrinhTour() {
  const user = useAppSelector((state) => state.auth)
  return (
    <div className={cl('wrapper')}>
      <List />
    </div>
  )
}

export default LichTrinhTour