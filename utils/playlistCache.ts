// utils/playlistCache.ts
import fs from 'fs/promises';
import path from 'path';
import crypto from 'crypto';

const CACHE_FILE = path.join(process.cwd(), '.playlist-cache');

export async function shouldUpdatePlaylists(playlistJson: any): Promise<boolean> {
  const jsonHash = crypto.createHash('md5').update(JSON.stringify(playlistJson)).digest('hex');
  
  try {
    const cachedHash = await fs.readFile(CACHE_FILE, 'utf-8');
    if (cachedHash === jsonHash) {
      return false;
    }
  } catch (error) {
    // If file doesn't exist or can't be read, we should update
  }

  // Update the cache file with the new hash
  await fs.writeFile(CACHE_FILE, jsonHash);
  return true;
}