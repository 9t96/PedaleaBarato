export default function formatPrice(amount: number, currency: string = 'ARS', locale: string = 'es-AR') {
    return new Intl.NumberFormat(locale, {
        style: 'currency',
        currency: currency,
        // Opcional: ajustar decimales si lo necesitas
        // minimumFractionDigits: 2,
        maximumFractionDigits: 0,
    }).format(amount);
}