export interface TokenManager {
  generate: (params: { userId: string }) => string;
}
