fetch(`https://food-api-9njd.onrender.com/api/menuitems`)
.then(response=>response.json())
.then(data=>{
    console.log(data)
})
.catch(err=>{
    console.log(err)
})
