import request from '../utils/request'

interface Props {
    id: string
    page: number
    sortBy: string
    user_id: number
    tour_id: number
    quantity: number
    cart_id: number
}

// Get all products
export const getProducts = async ({ page, sortBy }: Partial<Props>) => {
    const res = await request.get('/tour', {
        params: { page, sortBy: sortBy || 'id' },
    })
    // console.log(res)
    if (res.status === 200) return res.data
    return []
}

// Get product by id
export const getProductById = async ({ id }: Partial<Props>) => {
    const res = await request.get(`/tour/${id}`)
    if (res.status === 200) return res.data
    return {}
}

// Add to cart
export const addToCart = async ({
    user_id,
    tour_id,
    quantity,
}: Partial<Props>) => {
    const res = await request.post(`/cart/create`, {
        user_id,
        tour_id,
        quantity,
    })
    return res
}

// Get user cart
export const getCart = async ({ user_id }: Partial<Props>) => {
    if (!user_id) return []
    const res = await request.get(`/cart/getCart/${user_id}`)
    if (res.status === 200) return res.data
    return []
}

// Delete cart item
export const deleteCartItem = async ({ cart_id }: Partial<Props>) => {
    const res = await request.delete(`/cart/${cart_id}`)
    return res
}

// Search
export const search = async (name: string) => {
    const res = await request.get(`/search/product/${name}`)
    if (res.status === 200) return res.data
    return []
}

export const getAddresses = async (user_id: string | number) => {
    const res = await request.get(`/address/${user_id}`)
    if (res.status === 200) return res.data
    return []
}

export const createAddress = async (value: {
    user_id: number
    ward_id: number
    address: string
    phone: string
}) => {
    const res = await request.post('/address/create', { ...value })
    return res
}


