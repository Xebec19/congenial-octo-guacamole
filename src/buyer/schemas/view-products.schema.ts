import { JSONSchemaType } from 'ajv';

interface IViewProduct {
    offset: number;
    limit: number;
    sellerId: string;
}

const schema: JSONSchemaType<IViewProduct> = {
    type: 'object',
    properties: {
        offset: { type: 'number' },
        limit: { type: 'number' },
        sellerId: { type: 'string' },
    },
    required: ['offset', 'limit', 'sellerId'],
    additionalProperties: false,
};

export default schema;
