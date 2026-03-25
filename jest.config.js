module.exports = {
  preset: "jest-expo",
  setupFilesAfterEnv: ["<rootDir>/test/jest.setup.ts"],
  testMatch: ["**/test/**/*.test.ts", "**/test/**/*.test.tsx"],
};
