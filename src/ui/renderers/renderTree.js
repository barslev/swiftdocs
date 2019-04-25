import Immutable from 'seamless-immutable'
import {getContentState} from '~/redux/actions/contents'

const comparable = value => {
    if (_.isArray(value)) {
        return value.length
    } else if (_.isNumber(value) || _.isString(value)) {
        return parseFloat(value)
    } else if (_.isObject(value)) {
        return Object.keys(value)
    }
    return value
}

// Second parameter is data, but it's not used.
export default (contents, data, inRenderMode) => {
    // Create immutable data
    data = Immutable(data);
    contents = Immutable(contents);

   const applyLogic = (contents) => {
        if (!inRenderMode) {
            return contents
        }
        contents = applyLoops(contents)
        contents = applyConditions(contents)
        // Add more side effects...
        return contents
    }

    const applyLoops = contents => {
        return contents.reduce((carry, content) => {
            let loop = _.get(getContentState(content.id), 'logic.loop')
            if (!loop) {
                carry.push(content)
                return carry
            }
            return carry.concat(loopContent(content, loop))
        }, [])
    }

    const loopContent = (content, loop) => {
        const indexAs = loop.index_as ? loop.index_as : '$index'
        const array = _.get(content.context, loop.in, content.context)

        return _.map(array, (arrayItem, $index) => content.merge({
            context: {
                ...content.context,
                [indexAs]: $index,
                [loop.as]: arrayItem
            }
        }))
    }

    const applyConditions = (contents) => {
        return contents.filter((content) => {
            let state = getContentState(content.id)
            let conditions = _.get(state, 'logic.conditions', [])
            if (!conditions || !conditions.length) {
                return true
            }
            return conditions.every(condition => {
                return evaluateCondition(content, condition)
            })
        })
    }

    const evaluateCondition = (content, condition) => {
        try {
            const value = _.get(
                content.context,
                condition.address
            )
            switch (condition.comparator) {
                case 'exists':
                    return typeof value !== 'undefined' && value !== null
                case 'truthy':
                    return value
                case 'falsy':
                    return !value
                case 'equals':
                    return value == condition.value
                case 'not_equal':
                    return value != condition.value                        
                case 'greater_than':
                    return comparable(value) > parseFloat(condition.value)
                case 'less_than':
                    return comparable(value) < parseFloat(condition.value)
                default:
                    throw new Error('Unknown comparator: ' + condition.comparator)
            }
        } catch(e) {
            console.error(e)
            return false
        }
    }    
    
    const contentsWithChildren = (containerId = null, context = {}) => {
        let children = contents.filter(c => c.container_id === containerId)
        if (inRenderMode) {
            children = applyLogic(children.map(child => child.merge({context})))
        }
        return children.map(child => child.merge({
            children: contentsWithChildren(child.id, child.context)
        }))
    }
   
    // Null puts top level items at the top of the tree
    return contentsWithChildren(null, data)
}