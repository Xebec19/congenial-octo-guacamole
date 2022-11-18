import { JSONSchemaType } from 'ajv';

interface ILoginBody {
    username: string;
    password: string;
}

const schema: JSONSchemaType<ILoginBody> = {
    type: 'object',
    properties: {
        username: { type: 'string' },
        password: { type: 'string' },
    },
    required: ['username', 'password'],
    additionalProperties: false,
};

export default schema;
