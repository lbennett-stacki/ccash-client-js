export default {
  clearMocks: true,
  collectCoverage: true,
  coverageDirectory: 'coverage',
  roots: ['src', 'test'],
  moduleNameMapper: {
    "@/(.*)": "<rootDir>/src/$1"
  }
};
