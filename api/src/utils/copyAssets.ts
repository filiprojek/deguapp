import * as shell from 'shelljs'

// Copy all the view templates
shell.cp('-R', 'src/views', 'dist/')
shell.cp('-R', 'src/public', 'dist/')
shell.cp('-R', 'src/models', 'dist/')
shell.cp('-u', 'src/.env', 'dist/')
