const FileType = {
    NODES: 0,
    NODE_INFORMATION: 1,
    NODE_STRUCTURE_REQUIREMENTS: 2,
}

export default FileType

export function nameForType(type) {
    switch (type) {
        case FileType.NODES: return "Attiecības"
        case FileType.NODE_INFORMATION: return "Struktūrvienības"
        case FileType.NODE_STRUCTURE_REQUIREMENTS: return "Stāvi"
        default: throw new Error(`Invalid type: ${type}`)
    }
}