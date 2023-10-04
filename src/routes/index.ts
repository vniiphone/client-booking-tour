import Login from '../features/login'
import Register from '../features/register'
import Home from '../features/home'
import Detail from '../features/detail'
import Cart from '../features/cart'
import Checkout from '../features/checkout'
import Invoice from '../features/user-order'
import PaymentSuccess from '../features/payment-success'
import PaymentFailed from '../features/payment-failed'
import List from '../features/list'
import Order from '../features/order'
import Dashboard from '../features/dashboard'
import { CreateBrand, ListBrand, EditBrand } from '../features/brand'
import {
    CreateCategory,
    ListCategory,
    EditCategory,
} from '../features/category'
import { CreateProduct, ListProduct, EditProduct } from '../features/product'
import Profile from '../features/profile'

import HomeLayout from '../layouts/HomeLayout'
import AdminLayout from '../layouts/AdminLayout'

const routes = [
    { path: '/', component: Home, layout: HomeLayout },
    { path: '/tour', component: List },
    { path: '/cart', component: Cart, role: 'user' },
    { path: '/checkout', component: Checkout, role: 'user' },
    { path: '/invoice', component: Invoice, role: 'user' },
    { path: '/payment-success', component: PaymentSuccess, role: 'user' },
    { path: '/payment-failed', component: PaymentFailed, role: 'user' },
    { path: '/login', component: Login },
    { path: '/register', component: Register },
    { path: '/profile', component: Profile, role: 'user' },
    {
        path: '/admin/dashboard',
        component: Dashboard,
        layout: AdminLayout,
        role: 'admin',
    },
    {
        path: '/admin/order',
        component: Order,
        layout: AdminLayout,
        role: 'admin',
    },
    { path: '/tour/:id', component: Detail },
    
    // Lịch trình tour -> Được lấy từ list Tour -> 
    // Lấy id tour -> mở ra list LichTrinhTour
    {
        path: '/admin/lichTrinhTour/create',
        component: CreateBrand,
        layout: AdminLayout,
        role: 'admin',
    },
    {
        path: '/admin/lichTrinhTour/list',
        component: ListBrand,
        layout: AdminLayout,
        role: 'admin',
    },
    {
        path: '/admin/lichTrinhTour/:id',
        component: EditBrand,
        layout: AdminLayout,
        role: 'admin',
    },



    // Lịch trình tour

    
// Loại Tour
    {
        path: '/admin/loaiTour/create',
        component: CreateCategory,
        layout: AdminLayout,
        role: 'admin',
    },
    {
        path: '/admin/loaiTour/list',
        component: ListCategory,
        layout: AdminLayout,
        role: 'admin',
    },
    {
        path: '/admin/loaiTour/:id',
        component: EditCategory,
        layout: AdminLayout,
        role: 'admin',
    },
// Loại Tour

    {
        path: '/admin/product/create',
        component: CreateProduct,
        layout: AdminLayout,
        role: 'admin',
    },
    {
        path: '/admin/product/list',
        component: ListProduct,
        layout: AdminLayout,
        role: 'admin',
    },
    {
        path: '/admin/product/:id',
        component: EditProduct,
        layout: AdminLayout,
        role: 'admin',
    },
]

export default routes
