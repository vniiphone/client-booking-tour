import Header from '../../components/__layout/Header'
import Footer from '../../components/__layout/Footer'

interface Props {
    children: React.ReactNode
}

function DefaultLayout({ children }: Props) {
    return (
        <div>
            <Header></Header>
            {children}
            <Footer></Footer>
        </div>
    )
}

export default DefaultLayout
