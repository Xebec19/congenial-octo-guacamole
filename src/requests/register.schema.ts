import { JSONSchemaType } from 'ajv';

interface IRegisterBody {
    username: string;
    password: string;
    type: 'buyer' | 'seller';
}

const schema: JSONSchemaType<IRegisterBody> = {
    type: 'object',
    properties: {
        username: { type: 'string' },
        password: { type: 'string' },
        type: { type: 'string' },
    },
    required: ['username', 'password', 'type'],
    additionalProperties: false,
};

export default schema;
