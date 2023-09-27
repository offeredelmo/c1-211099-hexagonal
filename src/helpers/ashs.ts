import bcrypt from 'bcrypt'; 


export const encrypt = async (textPlain:string) => {
    const hash = await bcrypt.hash(textPlain, 10)
    return hash
}

export const compare = async (passworPlain:string, passwordHas:string) => {
    return await bcrypt.compare(passworPlain, passwordHas)
}