import request from '../../../utils/request'

export const getInvoices = async () => {
    const res = await request.get('/invoice/getAllInvoices')
    if (res.status === 200) return res.data
    return []
}

export const deleteInvoice = async (invoiceId: number) => {
    const res = await request.delete(`/invoice/deleteInvoice/${invoiceId}`)
    return res
}
