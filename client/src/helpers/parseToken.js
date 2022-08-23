
export const parseToken = (token) => {

    const  parseJwt = (token) => {
        var base64Url = token.split('.')[1];
        var base64 = base64Url.replace('-', '+').replace('_', '/');
        return JSON.parse(window.atob(base64));
    };
    localStorage.setItem("id",parseJwt(token).user.id );
    localStorage.setItem("name",`${parseJwt(token).user.name}` );


}
