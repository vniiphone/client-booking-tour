import request from '../../../utils/request'
interface Props {
    id: number
    name: string
    description: string
    price: number
    stock: number
    modelYear: number
    category_id: number
    brand_id: number
    imageUrl: string
    imagePublicId: string
}

export const createProduct = async (data: Partial<Props>) => {
    const res = await request.post(`/product/create`, { ...data })
    return res
}

export const editProduct = async (data: Partial<Props>) => {
    const res = await request.put(`/product/${data.id}`, { ...data })
    return res
}

export const deleteProduct = async ({ id }: Partial<Props>) => {
    const res = await request.delete(`/product/${id}`)
    return res
}

export const getPrerequisites = async () => {
    const res = Promise.all([
        request.get('/brand/'),
        request.get('/category'),
    ]).then((values) => {
        return values.map(x=>(x.data))
    })
    return res
}
