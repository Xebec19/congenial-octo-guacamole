import { JSONSchemaType } from 'ajv';

interface IListProduct {
    offset: number;
    limit: number;
    searchTerm?: string;
    orderOn?: string;
    orderBy?: string;
}

const schema: JSONSchemaType<IListProduct> = {
    type: 'object',
    properties: {
        offset: { type: 'number' },
        limit: { type: 'number' },
        searchTerm: { type: 'string', nullable: true },
        orderOn: { type: 'string', nullable: true },
        orderBy: { type: 'string', nullable: true },
    },
    required: ['offset', 'limit'],
    additionalProperties: false,
};

export default schema;
