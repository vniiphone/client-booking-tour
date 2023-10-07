import request from '../../../utils/request'
interface Props {
    id: number
    
}

export const createLichTrinhTour = async (data: Partial<Props>) => {
    const res = await request.post(`/lichtrinh-tour/create-ltts`, { ...data })
    return res
}

export const editTour = async (data: Partial<Props>) => {
    const res = await request.put(`/tour/${data.id}`, { ...data })
    return res
}

export const deleteProduct = async ({ id }: Partial<Props>) => {
    const res = await request.delete(`/tour/${id}`)
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
