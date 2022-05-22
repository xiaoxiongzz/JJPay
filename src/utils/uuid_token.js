import {
    v4 as uuidv4
} from 'uuid';
//要生成一个随机字符串，且每次执行不能发生变化，游客 身份持久储存
export const getUUID = () => {
    //先从本地获取一下看有没有uuid
    let uuid_token = localStorage.getItem('UUIDTOKEN')
    //如果没有的话
    if (!uuid_token) {
        //生成一个游客身份
        uuid_token = uuidv4()
        //本地存储一次
        localStorage.setItem('UUIDTOKEN', uuid_token)
    }
    return uuid_token
}