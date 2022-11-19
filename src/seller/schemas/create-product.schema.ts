import { JSONSchemaType } from 'ajv';

interface ICreateProduct {
    productName: string;
    productPrice: number;
}

const schema: JSONSchemaType<ICreateProduct> = {
    type: 'object',
    properties: {
        productName: { type: 'string' },
        productPrice: { type: 'number' },
    },
    required: ['productName', 'productPrice'],
    additionalProperties: false,
};

export default schema;
