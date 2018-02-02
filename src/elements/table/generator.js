import { insertContent, insertContentAtIndex, findContent, getContentIndex, updateContentState } from '~/redux/actions/contents'

export default class Generator {

    constructor(id) {
        this.id = id
        this._populateSection = this._populateSection.bind(this)
    }

    static fire(id, columns, header, footer) {
        const instance = new Generator(id)
        instance.generateEntireTable(
            columns, header, footer            
        )
    }

    static addRow(rowId, before = true) {
        const row = findContent(rowId)
        const rowIndex = getContentIndex(rowId)
        const section = findContent(row.container_id)
        const columns = _.filter(store.getState().contents, {container_id: rowId}).length
        const targetIndex = before ? rowIndex - 1 : rowIndex + 1

        const instance = new Generator(section.container_id)
        instance.generateRow(section.id, columns, targetIndex)
    }

    generateEntireTable(columns, header, footer) {
        this.header = header
        this.footer = footer
        this.columns = columns
        this.sections = []        
        
        this._createHeaderSection()
        this._createBodySection()
        this._createFooterSection()
        this._populateSections()
        this._changeTableInitState()
    }

    generateRow(sectionId, columns, index) {
        const rowId = insertContentAtIndex('d-table-row', sectionId, index)

        for (let i = 0; i < columns; i++) {
            insertContent('d-table-cell', rowId)
        }        
    }

    _changeTableInitState() {
        updateContentState(this.id, {
            init: true
        })
    }

    _createHeaderSection() {
        if (!this.header) {
            return
        }
        this._insertSection('thead')
    }

    _createFooterSection() {
        if (!this.footer) {
            return
        }
        this._insertSection('tfoot')
    }

    _createBodySection() {
        this._insertSection('tbody')
    }

    _insertSection(tag) {
        const sectionId = insertContent(
            'd-table-section',
            this.id
        )
        // Set section type
        updateContentState(sectionId, { tag })
        this.sections.push(sectionId)
    }

    _populateSections() {
        this.sections.forEach(this._populateSection)
    }

    _populateSection(sectionId) {
        const rowId = insertContent('d-table-row', sectionId)

        for (let i = 0; i < this.columns; i++) {
            insertContent('d-table-cell', rowId)
        }
    }
}