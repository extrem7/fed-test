import antfu from '@antfu/eslint-config'
import eslintPluginReadableTailwind from 'eslint-plugin-readable-tailwind'

export default antfu({
  vue: true,
}, {
  plugins: {
    'readable-tailwind': eslintPluginReadableTailwind,
  },
  rules: {
    // enable all recommended rules to warn
    ...eslintPluginReadableTailwind.configs.warning.rules,
    // enable all recommended rules to error
    ...eslintPluginReadableTailwind.configs.error.rules,

    // or configure rules individually
    'readable-tailwind/multiline': ['warn', { printWidth: 80 }],
  },
})
