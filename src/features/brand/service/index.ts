import request from '../../../utils/request'

interface Props {
    name: string
}

export const createBrand = async ({ name }: Partial<Props>) => {
    const res = await request.post(`/brand/create`, { name })
    return res
}

export const getBrandByID = async (id: string | number) => {
    const res = await request.get(`/brand/${id}`)
    if (res.status === 200) return res.data
    return null
}
export const getBrands = async () => {
    const res = await request.get(`/brand/`)
    if (res.status === 200) return res.data
    return []
}

export const updateBrand = async ({
    id,
    name,
}: {
    id: number
    name: string
}) => {
    const res = await request.put(`/brand/${id}`, { name })
    return res
}

export const deleteBrand = async (id: number) => {
    const res = await request.delete(`/brand/${id}`)
    return res
}
