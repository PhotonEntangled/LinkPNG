// This script creates WebP placeholders from SVG files
// In a real scenario, you would use a proper image conversion tool

const fs = require('fs');
const path = require('path');

const products = [
  'bilum-highlands',
  'highlands-coffee', 
  'taro-chips',
  'png-flag-shirt',
  'sepik-carving',
  'coconut-soap',
  'kundu-drum',
  'bird-paradise-art',
  'sago-flour',
  'independence-shirt',
  'clay-pot',
  'madang-honey',
  'oro-tapa',
  'png-spices',
  'traditional-laptop-bag',
  'eastern-coffee'
];

products.forEach(product => {
  const svgPath = path.join(__dirname, `${product}.svg`);
  const webpPath = path.join(__dirname, `${product}.webp`);
  
  if (fs.existsSync(svgPath)) {
    // For now, just copy SVG content to .webp file
    // In production, you'd use a proper conversion tool
    fs.copyFileSync(svgPath, webpPath);
    console.log(`Created placeholder: ${product}.webp`);
  }
});
