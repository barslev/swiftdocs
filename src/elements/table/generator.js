import { insertContent, updateElementState } from '~/redux/actions/contents'

export default class Generator {

    constructor(id, columns, header, footer) {
        this.id = id
        this.header = header
        this.footer = footer
        this.columns = columns
        this.sections = []

        this._populateSection = this._populateSection.bind(this)
    }

    static fire(id, columns, header, footer) {
        const instance = new Generator(id, columns, header, footer)
        instance.generate()
    }

    generate() {
        this._createHeaderSection()
        this._createBodySection()
        this._createFooterSection()
        this._populateSections()
        this._changeTableInitState()
    }

    _changeTableInitState() {
        updateElementState(this.id, {
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
            null,
            this.id
        )
        // Set section type
        updateElementState(sectionId, { tag })
        this.sections.push(sectionId)
    }

    _populateSections() {
        this.sections.forEach(this._populateSection)
    }

    _populateSection(sectionId) {
        const rowId = insertContent('d-table-row', null, sectionId)

        for (let i = 0; i < this.columns; i++) {
            insertContent('d-table-cell', null, rowId)
        }
    }
}