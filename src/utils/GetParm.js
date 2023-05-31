export default{
    getParmOfUrl(url) {
        let getqyinfo = url.split('?')[1]
        let getqys = getqyinfo.split('&')
        let obj = {}  
        for(let i = 0;i < getqys.length;i++ ){
            let item = getqys[i].split('=')
            let key = item[0]
            let value = item[1]
            obj[key] = value 
        }
        return obj;
    }
}