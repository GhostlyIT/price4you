export const productTypeConverter = type => {
    let convertedType = ''

    switch (type) {
        case 'product':
            convertedType = 'Защита растений'
            break
        case 'fertiliser':
            convertedType = 'Удобрения'
            break
        case 'seed':
            convertedType = 'Семена'
            break
        default:
            convertedType = false
            break
    }

    return convertedType
}
