import { defineConfig, presetAttributify, presetIcons, presetUno } from 'unocss'

export default defineConfig({
  shortcuts: [
    {
      'bg-base': 'bg-white dark:bg-[#121212]',
      'bg-overlay': 'bg-[#eee]:50 dark:bg-[#222]:50',
      'border-base': 'border-gray-400:10',
    },
  ],
  rules: [],
  theme: {
    colors: {
      primary: 'var(--color-primary)',
    },
  },
  presets: [
    presetUno(),
    presetAttributify(),
    presetIcons({
      scale: 1.2,
    }),
  ],
})
