import React, { Component, useCallback } from 'react'
import FileType from '../../constants/fileType'
import { isEqual } from 'lodash'

import * as XLSX from 'xlsx'
import _ from 'lodash'

import './ChooseXLSFile.css'
import { useDispatch } from 'react-redux'
import { setNodes, setNodesValid, setRelations, setRelationsValid, setRequiredStructure, setRequiredStructureValid } from '../../state/actions'
import { ERROR_CODE } from '../../constants/errorCodes'

export default function ChooseXLSFile(props) {
    const dispatch = useDispatch()

    const getFileTypeName = (type) => {
        if (type === FileType.NODES) return "attiecību"
        if (type === FileType.NODE_INFORMATION) return "struktūrvienību"
        if (type === FileType.NODE_STRUCTURE_REQUIREMENTS) return "stāvu"
    }

    const uploadFile = useCallback((fileType) => {
        document.getElementById("chooseXLSFile_" + fileType).click()
    }, [])

    const onChooseFile = useCallback((file, p_fileType) => {
        if (!file) return

        // Check whether the file is XLS or XLSX
        const extension = file.name.split('.')[1]
        if (extension === 'xls' || extension === 'xlsx') {
            if (p_fileType === FileType.NODES) dispatch(setRelationsValid({}))
            if (p_fileType === FileType.NODE_INFORMATION) dispatch(setNodesValid({}))
            if (p_fileType === FileType.NODE_STRUCTURE_REQUIREMENTS) dispatch(setRequiredStructureValid({}))
        } else {
            if (p_fileType === FileType.NODES) {
                dispatch(setRelationsValid({ error: ERROR_CODE.NOT_XLSX }))
                dispatch(setRelations([]))
            }
            if (p_fileType === FileType.NODE_INFORMATION) {
                dispatch(setNodesValid({ error: ERROR_CODE.NOT_XLSX }))
                dispatch(setNodes([]))
            }
            if (p_fileType === FileType.NODE_STRUCTURE_REQUIREMENTS) {
                dispatch(setRequiredStructureValid({ error: ERROR_CODE.NOT_XLSX }))
                dispatch(setRequiredStructure([]))
            }
            return
        }

        const promise = new Promise((resolve, reject) => {
            const fileReader = new FileReader()
            fileReader.readAsArrayBuffer(file)
            
            fileReader.onload = (e) => {
                const bufferArray = e.target.result
                
                const wb = XLSX.read(bufferArray, { type:'buffer' })
                const wsName = wb.SheetNames[0]
                const ws = wb.Sheets[wsName]
                const data = XLSX.utils.sheet_to_json(ws)
                
                resolve(data)
            }
            
            fileReader.onerror = ((err) => {
                reject(err)
            })
        })

        promise.then((data) => {
            // Check whether the headers are compatible
            
            const currentHeaders = Object.keys(data[0])
            
            if (p_fileType === FileType.NODES) {
                const nodeHeaders = ['dept_id_from', 'dept_id_to', 'weight']
                if (isEqual(currentHeaders, nodeHeaders)) {
                    data.map((item, index) => {
                        item.id = index+1
                        item.weight = parseInt(item.weight)
                    })
                    let relations = []
                    data.forEach(relation => {
                        const id_from = relation.dept_id_from
                        const id_to = relation.dept_id_to
                        const existingRelation = _.find(relations, { dept_id_from: id_from, dept_id_to: id_to })
                        if (existingRelation) {
                            const currentWeight = existingRelation.weight
                            const weight = relation.weight
                            existingRelation.weight = Math.max(currentWeight, weight)
                        } else {
                            relations.push(relation)
                        }
                    })
                    dispatch(setRelations(relations))
                } else {
                    dispatch(setRelations([]))
                    dispatch(setRelationsValid({ error: ERROR_CODE.WRONG_TEMPLATE }))
                    return
                }
            }
            if (p_fileType === FileType.NODE_INFORMATION) {
                const nodeInformationHeaders = ['id', 'peopleCount', 'level', 'forced']
                if (isEqual(currentHeaders, nodeInformationHeaders)) {
                    data.map((item) => {
                        if (item.forced === 'y') {
                            item.forced = true
                        } else {
                            item.forced = false
                        }
                        item.peopleCount = parseInt(item.peopleCount)
                        item.level = parseInt(item.level)
                    })
                    dispatch(setNodes(data))
                } else {
                    dispatch(setNodes([]))
                    dispatch(setNodesValid({ error: ERROR_CODE.WRONG_TEMPLATE }))
                    return
                }
            }
            if (p_fileType === FileType.NODE_STRUCTURE_REQUIREMENTS) {
                const requiredStructureHeaders = ['level', 'capacity']
                if (isEqual(currentHeaders, requiredStructureHeaders)) {
                    data.map((item) => {
                        item.peopleCount = 0
                        item.level = parseInt(item.level)
                        item.capacity = parseInt(item.capacity)
                    })
                    dispatch(setRequiredStructure(data))
                } else {
                    dispatch(setRequiredStructure([]))
                    dispatch(setRequiredStructureValid({ error: ERROR_CODE.WRONG_TEMPLATE }))
                    return
                }
            }
        }, [dispatch])
    })

    return (
        <div className={props.className || undefined}>
            <button
                className="choose-file-btn"
                onClick={() => uploadFile(props.fileType)}
            >
                Izvēlēties {getFileTypeName(props.fileType)} failu
            </button>
            <input
                id={"chooseXLSFile_"+props.fileType}
                style={{display: "none"}}
                type="file"
                onChange={(e) => onChooseFile(e.target.files[0], props.fileType)}
            />
        </div>
    )
}