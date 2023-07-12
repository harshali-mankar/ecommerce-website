export const formatPrice = (number:any) => {
    
    return  new Intl.NumberFormat('en-US',{
        style:'currency',
        currency:'USD'
    }).format(number/100)


}

export const getUniqueValues = () => {}
