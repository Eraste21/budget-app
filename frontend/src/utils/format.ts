export const formatDate = (dateStr: string): string => {
    const date = new Date(dateStr)
    return date.toLocaleDateString('fr-FR', {
        day: '2-digit',
        month: '2-digit',
        year: 'numeric'
    })
}

const formatDateTime = (dateStr: string): string => {
    const isoSafe = dateStr.replace(' ', 'T') + 'Z'
    const date = new Date(isoSafe)
    return date.toLocaleDateString('fr-FR', {
        day: '2-digit',
        month: '2-digit',
        year: 'numeric',
        hour: '2-digit',
        minute: '2-digit'
    })
}

export const format = (dateStr: string) => {
    const date = formatDateTime(dateStr)
    const dateOnly = date.split(' ', 1)
    return dateOnly[0].replaceAll('/', '-')
}

export const getYearMonth = (dateStr: string) => {
    const date = new Date(dateStr)
    const year = date.getFullYear()
    const month = String(date.getMonth() + 1).padStart(2, '0')
    return `${year}-${month}`
}