export const formatPrice = (number:any) => {
    
    return  new Intl.NumberFormat('en-US',{
        style:'currency',
        currency:'USD'
    }).format(number/100)


}


export const getUniqueValues=(data:string[],type:any) => {
    let unique = data.map((item) => item[type])
    if (type === 'colors') {
      unique = unique.flat()
   }
  //console.log("value in helpers " + unique);
  
    return ['all', ...new Set(unique)]
}
