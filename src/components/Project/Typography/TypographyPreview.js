import React, {Component} from 'react';
import {getNextAvailableId} from '../../../lib/utility'
import {SortableContainer, arrayMove} from 'react-sortable-hoc';
import TypographyDef from './TypographyDef';
import update from 'immutability-helper';

const SortableList = SortableContainer(({defs, colors, families, handleDefChange, handleDeleteDef, handleCopy}) => {
    return (
        <div className="row project-typography">
            {defs.map((def, index) =>
                <TypographyDef
                    key={def.id}
                    index={index}
                    def={def}
                    colors={colors}
                    families={families}
                    handleDefChange={handleDefChange}
                    handleDeleteDef={handleDeleteDef}
                    handleCopy={handleCopy}
                />
            )}
        </div>
    )
})

class TypographyPreview extends Component {

    constructor(props) {
        super(props)
        this.state = {
            defs: this.props.fonts
        }
    }

    componentWillReceiveProps(nextProps, nextContext) {
        if (nextProps.fonts !== this.state.defs) {
            this.setState({ defs: nextProps.fonts })
        }
    }

    onSortEnd = ({oldIndex, newIndex}) => {
        let {defs} = this.state
        let updatedDefs = arrayMove(defs, oldIndex, newIndex)
        this.setState({defs: updatedDefs})
        this.props.handleTypographyChange(updatedDefs)
    }

    handleCopy = (def) => {

        let previousDefs = this.state.defs
        let defIndex = previousDefs.findIndex(obj => obj.id === def.id)
        let maxId = Math.max.apply(Math, previousDefs.map(function(obj) { return obj.id; }))
        let defCopy = Object.assign({}, def, {id: parseInt(maxId) + 1}, {name: def.name + ' - Copy'})
        let updatedDefs = []

        // If previousDefs contains only one item or we're copying the last item.
        if (previousDefs.length === 1 || previousDefs.length === (defIndex + 1)) {
            updatedDefs = update(previousDefs, {$push: [defCopy]})
        } else {
            defIndex++
            updatedDefs = [
                ...previousDefs.slice(0, defIndex),
                defCopy,
                ...previousDefs.slice(defIndex)
            ]
        }

        this.props.handleTypographyChange(updatedDefs)
    }

    handleDefChange = (def) => {

        let {id} = def;
        let previousDefs = this.state.defs || [];

        let updatedDefs = [];

        if (previousDefs.length && id) {

            let objIndex = previousDefs.findIndex(obj => obj.id === id)
            let previousDef = previousDefs.find(previousDef => previousDef.id == id)

            // If definition exists currently.
            if ( typeof previousDef !== 'undefined' ) {
                previousDef = Object.assign({}, previousDef, {...def})
            } else {
                objIndex = 0;
                previousDef = {...def}
            }

            updatedDefs = update(previousDefs, {
                [objIndex]: {$set: previousDef}
            })

        } else {

            updatedDefs = update(previousDefs, {
               $push: def
            })

        }

        this.props.handleTypographyChange(updatedDefs)
    }

    handleNewDef = () => {
        let previousDefs = this.state.defs || [];
        let nextID = 1;

        if ( previousDefs.length > 0 ) {
            nextID = getNextAvailableId(previousDefs)
        }

        let newDefProps = Object.assign({}, {...TypographyDef.defaultProps}, {id: nextID}, {newDef: true})

        let updatedDefs = [
            ...previousDefs,
            {...newDefProps}
        ]

        this.setState({
            defs: updatedDefs
        })
    }

    handleDeleteDef = (def) => {
        let {id} = def
        let previousDefs = this.state.defs;
        let objIndex = previousDefs.findIndex(obj => obj.id === id)
        let updatedDefs = update(previousDefs, { $splice: [[objIndex, 1]] })
        this.setState({
            defs: updatedDefs
        })
        this.props.handleTypographyChange(updatedDefs)
    }

    renderEdit() {

        let {defs} = this.state;
        let {families, colors} = this.props;

        console.log('RENDERING EDIT -----')
        console.log(defs)

        return (
            <React.Fragment>
                {defs &&
                    <SortableList
                        axis="xy"
                        distance={50}
                        useDragHandle={true}
                        defs={defs}
                        colors={colors}
                        families={families}
                        onSortEnd={this.onSortEnd}
                        handleDefChange={this.handleDefChange}
                        handleDeleteDef={this.handleDeleteDef}
                        handleCopy={this.handleCopy}
                    />
                }
                <div className="d-flex add-typography">
                    <button className="btn btn-secondary" onClick={() => this.handleNewDef()}>Add Definition</button>
                </div>
            </React.Fragment>
        )
    }

    render() {
        let {editing} = this.props;
        return (
            <section className="definitions definition--typography">
                <h2 className="definition-title">Typography</h2>
                {this.renderEdit()}
            </section>
        )
    }
}

export default TypographyPreview;