export function mergeClassNames(...parts) {
    let classNames = new Set();
    parts.forEach((classNameList) => {
        if (classNameList === undefined) return;
        classNameList.split(' ').forEach((name) => classNames.add(name));
    });
    return Array.from(classNames).join(' ');
}