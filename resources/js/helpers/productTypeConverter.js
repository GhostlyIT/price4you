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

export const productTypeConvertForDb = type => {
    let result = ''

    switch (type) {
        case 'Защита растений':
            result = 'product'
            break
        case 'Удобрения':
            result = 'fertiliser'
            break
        case 'Семена':
            result = 'seed'
            break
        default:
            result = false
            break
    }

    return result
}
