import request from '../../../utils/request'
interface Props {
    username: string
    password: string
}

export const login = async ({ username, password }: Props) => {
    const res = await request.post('/auth/signin', { username, password })
    return res
}
