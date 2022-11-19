import { JSONSchemaType } from 'ajv';

interface IUpdateOrder {
    orderId: string;
    status: string;
}

const schema: JSONSchemaType<IUpdateOrder> = {
    type: 'object',
    properties: {
        orderId: { type: 'string' },
        status: { type: 'string' },
    },
    required: ['orderId', 'status'],
    additionalProperties: false,
};

export default schema;
