import React, {Component} from 'react';
import Async from 'react-select/lib/Async';

const typeKitRequest = (input) => {

    return new Request(`https://cctypekit.adobe.io/v1/families?browse_mode=default&languages=en&purpose=web&q=${input}`, {
        headers: new Headers({
            'Accept': 'application/json',
            'X-Api-Key': '81f651a705da4f5f8ea93de2f3501169'
        })
    })

}

class TypeKitFonts extends Component {

    constructor(props) {
        super(props);
        this.state = {
            value: [...props.fonts]
        }
    }

    onChange = (value) => {
        console.log(value);
        this.setState({
            value: value
        });
        this.props.handleChange(value);
    }

    getFontFamilies = (input) => {

        if (!input) {
            return Promise.resolve([]);
        }

        let request = typeKitRequest(input);

        return fetch(request)
            .then(results => {
                return results.json()
            })
            .then(dataJSON => {
                return dataJSON;
            })
            .catch((error) => {
                console.log(error);
            })
    }

    render() {
        return (
            <div className="project--font-families__select">
                <Async
                    isMulti
                    cacheOptions
                    defaultOptions
                    value={this.state.value}
                    onChange={this.onChange}
                    getOptionValue={(option) => option.name}
                    getOptionLabel={(option) => option.name}
                    loadOptions={this.getFontFamilies}
                    backspaceRemovesValue
                />
            </div>
        )
    }
}

export default TypeKitFonts;