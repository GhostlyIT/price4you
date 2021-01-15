const months = [
    'января',
    'февраля',
    'марта',
    'апреля',
    'мая',
    'июня',
    'июля',
    'августа',
    'сентября',
    'октября',
    'ноября',
    'декабря'
]

export const getMonthOnRus = (monthNumber) => {
    return months[monthNumber]
}

export const getFullDate = rawDate => {
    const transformedDate = new Date(rawDate)
    let month = '0' + (parseInt(transformedDate.getMonth()) + parseInt(1))
    if (month > 9) {
        month = month.slice(0)
    }
    return transformedDate.getDate() +
        '.' + month +
        '.' + transformedDate.getFullYear() +
        ' ' + transformedDate.getHours() +
        ':' + transformedDate.getMinutes()
}
