export const normalizePrice = price => {
    price = price.toString()
    return price.replace(/(\d)(?=(\d{3})+(\D|$))/g, '$1 ')
}
