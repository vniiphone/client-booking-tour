import request from '../../../utils/request'

export const getStatistics = async () => {
    const res = await request.get('/admin/dashboard')
    if (res.status === 200) return res.data
    return null
}
