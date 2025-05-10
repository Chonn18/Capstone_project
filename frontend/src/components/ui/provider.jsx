'use client'

import { ChakraProvider, defaultSystem, createSystem, defineConfig, defaultConfig  } from '@chakra-ui/react'
import { ColorModeProvider } from './color-mode'

const customConfig = defineConfig({
  globalCss : {
    "html, body" : {
      backgroundColor : "white",
      color : "black",
      colorScheme : "light"
    } 
  },
  theme: {
    tokens: {
      colors: {},
    },
  },
})

const system = createSystem(defaultConfig, customConfig)
// console.log(defaultSystem)

export function Provider(props) {
  return (
    <ChakraProvider value={system}>
      <ColorModeProvider>{props.children}</ColorModeProvider>
    </ChakraProvider>
  )
}
