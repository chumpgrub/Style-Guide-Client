import React, {Component, Fragment} from 'react';
import _ from 'lodash';
import {connect} from 'react-redux';
import {bindActionCreators} from 'redux';
import {Link} from 'react-router-dom';
import {FontAwesomeIcon} from '@fortawesome/react-fontawesome';
import {
    getProjects,
    deleteProject
} from '../actions';
import ProjectLayout from '../hoc/ProjectLayout';

const { REACT_APP_STYLE_SERVER } = process.env;

const ColorsPreview = (colors) => {

    return(
        <div className="project__colors">
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

class DownloadForm extends Component {

    componentDidMount() {
        this.refs.projectExportForm.submit();
    }

    render() {
        return (
            <form ref="projectExportForm"
                  method="get"
                  action={`${REACT_APP_STYLE_SERVER}/projects/`+this.props.id+`/export`}
            >
                <input type="text"/>
            </form>
        )
    }
}

class ProjectsContainer extends Component {

    constructor(props) {
        super(props);
        this.renderProjects = this.renderProjects.bind(this);
        this.handleProjectExport = this.handleProjectExport.bind(this);
        this.state = {
            response: '',
            projects: null,
            download: false,
            searchValue: '',
            searching: false
        };
    }

    componentWillMount() {
        this.props.getProjects();
        this.setState({projects: this.props.data});
    }

    handleProjectExport = (id) => {
        this.setState({download: id});
    }

    handleProjectSearch = (e) => {
        let {projects} = this.props.data;
        let query = e.target.value;
        if (query.length > 0) {
            this.setState({searchValue: query});
            this.setState({searching: true});
            this.setState({projects: projects.filter(project => {
                return project.name.toLowerCase().includes(query.toLowerCase())
            })});
        } else {
            this.setState({searching: false});
            this.setState({searchValue: ''});
            this.setState({projects: projects})
        }
    }

    handleClearSearch = () => {
        this.setState({searching: false});
        this.setState({searchValue: ''});
        this.setState({projects: this.props.data.projects})
    }

    handleProjectDelete = (id) => {
        let result = window.confirm('Are you sure you want to delete this?');
        if ( result ) {
            this.props.deleteProject(id);
        }
    }

    formatFontFamilies = (source, fonts) => {
        let fontData = fonts.map(font => {
            return font.name
        })
        return (
            <li><span className="font-source">{source} Fonts</span> {fontData.join(', ')}</li>
        )
    }

    renderProjects(projects) {

        return projects.map(project => {

            const colors = ! _.isEmpty(JSON.parse(project.colors_defs)) ? JSON.parse(project.colors_defs) : null;
            const typekitfonts = ! _.isEmpty(JSON.parse(project.typekit_fonts)) ? JSON.parse(project.typekit_fonts) : null;
            const googlefonts = ! _.isEmpty(JSON.parse(project.google_fonts)) ? JSON.parse(project.google_fonts) : null;
            const webfonts = ! _.isEmpty(JSON.parse(project.web_fonts)) ? JSON.parse(project.web_fonts) : null;

            return (
                <section key={project.id} className="d-flex project">
                    <div className="mr-auto project__definitions">
                        <h3><Link to={`/project/`+project.id+`/edit`}>{project.name}<FontAwesomeIcon icon={['fas', 'chevron-right']}/></Link></h3>
                        {colors ? <ColorsPreview {...colors}/>: ''}
                        <div className="project__fonts">
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
                        <span className="delete" title="delete" onClick={() => this.handleProjectDelete(project.id)}><FontAwesomeIcon icon={['fas', 'trash']}/></span>
                    </div>
                    { this.state.download && this.state.download === project.id ?
                        <DownloadForm id={project.id} />
                        :
                        null
                    }
                </section>
            )
        })
    }

    render() {
        let searchingClass = this.state.searching ? ' projects-search--searching' : '';
        // If searching, use state projects to search against.
        let projects = this.state.searching ? this.state.projects : this.props.data.projects;
        const shouldDisplaySearchClear = this.state.searching;

        return(
            <ProjectLayout className={'projects-view'}>
                <div className={`projects-search` + searchingClass}>
                    <input className="projects-search__input"
                           placeholder="Search projects..."
                           value={this.state.searchValue}
                           onChange={this.handleProjectSearch}
                    />
                    {shouldDisplaySearchClear && (
                        <span className="projects-search__close"
                              onClick={this.handleClearSearch}
                        ><FontAwesomeIcon className="project-search__close" icon={['fas', 'plus']}/></span>
                    )}
                </div>
                {projects ? this.renderProjects(projects) : <p>empty</p>}
            </ProjectLayout>
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
        getProjects,
        deleteProject
    }, dispatch)
}

export default connect(mapStateToProps, mapDispatchToProps)(ProjectsContainer);
