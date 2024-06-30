import { defineConfig } from 'vitest/config'
import tsconfigPaths from 'vitest-tsconfig-paths'



export default defineConfig({
    plugins: [tsconfigPaths()],
    test: {
        environmentMatchGlobs: [
            ['./src/http/controllers/**', './src/vitest-environments/prisma_test_environment.ts']
        ]
    }
})
