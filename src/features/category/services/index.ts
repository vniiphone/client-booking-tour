import request from '../../../utils/request'

export const getCategories = async () => {
    const res = await request.get('/loai-tour')
    if (res.status === 200) return res.data
    return []
}

export const getCategoryById = async (id?: string) => {
    const res = await request.get(`/loai-tour/${id}`)
    if (res.status === 200) return res.data
    return null
}

export const createCategory = async ({ name, noiDung }: { name: string, noiDung: string }) => {

    const res = await request.post('/loai-tour/create', { name, noiDung })
    return res
}

export const updateCategory = async ({
    id,
    name,
    noiDung
}: {
    id: number
        name: string
    noiDung: string
}) => {
    const res = await request.put(`/loai-tour/${id}`, { name, noiDung })
    return res
}

export const deleteCategory = async (id: number) => {
    const res = await request.delete(`/loai-tour/${id}`)
    return res
}
