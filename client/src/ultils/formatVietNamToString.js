export default function formatVietNamToString(value) {
    return value
        ?.toLowerCase()
        ?.normalize('NFD')
        ?.replace(/[\u0300-\u036f]/g, '')
        ?.replace(/[\/]/g, '')
        ?.split(' ')
        ?.join('-');
}
