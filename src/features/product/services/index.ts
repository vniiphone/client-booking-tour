import request from '../../../utils/request'
interface Props {
    id: number
    name: string
    tomTat: string
    giaThamKhao: number
    soLuongVe: number
    // modelYear: number
    loaiTour_id: number
    imageUrls: Array<string>
    imagePublicIds: Array<string>
    // tourCode: string
    ngayVe: string
    ngayGioXuatPhat: string
    noiKhoiHanh: string
    visible: true
}

export const createProduct = async (data: Partial<Props>) => {
    const res = await request.post(`/tour/create`, { ...data })
    // console.log("log create tourr: " + res.data.tour)
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
        
        request.get('/loai-tour/'),
    ]).then((values) => {
        return values.map(x=>(x.data))
    })
    return res
}
