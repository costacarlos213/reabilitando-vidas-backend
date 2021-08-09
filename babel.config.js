module.exports = {
  presets: [
    [
      '@babel/preset-env',
      {
        targets: {
          node: 'current'
        }
      }
    ],
    '@babel/preset-typescript'
  ],
  plugins: [
    ['module-resolver', {
      root: ["./"],
      alias: {
        "@shared": "./src/shared",
        "@entities": "./src/entities",
        "@repositories": "./src/repositories",
        "@useCases": "./src/useCases",
        "@providers": "./src/providers",
        "@database": "./src/database",
        "@config": "./src/config",
        "@controllers": "./src/controllers"
        // insert the same tsconfig.json paths
      }
    }]
  ],
  ignore: [
    "**/*.spec.ts"
  ]
}
