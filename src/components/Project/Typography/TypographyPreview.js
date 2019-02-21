import React, {Component} from 'react';
import {getNextAvailableId} from '../../../lib/utility'
import {SortableContainer, arrayMove} from 'react-sortable-hoc';
import TypographyDef from './TypographyDef';
import update from 'immutability-helper';

const SortableList = SortableContainer(({defs, colors, families, handleDefChange, handleDeleteDef}) => {
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
        const {defs} = this.state
        const updatedDefs = arrayMove(defs, oldIndex, newIndex)
        this.setState({defs: updatedDefs})
        this.props.handleTypographyChange(updatedDefs)
    }

    handleDefChange = (def) => {

        console.log('TypographyPreview::handleDefChange')

        const {id} = def;
        const previousDefs = this.state.defs || [];

        let updatedDefs = [];

        if (previousDefs.length && id) {

            let objIndex = previousDefs.findIndex(obj => obj.id === id)
            let previousDef = previousDefs.find(previousDef => previousDef.id == id)

            console.log(previousDef)

            // If definition exists currently.
            if ( typeof previousDef !== 'undefined' ) {
                console.log( 'previous.length match!')
                previousDef = Object.assign({}, previousDef, {...def})
            } else {
                console.log( 'else match!')
                objIndex = 0;
                previousDef = {...def}
            }

            console.log(previousDef)

            console.log('EXISTING --------')
            updatedDefs = update(previousDefs, {
                [objIndex]: {$set: previousDef}
            })
            console.log(updatedDefs)

        } else {
            console.log('NO EXISTING --------')
            updatedDefs = update(previousDefs, {
               $push: def
            })
            console.log(updatedDefs)

        }

        this.props.handleTypographyChange(updatedDefs)
    }

    handleNewDef = () => {
        // May need to update to object from array
        const previousDefs = this.state.defs || [];
        let nextID = 1;
        if ( previousDefs.length > 0 ) {
            nextID = getNextAvailableId(previousDefs)
        }
        console.log('nextID')
        console.log(nextID)

        const newDefProps = Object.assign({}, {...TypographyDef.defaultProps}, {id: nextID}, {newDef: true})

        const updatedDefs = [
            ...previousDefs,
            {...newDefProps}
        ]
        console.log(updatedDefs)

        this.setState({
            defs: updatedDefs
        })
    }

    handleDeleteDef = (def) => {
        const {id} = def
        const previousDefs = this.state.defs;
        const objIndex = previousDefs.findIndex(obj => obj.id === id)
        const updatedDefs = update(previousDefs, { $splice: [[objIndex, 1]] })
        this.setState({
            defs: updatedDefs
        })
        this.props.handleTypographyChange(updatedDefs)
    }

    renderEdit() {

        const {defs} = this.state;
        const {families, colors} = this.props;

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