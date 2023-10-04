import District from "./district"

export default interface Ward{
    id: number
    name: string
    district: District
}