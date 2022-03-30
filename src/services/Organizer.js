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

const getImportanceInformation = (information, relations) => {
    // Initialize total weight value
    information.forEach(node => node["totalWeight"] = 0)
    
    // Calculate every node total weight
    relations.forEach(relation => {
        information.forEach(node => {
            if (relation.dept_id_from === node.id || relation.dept_id_to === node.id) {
                node.totalWeight += relation.weight
            }
        })
    })
    
    // Sort information
    information.sort((nodeA, nodeB) => {
        return nodeB.totalWeight - nodeA.totalWeight ||
            nodeB.peopleCount - nodeA.peopleCount
    })

    return information
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

const sort = (importanceInformation, requiredStructure) => {
    // Validate whether current structure is compatible
    // with the node information
    let unsortedNodes = []
    for (let i = 0; i < importanceInformation.length; i++) {
        unsortedNodes.push(importanceInformation[i])
    }
    if (validate(importanceInformation, requiredStructure)) {
        let sortedNodes = []

        requiredStructure.forEach(level => level["currentPeopleCount"] = 0)
        requiredStructure = sortRequiredStructure(requiredStructure)

        let currentLevel = requiredStructure[0]
        let inc = 1
        while (unsortedNodes[0]) {
            let currentNode = unsortedNodes[0]
            if (isNodeCompatibleToLevel(currentNode, currentLevel)) {
                currentLevel.currentPeopleCount += currentNode.peopleCount
                currentNode.level = currentLevel.level
                sortedNodes.push(currentNode)
                unsortedNodes.shift()
                currentLevel = requiredStructure[0]
                inc = 1
            } else {
                currentLevel = requiredStructure[inc]
                inc++
            }
        }
        return sortedNodes
    }
    return []
}

const Organizer = {
    getImportanceInformation,
    sort
}

export default Organizer