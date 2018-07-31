import React, {Component} from 'react';
import Select from 'react-select';

const webSafeFonts = [
    {
        'name': 'Arial',
        'slug': 'arial'
    },
    {
        'name': 'Helvetica',
        'slug': 'helvetica'
    },
    {
        'name': 'Times',
        'slug': 'times'
    },
    {
        'name': 'Courier New',
        'slug': 'courier-new'
    },
    {
        'name': 'Courier',
        'slug': 'courier'
    },
    {
        'name': 'Verdana',
        'slug': 'verdana'
    },
    {
        'name': 'Georgia',
        'slug': 'georgia'
    },
    {
        'name': 'Palatino',
        'slug': 'palatino'
    },
    {
        'name': 'Garamond',
        'slug': 'garamond'
    },
    {
        'name': 'Bookman',
        'slug': 'bookman'
    },
    {
        'name': 'Trebuchet MS',
        'slug': 'trebuchet-ms'
    },
    {
        'name': 'Impact',
        'slug': 'impact'
    }
]

class WebSafeFonts extends Component {

    constructor(props) {
        super(props);
        this.state = {
            value: [...props.fonts]
        }
        console.log(webSafeFonts);
    }

    onChange = (value) => {
        console.log(value);
        this.setState({
            value: value
        })
        this.props.onFamilyChange(value, 'websafe');
    }

    render() {
        return (
            <div className="project--font-families__select">
                <Select multi={true}
                        value={this.state.value}
                        valueKey='slug'
                        labelKey='name'
                        onChange={this.onChange}
                        options={webSafeFonts}
                        backspaceRemoves={true}
                />
            </div>
        )
    }
}

export default WebSafeFonts;