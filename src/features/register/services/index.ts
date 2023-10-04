import request from '../../../utils/request'

interface Props {
    username: string
    email: string
    password: string
    confirmPassword: string
}

export const createAccount = async (values: Props) => {
    const { confirmPassword, ...otherData } = values
    const res = await request.post('/auth/signup', { ...otherData })
    return res
}
