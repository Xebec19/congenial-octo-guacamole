import { JSONSchemaType } from 'ajv';

interface IUpdateProduct {
    productId: string;
    productName: string;
    productPrice: number;
}

const schema: JSONSchemaType<IUpdateProduct> = {
    type: 'object',
    properties: {
        productId: { type: 'string' },
        productName: { type: 'string' },
        productPrice: { type: 'number' },
    },
    required: ['productId', 'productName', 'productPrice'],
    additionalProperties: false,
};

export default schema;
