/* eslint-disable */
// this is an auto generated file. This will be overwritten

export const getAccountSettings = /* GraphQL */ `
  query GetAccountSettings($id: ID!) {
    getAccountSettings(id: $id) {
      id
      igUsername
      walletAddress
      defaultETHPrice
      userID
      createdAt
      updatedAt
    }
  }
`;
export const listAccountSettings = /* GraphQL */ `
  query ListAccountSettings(
    $filter: ModelAccountSettingsFilterInput
    $limit: Int
    $nextToken: String
  ) {
    listAccountSettings(filter: $filter, limit: $limit, nextToken: $nextToken) {
      items {
        id
        igUsername
        walletAddress
        defaultETHPrice
        userID
        createdAt
        updatedAt
      }
      nextToken
    }
  }
`;
export const getMintedPosts = /* GraphQL */ `
  query GetMintedPosts($id: ID!) {
    getMintedPosts(id: $id) {
      id
      igUsername
      ETHPrice
      available
      instagramURL
      imageURL
      userID
      createdAt
      updatedAt
    }
  }
`;
export const listMintedPosts = /* GraphQL */ `
  query ListMintedPosts(
    $filter: ModelMintedPostsFilterInput
    $limit: Int
    $nextToken: String
  ) {
    listMintedPosts(filter: $filter, limit: $limit, nextToken: $nextToken) {
      items {
        id
        igUsername
        ETHPrice
        available
        instagramURL
        imageURL
        userID
        createdAt
        updatedAt
      }
      nextToken
    }
  }
`;
