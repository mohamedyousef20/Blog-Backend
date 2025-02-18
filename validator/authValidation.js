import Joi from 'joi'

const registerValidation = (obj)=>{
  const  schema=  Joi.object({
        named:Joi.string().trim().required().min(3).max(14),
        email:Joi.string().trim().email().required(),
        password: Joi.string().trim().min(8).required(),
    })
    return schema.validate(obj)
}

export default registerValidation;