const storage = {
  getToken: (): string | null => {
    return JSON.parse(
      window.localStorage.getItem('csrf-token') as string
    ) as string;
  },
  setToken: (token: string): void => {
    window.localStorage.setItem('csrf-token', JSON.stringify(token));
  },
  clearToken: (): void => {
    window.localStorage.removeItem('csrf-token');
  },
};

export default storage;
