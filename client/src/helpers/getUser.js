
const getUser = async() => {

    const urlUser = 'https://randomuser.me/api/'
    const resp = await fetch(urlUser);
    const { results } = await resp.json()
    return{
        ...results   
    }


}

export {
    getUser
}
