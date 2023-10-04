import { BrowserRouter as Router, Routes, Route } from 'react-router-dom'
import routes from './routes'
import DefaultLayout from './layouts/DefaultLayout'
import './assets/css/grid.css'
import 'antd/dist/antd.css'
import './assets/css/style.css'
import ProtectedRoute from './components/__combined/ProtectedRoute/ProtectedRoute'

function App() {
    return (
        <div className='App'>
            <Router>
                <Routes>
                    {routes.map((r: any, index) => {
                        let Component = r.component
                        let Layout = DefaultLayout
                        if (r.layout) Layout = r.layout
                        let Content = (
                            <ProtectedRoute role={r?.role}>
                                <Layout>
                                    <Component></Component>
                                </Layout>
                            </ProtectedRoute>
                        )
                        return (
                            <Route
                                key={index}
                                path={r.path}
                                element={Content}
                            />
                        )
                    })}
                </Routes>
            </Router>
        </div>
    )
}

export default App
