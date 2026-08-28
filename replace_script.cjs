const fs = require('fs');

const files = [
    'src/features/chapter-management/components/chapter/Chapters.tsx',
    'src/features/chapter-management/components/chapter/SortableChapterItem.tsx',
    'src/features/chapter-management/components/lesson/AddLessonForm.tsx',
    'src/features/chapter-management/components/lesson/LessonItem.tsx',
];

for (const file of files) {
    let content = fs.readFileSync(file, 'utf8');
    
    // In LessonItem.tsx we have to avoid collision with StyledComponent
    if (file.includes('LessonItem.tsx')) {
        content = content.replace(/import \{ LessonItem \} from "\.\.\/\.\.\/\.\.\/course-settings\/components\/StyledComponents";/, 'import { LessonItem as StyledLessonItem } from "../../../course-settings/components/StyledComponents";');
        content = content.replace(/<LessonItem>/g, '<StyledLessonItem>');
        content = content.replace(/<\/LessonItem>/g, '</StyledLessonItem>');
    }

    content = content.replace(/Unit/g, 'Lesson');
    content = content.replace(/unit/g, 'lesson');

    fs.writeFileSync(file, content);
}
