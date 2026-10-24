import { spawn } from 'child_process';
import path from 'path';
import { fileURLToPath } from 'url';

const __dirname = path.dirname(fileURLToPath(import.meta.url));
const rootDir = path.resolve(__dirname, '..');
const clientDir = path.resolve(rootDir, 'client');
const serverDir = path.resolve(rootDir, 'server');

console.log('🚀 Starting UPSHIFT AI (Client + Server)...');

const isWindows = process.platform === 'win32';
const npmCmd = isWindows ? 'npm.cmd' : 'npm';

// 1. Start Server in server/ directory
const serverProc = spawn(npmCmd, ['run', 'dev'], {
  cwd: serverDir,
  stdio: 'inherit',
  shell: true,
});

// 2. Start Client in client/ directory with host binding
const clientProc = spawn(npmCmd, ['run', 'dev', '--', '--host'], {
  cwd: clientDir,
  stdio: 'inherit',
  shell: true,
});

const cleanup = () => {
  console.log('\n🛑 Shutting down UPSHIFT AI processes...');
  try {
    serverProc.kill();
    clientProc.kill();
  } catch {
    // ignore
  }
  process.exit();
};

process.on('SIGINT', cleanup);
process.on('SIGTERM', cleanup);
