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

import {
    CreateLichTrinhTour,
    ListLichTrinhTour,
    EditLichTrinhTour
} from '../features/lichTrinhTour/Index'

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
        path: '/admin/tour/create',
        component: CreateProduct,
        layout: AdminLayout,
        role: 'admin',
    },
    {
        path: '/admin/tour/list',
        component: ListProduct,
        layout: AdminLayout,
        role: 'admin',
    },
    {
        path: '/admin/tour/:id',
        component: EditProduct,
        layout: AdminLayout,
        role: 'admin',
    },
    ///admin/lichtrinhtour/list
    {
        path: '/admin/lichtrinhtour/create/:id',
        component: CreateLichTrinhTour,
        layout: AdminLayout,
        role: 'admin',
    },
    {
        path: '/admin/lichtrinhtour/list/:id',
        component: ListLichTrinhTour,
        layout: AdminLayout,
        role: 'admin',
    },
    {
        path: '/admin/lichtrinhtour/:id/:lichtrinh_id',
        component: EditLichTrinhTour,
        layout: AdminLayout,
        role: 'admin',
      }
      
]

export default routes
