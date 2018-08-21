import React, {Component} from 'react';
import Select from 'react-select';

const googleFontsDataRequest = () => {

    return new Request(`https://www.googleapis.com/webfonts/v1/webfonts?key=AIzaSyBdCYl47NDZXkRlT-EN-Suu2JmP_pi6hdQ`, {
        headers: new Headers({
            'Accept': 'application/json',
        })
    })

}

class GoogleFonts extends Component {

    constructor(props) {
        super(props);
        this.state = {
            value: [...props.fonts],
            googleFonts: []
        }
    }

    componentWillMount() {
        this.getFontFamilies();
    }

    onChange = (value) => {
        console.log(value);
        this.setState({
            value: value
        })
        this.props.handleChange(value);
    }

    getFontFamilies = () => {

        let request = googleFontsDataRequest();

        return fetch(request)
            .then(results => {
                return results.json()
            })
            .then(dataJSON => {
                this.setState({ googleFonts: dataJSON.items });
            })
            .catch((error) => {
                console.log(error);
            })

    }

    render() {
        return (
            <div className="project--font-families__select">
                <Select
                    isMulti
                    value={this.state.value}
                    onChange={this.onChange}
                    getOptionValue={(option) => option.family}
                    getOptionLabel={(option) => option.family}
                    options={this.state.googleFonts}
                    backspaceRemovesValue
                />
            </div>
        )
    }
}

export default GoogleFonts;