const validate = (information, requiredStructure) => {
    // Calculate total capacity of structure
    let totalCapacity = 0
    requiredStructure.forEach(level => {
        totalCapacity += level.capacity
    });

    // Calculate total people count of every node
    let totalPeopleCount = 0
    information.forEach(node => {
        totalPeopleCount += node.peopleCount
    })
    
    if (totalCapacity === 0) return false

    return totalCapacity >= totalPeopleCount
}

const getImportanceTable = (nodes, relations) => {
    const importanceTable = []

    // Initialize total weight value
    nodes.forEach(node => importanceTable.push({...node, totalWeight: 0}))
    
    // Calculate every node total weight
    relations.forEach(relation => {
        importanceTable.forEach(node => {
            if (relation.dept_id_from === node.id || relation.dept_id_to === node.id) {
                node.totalWeight += relation.weight
            }
        })
    })
    
    // Sort importanceTable
    importanceTable.sort((nodeA, nodeB) => {
        return nodeB.totalWeight - nodeA.totalWeight ||
            nodeB.peopleCount - nodeA.peopleCount
    })

    return importanceTable
}

const isNodeCompatibleToLevel = (node, level) => {
    const nodePeopleCount = node.peopleCount
    const levelCapacity = level.capacity
    const levelCurrentPeopleCount = level.currentPeopleCount
    return (nodePeopleCount + levelCurrentPeopleCount) <= levelCapacity
}

const sortRequiredStructure = (structure) => {
    const TOTAL_LEVEL_COUNT = structure.length
    let currentPoint = Math.round(TOTAL_LEVEL_COUNT/2)
    let sortedStructure = []
    let inc = 1
    while (sortedStructure.length !== TOTAL_LEVEL_COUNT) {
        sortedStructure.push(structure[currentPoint-1])
        if (inc % 2 === 1) {
            currentPoint += inc
        } else {
            currentPoint -= inc
        }
        inc++
    }
    return sortedStructure
}

const sort = (importanceInformation, p_requiredStructure) => {
    let nodes = []
    let unsortedNodes = []
    for (let i = 0; i < importanceInformation.length; i++) {
        nodes.push(importanceInformation[i])
    }

    // Validate whether current structure is compatible
    // with the node information
    if (validate(importanceInformation, p_requiredStructure)) {
        let sortedNodes = []
        let requiredStructure = []
        p_requiredStructure.forEach(level => requiredStructure.push({ ...level, currentPeopleCount: 0}))
        requiredStructure = sortRequiredStructure(requiredStructure)

        let currentLevel = requiredStructure[0]
        let inc = 1
        let incLimit = requiredStructure.length
        while (nodes[0]) {
            let currentNode = nodes[0]
            if (isNodeCompatibleToLevel(currentNode, currentLevel)) {
                currentLevel.currentPeopleCount += currentNode.peopleCount
                currentNode.level = currentLevel.level
                sortedNodes.push(currentNode)
                nodes.shift()
                currentLevel = requiredStructure[0]
                inc = 1
            } else {
                currentLevel = requiredStructure[inc]
                inc++
                if (inc > incLimit) {
                    unsortedNodes.push(currentNode)
                    nodes.shift()
                    currentLevel = requiredStructure[0]
                    inc = 1
                }
            }
        }
        return { sortedNodes, unsortedNodes}
    }
    return []
}

const getColor = (level) => {
    const colors = ['#FF0000', '#FF8000', '#FFFF00',
                    '#80FF00', '#00FF00', '#00FFFF',
                    '#0080FF', '#0000FF', '#7F00FF',
                    '#FF00FF', '#FF007F', '#808080']

    return colors[level] || '#FFFFFF'
}

const Organizer = {
    getImportanceTable,
    sort,
    getColor
}

export default Organizer