import _ from 'lodash'

const getImportanceTable = (nodes, relations) => {
    const importanceTable = []

    const nodeIds = _.map(nodes, 'id')
    const filteredRelations = _.cloneDeep(relations)
        .filter((relation => {
            return _.includes(nodeIds, relation.dept_id_from) ||
            _.includes(nodeIds, relation.dept_id_to)
        }))

    // Initialize total weight value
    nodes.forEach(node => importanceTable.push({...node, totalWeight: 0}))
    
    // Calculate every node total weight
    filteredRelations.forEach(relation => {
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

    // If importance table every element totalWeight is 0 then it
    // sorts by the people count of every node and apply importance by it

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
    let sortedNodes = []
    let unsortedNodes = []
    for (let i = 0; i < importanceInformation.length; i++) {
        // Put the forced nodes in sortedNodes array
        if (importanceInformation[i].forced === true) {
            sortedNodes.push(importanceInformation[i])
        } else {
            nodes.push({ ...importanceInformation[i], level: 0})
        }
    }

    let requiredStructure = []
    p_requiredStructure.forEach(level => requiredStructure.push({ ...level, currentPeopleCount: 0}))
    requiredStructure.forEach(level => {
        const sortedNodesLevels = _.map(sortedNodes, 'level')
        if (sortedNodesLevels.includes(level.level)) {
            level.currentPeopleCount = _.sumBy(sortedNodes.filter(node => node.level === level.level), 'peopleCount')
        }
    })
    requiredStructure = sortRequiredStructure(requiredStructure)
    let currentLevel = requiredStructure[0]
    let inc = 1
    let incLimit = requiredStructure.length
    while (nodes[0]) {
        let currentNode = nodes[0]
        if (inc > incLimit) {
            unsortedNodes.push(currentNode)
            nodes.shift()
            currentLevel = requiredStructure[0]
            inc = 1
            continue
        } 
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
        }
    }
    return { sortedNodes, unsortedNodes}
}

const getColor = (level) => {
    const colors = ['#EEEEEE', '#FF8000', '#FFFF00',
                    '#80FF00', '#00FF00', '#00FFFF',
                    '#0080FF', '#0000FF', '#7F00FF',
                    '#FF00FF', '#FF007F', '#808080',
                    '#FFCCCC', '#FFE5CC', '#FFFFCC',
                    '#E5FFCC', '#CCFFCC', '#CCFFE5',
                    '#CCFFFF', '#CCE5FF', '#CCCCFF',
                    '#E5CCFF', '#FFCCFF', '#FFCCE5'
                ]

    return colors[level] || '#AAAAAA'
}

const Organizer = {
    getImportanceTable,
    sort,
    getColor
}

export default Organizer