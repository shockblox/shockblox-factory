export const SBMarketplace = {
  $schema: 'http://json-schema.org/draft-07/schema',
  title: 'SBDappDirectory',
  type: 'object',
  properties: {
    dapp: {
      type: 'array',
      title: 'dapps',
      items: {
        type: 'object',
        title: 'Dapp',
        properties: {
          id: {
            $ref: '#/definitions/CeramicDocId',
          },
          categories: {
            type: 'string',
            title: 'categories',
            maxLength: 500,
          },
          logo: {
            type: 'string',
            title: 'logo',
            maxLength: 500,
          },
          name: {
            type: 'string',
            title: 'name',
            maxLength: 500,
          },
          shortDescription: {
            type: 'string',
            title: 'short description',
            maxLength: 500,
          },
          longDescription: {
            type: 'string',
            title: 'long description',
            maxLength: 5000,
          },
          url: {
            type: 'string',
            title: 'dApp URL',
            maxLength: 500,
          },
          favorites: {
            type: 'integer',
            title: 'favorite count - internal',
          },
          shares: {
            type: 'integer',
            title: 'shares count - internal',
          },
          isClaimed: {
            type: 'boolean',
            title: 'is dapp claimed? - internal',
          },
          media: {
            type: 'boolean',
            title: 'is dapp claimed? - internal',
          },
        },
      },
    },
  },
  required: ['notes'],
  definitions: {
    CeramicDocId: {
      type: 'string',
      pattern: '^ceramic://.+(\\?version=.+)?',
      maxLength: 150,
    },
  },
};
