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
      alias: {
        "@shared/*": ["./src/shared/*"],
        "@entities/*": ["./src/entities/*"],
        "@repositories/*": ["./src/repositories/*"],
        "@useCases/*": ["./src/useCases/*"]
        // insert the same tsconfig.json paths
      }
    }]
  ]
}
