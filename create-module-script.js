import fs from 'fs/promises';
import path from 'path';
import readline from 'readline';

const rl = readline.createInterface({
  input: process.stdin,
  output: process.stdout
});

// Promisify readline question
const question = (query) => new Promise(resolve => rl.question(query, resolve));

async function findModulesDirectory(startPath) {
  // Check current directory
  let currentPath = startPath;

  while (currentPath !== path.parse(currentPath).root) {
    const potentialModulesPath = path.join(currentPath, 'src', 'modules');
    
    try {
      // Check if the directory exists
      await fs.access(potentialModulesPath);
      return potentialModulesPath;
    } catch {
      // Move up one directory
      currentPath = path.dirname(currentPath);
    }
  }

  // If no modules directory found
  return null;
}

async function createProjectStructure() {
  try {
    // Find the modules directory
    const modulesPath = await findModulesDirectory(process.cwd());

    if (!modulesPath) {
      console.error('Error: Could not find a src/modules directory in the current project structure.');
      rl.close();
      return;
    }

    // Prompt for project folder name
    const moduleName = await question('Enter the name of the module you want to create: ');

    // Validate folder name
    if (!moduleName || moduleName.trim() === '') {
      throw new Error('Folder name cannot be empty.');
    }

    // Subfolders to create
    const subfolders = [
      'repository',
      'queries',
      'mutations', 
      'features',
      'hooks',
      'models',
      'lib'
    ];

    // Create main project folder
    const projectPath = path.join(modulesPath, moduleName);
    
    // Check if project folder already exists
    try {
      await fs.access(projectPath);
      throw new Error(`A module named "${moduleName}" already exists in the modules directory.`);
    } catch (err) {
      // This catch block is expected if the folder doesn't exist
      if (err.code !== 'ENOENT') throw err;
    }

    // Create main project folder
    await fs.mkdir(projectPath);

    // Create subfolders
    for (const subfolder of subfolders) {
      const subfolderPath = path.join(projectPath, subfolder);
      await fs.mkdir(subfolderPath);
      console.log(`Created module: ${subfolder}`);
    }

    console.log(`\n✅ Module folder created at: ${projectPath}`);
    console.log('Subfolders created:');
    subfolders.forEach(subfolder => console.log(`- ${subfolder}`));
  } catch (error) {
    console.error('Error creating module structure:', error.message);
  } finally {
    rl.close();
  }
}

// Run the script
createProjectStructure();