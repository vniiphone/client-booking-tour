import request from '../utils/request'

interface Props {
    id: string
    page: number
    sortBy: string
    user_id: number
    tour_id: number
    quantity: number
    booking_id: number
    hanhKhach: Object
    lichtrinh_id: string
}

// Get all Tuors
export const getTours = async ({ page, sortBy }: Partial<Props>) => {
    const res = await request.get('/tour', {
        params: { page, sortBy: sortBy || 'id' },
    })
    // console.log(res)
    if (res.status === 200) return res.data
    return []
}

// Get product by id
export const getTourById = async ({ id }: Partial<Props>) => {
    const url = `/tour/${id}`
    const res = await request.get(url)

    if (res.status === 200) {
        
        // console.log("URL: "+ url + 'res: ' + res.da)
        return res.data
    } 
    return {}
}

export const getLichTrinhTourById = async ({ id }: Partial<Props>)=> {
    // const res = await request.get(`/lichtrinh-tour/lichtrinhTour-chitiet/${id}`)
    const url = `/lichtrinh-tour/lichtrinhTour-chitiet/${id}`
const res = await request.get(url)
    if (res.status === 200) {
        // console.log("URL: "+ url + 'res: ' + res.data)
        return res.data
    } 
    else {
        return []
  
    }
 }
// export const getLichTrinhSingle = async ({ lichtrinh_id }: Partial<Props>) => {
//     console.log("getLichTrinhSingle" + lichtrinh_id);
//     // const res = await request.get(`/lichtrinh-tour/lichtrinhTour-chitiet/${id}`)
//     const url = `/lichtrinh-tour/ltt-chitiet/${lichtrinh_id}`
// const res = await request.get(url)
//     if (res.status === 200) {
//         console.log("URL: "+ url + 'res: ' + res.data)
//         return res.data
//     } 
//     else {
//         return []
  
//     }
// }
export const getLichTrinhSingle = async ({ lichtrinh_id }: Partial<Props>) => {
    console.log("getLichTrinhSingle " + lichtrinh_id);
    const url = `/lichtrinh-tour/ltt-chitiet/${lichtrinh_id}`;
    const res = await request.get(url);

    if (res.status === 200) {
        console.log("URL: " + url + ' res: ' + res.data);
        return res.data;
    } else {
        return [];
    }
}



// Add to cart
export const addToCart = async ({
    user_id,
    tour_id,
    quantity,
    // hanhKhach,
}: Partial<Props>) => {
    const res = await request.post(`/Booking/create`, {
        user_id,
        tour_id,
        quantity,
        // hanhKhach
    })
    return res
}

// Get user cart
export const getCart = async ({ user_id }: Partial<Props>) => {
    if (!user_id) return []
    const res = await request.get(`/Booking/getBooking/${user_id}`)
    if (res.status === 200) return res.data
    return []
}

// Delete cart item
export const deleteCartItem = async ({ booking_id }: Partial<Props>) => {
    const res = await request.delete(`/Booking/${booking_id}`)
    return res
}

// Search
export const search = async (name: string) => {
    const res = await request.get(`/search/tour/${name}`)
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
    console.log("debug createAddress: " + value)
    return res
}




