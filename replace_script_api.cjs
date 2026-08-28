const fs = require('fs');
const file = 'src/features/chapter-management/api/chapterApi.ts';
let content = fs.readFileSync(file, 'utf8');

content = content.replace(/Unit/g, 'Lesson');
content = content.replace(/unit/g, 'lesson');

fs.writeFileSync(file, content);
