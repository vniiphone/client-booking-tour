export default function formatCurrency(number: number) {
    return new Intl.NumberFormat('de-DE', {
        style: 'currency',
        currency: 'VND',
    }).format(number)
}
