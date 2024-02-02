export type AuthResponse = {
  user_id: string;
  iat: number;
  exp: number;
  token: string;
};

export type LoginDetails = {
  email: string;
  password: string;
};

export type User = {
  user_id: string;
  username: string;
  email: string;
  password_hash: string;
  password_salt: string;
};
