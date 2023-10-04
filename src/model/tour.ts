export default interface Product {
    id: number
    name: string
    tomTat: string
    giaThamKhao: number
    soLuongVe: number
    ngayGioXuatPhat: string
    ngayVe: string
    noiKhoiHanh: string
    visible : boolean
    loaiTour_id: number
    imageUrls: Array<string>
    imagePublicId: string
    loaiTour: {}
    lichTrinhTour: {}
}
