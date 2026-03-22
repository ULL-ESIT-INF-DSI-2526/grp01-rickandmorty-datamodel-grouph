import { defineConfig } from 'vitest/config';

export default defineConfig({
  test: {
    coverage: {
      exclude: [
        'src/index.ts',                
        'src/db/seeder.ts',             
        'src/types/**',                 
        'src/interfaces/**',            
        'src/classes/crud/isCRUD.ts',   
        'dist/**',                      
        'tests/**'                      
      ]
    }
  }
});