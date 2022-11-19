import { JSONSchemaType } from 'ajv';

interface IListProduct {
    offset: number;
    limit: number;
}

const schema: JSONSchemaType<IListProduct> = {
    type: 'object',
    properties: {
        offset: { type: 'number' },
        limit: { type: 'number' },
    },
    required: ['offset', 'limit'],
    additionalProperties: false,
};

export default schema;
