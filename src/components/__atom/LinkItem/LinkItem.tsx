import { Link } from 'react-router-dom'
import style from './LinkItem.module.scss'

interface Props {
    to: string
    title: string
}

function LinkItem({ to, title }: Props) {
    return <Link className={style.link} to={to}>{title}</Link>
}

export default LinkItem
