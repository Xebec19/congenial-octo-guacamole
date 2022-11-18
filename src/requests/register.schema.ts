import Joi from 'joi';

const schema = {
    registerPost: Joi.object().keys({
        username: Joi.string().regex(/^[a-z\d\-_.\s%(\\)&]+$/i),
        password: Joi.string().min(8).regex(/^[a-z\d\-_.\s%(\\)&]+$/i),
        type: Joi.string().regex(/^[a-z\d\-_.\s%(\\)&]+$/i)
    })
};

export default schema;