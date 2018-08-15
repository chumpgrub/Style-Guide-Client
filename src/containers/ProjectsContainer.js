import React, {Component} from 'react';
import _ from 'lodash';
import {connect} from 'react-redux';
import {bindActionCreators} from 'redux';
import {Link} from 'react-router-dom';
import {FontAwesomeIcon} from '@fortawesome/react-fontawesome';

import {getProjects} from '../actions';

import Layout from '../hoc/Layout';

const ColorsPreview = (colors) => {
    console.log(colors);
    // console.log(colors.colors);
    // console.log(JSON.parse(colors.colors));

    return(
        <div className="project-colors">
        {
            Object.keys(colors).map(color => {
                let styles = {
                    'backgroundColor': colors[color].value
                }
                return (
                    <div className="project__color-preview" key={color} style={{...styles}}></div>
                )
            })
        }
        </div>
    )
}

class ProjectsContainer extends Component {

    constructor(props) {
        super(props);
        this.renderProjects = this.renderProjects.bind(this);
        this.handleProjectExport = this.handleProjectExport.bind(this);
        this.state = {
            response: ''
        };
    }

    componentWillMount() {
        this.props.getProjects();
    }

    handleProjectExport = (id) => {
        console.log(id);
    }

    formatFontFamilies = (source, fonts) => {
        let fontData = fonts.map(font => {
            return font.name
        })
        return (
            <li>{source} Fonts: {fontData.join(', ')}</li>
        )
    }

    renderProjects(projects) {
        return projects.map(project => {

            const colors = ! _.isEmpty(JSON.parse(project.colors_defs)) ? JSON.parse(project.colors_defs) : null;
            const typekitfonts = ! _.isEmpty(JSON.parse(project.typekit_fonts)) ? JSON.parse(project.typekit_fonts) : null;
            const googlefonts = ! _.isEmpty(JSON.parse(project.google_fonts)) ? JSON.parse(project.google_fonts) : null;
            const webfonts = ! _.isEmpty(JSON.parse(project.web_fonts)) ? JSON.parse(project.web_fonts) : null;

            return (
                <div key={project.id} className="project">
                    <div className="project__definitions">
                        <h3><Link to={'/project/'+project.id}>{project.name}<FontAwesomeIcon icon={['fas', 'chevron-right']}/></Link></h3>
                        {colors ? <ColorsPreview {...colors}/>: ''}
                        <div className="project-fonts">
                            <ul>
                                {typekitfonts ? this.formatFontFamilies('TypeKit', typekitfonts) : ''}
                                {googlefonts ? this.formatFontFamilies('Google', googlefonts) : ''}
                                {webfonts ?  this.formatFontFamilies('Web', webfonts) : ''}
                            </ul>
                        </div>
                    </div>
                    <div className="project__actions">
                        <Link className="edit" title="edit" to={'/project/'+project.id+'/edit'}><FontAwesomeIcon icon={['fas', 'pencil-alt']}/></Link>
                        <span className="export" title="export" onClick={() => this.handleProjectExport(project.id)}><FontAwesomeIcon icon={['fas', 'file-code']}/></span>
                        {/*<Link className="export" title="export" to={'/project/'+project.id+'/export'}><FontAwesomeIcon icon={['fas', 'file-code']}/></Link>*/}
                    </div>
                </div>
            )
        })
    }

    render() {
        console.log(this.props.data);
        let {projects} = this.props.data;
        return(
            <Layout>
                <input className="project-search" placeholder="Search projects..." />
                <div className="project-list">
                    {projects ? this.renderProjects(projects) : <p>empty</p>}
                </div>
            </Layout>
        )
    }
}

const mapStateToProps = (state) => {
    return {
        data: state.projects
    }
}

const mapDispatchToProps = (dispatch) => {
    return bindActionCreators({
        getProjects
    }, dispatch)
}

export default connect(mapStateToProps, mapDispatchToProps)(ProjectsContainer);
