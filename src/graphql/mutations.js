/* eslint-disable */
// this is an auto generated file. This will be overwritten

export const createAccountSettings = /* GraphQL */ `
  mutation CreateAccountSettings(
    $input: CreateAccountSettingsInput!
    $condition: ModelAccountSettingsConditionInput
  ) {
    createAccountSettings(input: $input, condition: $condition) {
      id
      igUsername
      walletAddress
      defaultMaticPrice
      igUniqueID
      userID
      createdAt
      updatedAt
    }
  }
`;
export const updateAccountSettings = /* GraphQL */ `
  mutation UpdateAccountSettings(
    $input: UpdateAccountSettingsInput!
    $condition: ModelAccountSettingsConditionInput
  ) {
    updateAccountSettings(input: $input, condition: $condition) {
      id
      igUsername
      walletAddress
      defaultMaticPrice
      igUniqueID
      userID
      createdAt
      updatedAt
    }
  }
`;
export const deleteAccountSettings = /* GraphQL */ `
  mutation DeleteAccountSettings(
    $input: DeleteAccountSettingsInput!
    $condition: ModelAccountSettingsConditionInput
  ) {
    deleteAccountSettings(input: $input, condition: $condition) {
      id
      igUsername
      walletAddress
      defaultMaticPrice
      igUniqueID
      userID
      createdAt
      updatedAt
    }
  }
`;
export const createMintedPosts = /* GraphQL */ `
  mutation CreateMintedPosts(
    $input: CreateMintedPostsInput!
    $condition: ModelMintedPostsConditionInput
  ) {
    createMintedPosts(input: $input, condition: $condition) {
      id
      igUsername
      igUniqueID
      MaticPrice
      available
      instagramURL
      imageURL
      userID
      walletAddress
      createdAt
      updatedAt
    }
  }
`;
export const updateMintedPosts = /* GraphQL */ `
  mutation UpdateMintedPosts(
    $input: UpdateMintedPostsInput!
    $condition: ModelMintedPostsConditionInput
  ) {
    updateMintedPosts(input: $input, condition: $condition) {
      id
      igUsername
      igUniqueID
      MaticPrice
      available
      instagramURL
      imageURL
      userID
      walletAddress
      createdAt
      updatedAt
    }
  }
`;
export const deleteMintedPosts = /* GraphQL */ `
  mutation DeleteMintedPosts(
    $input: DeleteMintedPostsInput!
    $condition: ModelMintedPostsConditionInput
  ) {
    deleteMintedPosts(input: $input, condition: $condition) {
      id
      igUsername
      igUniqueID
      MaticPrice
      available
      instagramURL
      imageURL
      userID
      walletAddress
      createdAt
      updatedAt
    }
  }
`;
