import request from '../../../utils/request'
interface Props {
    id: number
    
}

export const createLichTrinhTour = async (data: Partial<Props>) => {
    const res = await request.post(`/lichtrinh-tour/create-ltts`, { ...data })
    console.log("Data LTT res: " + data)
    return res
}

export const editLichTrinhTour = async (data: Partial<Props>) => {
    console.log("Edit LTT res id: " + data);
    const res = await request.put(`/lichtrinh-tour/update/${data.id}`, {
        ...data
    })
    return res
}

export const deleteLichTrinhTour = async ({ id }: Partial<Props>) => {
    const res = await request.delete(`/lichtrinh-tour/${id}`)
    return res
}


export const getPrerequisites = async () => {
    const res = Promise.all([
        request.get('/tour'),
    ]).then((values) => {
        return values.map(x=>(x.data))
    })
    return res
}
