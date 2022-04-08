export const RELATIONS_TEMPLATE = [
    { dept_id_from: 'd_9', dept_id_to: 'd_2', weight: 6 },
    { dept_id_from: 'd_9', dept_id_to: 'd_23', weight: 4 },
    { dept_id_from: 'd_9', dept_id_to: 'd_3', weight: 7 },
    { dept_id_from: 'd_9', dept_id_to: 'd_33', weight: 6 },
    { dept_id_from: 'd_9', dept_id_to: 'd_5', weight: 4 },
]

export const NODES_TEMPLATE = [
    { id: 'd_9', peopleCount: '30', level: 0, forced: 'n' },
    { id: 'd_2', peopleCount: '15', level: 0, forced: 'n' },
    { id: 'd_23', peopleCount: '10', level: 1, forced: 'y' },
    { id: 'd_3', peopleCount: '5', level: 4, forced: 'y' },
    { id: 'd_33', peopleCount: '20', level: 0, forced: 'n' },
    { id: 'd_5', peopleCount: '35', level: 0, forced: 'n' },
]

export const REQUIRED_STRUCTURE_TEMPLATE = [
    { level: 1, capacity: 50 },
    { level: 2, capacity: 45 },
    { level: 3, capacity: 40 },
]