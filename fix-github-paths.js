// Script to fix all file paths for GitHub Pages
// Run this in Node.js: node fix-github-paths.js

const fs = require('fs');
const path = require('path');

const htmlFiles = [
    'index.html',
    'login.html',
    'sports-selection.html',
    'court-selection.html',
    'equipment-selection.html',
    'beverages-selection.html',
    'payment-review.html',
    'menu-manager.html',
    'sales-report.html'
];

function fixPaths(content) {
    // Fix CSS links
    content = content.replace(/href="styles\.css"/g, 'href="./styles.css"');
    
    // Fix JavaScript files (but not CDN URLs)
    content = content.replace(/src="(firebase-config|firebase-service|script)\.js"/g, 'src="./$1.js"');
    
    // Fix HTML links (but not external URLs)
    content = content.replace(/href="([^"]+\.html)"/g, (match, p1) => {
        if (p1.startsWith('http') || p1.startsWith('/') || p1.startsWith('./')) return match;
        return `href="./${p1}"`;
    });
    
    // Fix image paths
    content = content.replace(/src="images\//g, 'src="./images/');
    
    // Fix JavaScript redirects
    content = content.replace(/window\.location\.href\s*=\s*['"]([^'"]+\.html)['"]/g, (match, p1) => {
        if (p1.startsWith('http') || p1.startsWith('/') || p1.startsWith('./')) return match;
        return `window.location.href = './${p1}'`;
    });
    
    return content;
}

htmlFiles.forEach(file => {
    if (fs.existsSync(file)) {
        let content = fs.readFileSync(file, 'utf8');
        const original = content;
        content = fixPaths(content);
        
        if (content !== original) {
            fs.writeFileSync(file, content, 'utf8');
            console.log(`✅ Fixed: ${file}`);
        } else {
            console.log(`⏭️  No changes: ${file}`);
        }
    } else {
        console.log(`❌ Not found: ${file}`);
    }
});

console.log('\n✅ All files fixed! Now push to GitHub.');

