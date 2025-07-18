interface Environment {
  apiUrl: string;
  apiVersion: string;
}

const environments: Record<string, Environment> = {
  development: {
    apiUrl: 'http://localhost:5173',
    apiVersion: 'v1'
  },
  production: {
    apiUrl: 'https://api.seudominio.com',
    apiVersion: 'v1'
  },
  test: {
    apiUrl: 'http://localhost:5173',
    apiVersion: 'v1'
  }
};

const currentEnv = import.meta.env.MODE || 'development';
const config = environments[currentEnv];

export const API_BASE_URL = `${config.apiUrl}/api/${config.apiVersion}`;

export default config; 