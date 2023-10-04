import request from '../../../utils/request'

export const getCities = async () => {
    const res = await request.get('/address/city')
    if (res.status === 200) return res.data
    return []
}

export const getDistricts = async (city_id?: number) => {
    const res = await request.get(`/address/district`)
    if (res.status === 200) return res.data
    return []
}

export const getWards = async (district_id?: number) => {
    const res = await request.get(`/address/ward`)
    if (res.status === 200) return res.data
    return []
}

export const deleteAddress = async (id: number) => {
    const res = await request.delete(`/address/${id}`)
    return res
}

export const updateAddress = async (value: {
    id: number
    user_id: number
    ward_id: number
    address: string
    phone: string
}) => {
    const { id, ...otherData } = value
    const res = await request.put(`/address/${id}`, { ...otherData })
    return res
}

export const updateInfo = async (values: { id: number; email: string }) => {
    const res = await request.put(`/user/${values.id}`, {
        email: values.email,
    })
    return res
}
