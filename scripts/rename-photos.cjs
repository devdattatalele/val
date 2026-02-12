#!/usr/bin/env node
/**
 * Renames all images in public/img/photos/ to photo1.ext, photo2.ext, ... photo30.ext
 * Preserves original file extension. Run: npm run photos
 */

const fs = require('fs');
const path = require('path');

const PHOTOS_DIR = path.join(__dirname, '../public/img/photos');
const IMAGE_EXT = ['.jpg', '.jpeg', '.png', '.webp', '.gif'];

function getImageFiles() {
  const files = fs.readdirSync(PHOTOS_DIR);
  return files
    .filter(f => IMAGE_EXT.includes(path.extname(f).toLowerCase()))
    .sort((a, b) => {
      const getNum = (name) => {
        const m = name.match(/(\d+)/);
        return m ? parseInt(m[1], 10) : 9999;
      };
      const numA = getNum(a), numB = getNum(b);
      if (numA !== numB) return numA - numB;
      return a.localeCompare(b, undefined, { numeric: true });
    });
}

function main() {
  if (!fs.existsSync(PHOTOS_DIR)) {
    console.error('Photos directory not found:', PHOTOS_DIR);
    process.exit(1);
  }

  const files = getImageFiles();
  if (files.length === 0) {
    console.log('No image files found in', PHOTOS_DIR);
    process.exit(0);
  }

  console.log(`Found ${files.length} images. Renaming to photo1...photo${files.length}...`);

  const tempRenames = [];
  files.forEach((f, i) => {
    const ext = path.extname(f);
    const tempName = `__temp_${i}${ext}`;
    const oldPath = path.join(PHOTOS_DIR, f);
    const tempPath = path.join(PHOTOS_DIR, tempName);
    fs.renameSync(oldPath, tempPath);
    tempRenames.push({ temp: tempName, ext });
  });

  const captions = [
    'Us being us', 'Cute moment', 'Stupid selfie 😂', 'Best day ever', 'You look so pretty',
    'My fav ❤️', 'Remember this?', 'Banku photobomb 🐱', 'That look tho', 'Together ❤️',
    'Silly faces', 'Our place', 'Golden hour', 'Love this one', 'My Rapunzel',
    'Date night', 'You + Me', 'Candid queen', 'Missing you', 'My whole world',
    'That smile 😍', 'Favourite human', 'Banku says hi 🐱', 'Always & forever',
    "Can't stop staring", 'My happy place', 'Twinning!', 'This was fun', 'Precious moments',
    'Us forever ❤️',
  ];

  const finalList = [];
  tempRenames.forEach(({ temp, ext }, i) => {
    const newName = `photo${i + 1}${ext}`;
    const tempPath = path.join(PHOTOS_DIR, temp);
    const newPath = path.join(PHOTOS_DIR, newName);
    fs.renameSync(tempPath, newPath);
    finalList.push({ src: `/img/photos/${newName}`, caption: captions[i] || 'Memory ' + (i + 1) });
    console.log(`  ${temp} -> ${newName}`);
  });

  const outputPath = path.join(__dirname, '../src/photo-list.json');
  fs.writeFileSync(outputPath, JSON.stringify(finalList, null, 2));
  console.log('\nUpdated', outputPath);
}

main();
