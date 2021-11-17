interface configType {
  PORT: string | number;
  SECRET: string | Buffer | { key: string | Buffer; passphrase: string };
  JWT_EXPIRATION: string | number;
  SALT_ROUNDS: number;
}

export default configType;
