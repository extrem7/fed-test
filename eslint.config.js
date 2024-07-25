import antfu from '@antfu/eslint-config'
import eslintPluginReadableTailwind from 'eslint-plugin-readable-tailwind'
import tailwind from 'eslint-plugin-tailwindcss'

export default antfu({}, [
  ...tailwind.configs['flat/recommended'],
  {
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
      'tailwindcss/classnames-order': 'off',
    },
    settings: {
      tailwindcss: { callees: ['classnames', 'clsx', 'ctl', 'cva', 'cn'] },
    },
  },
])
