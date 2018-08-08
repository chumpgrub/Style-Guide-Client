import React, {Component} from 'react';
import Select from 'react-select';

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
        // this.props.onFamilyChange(value);
    }

    getFontFamilies = (input) => {

        if (!input) {
            return Promise.resolve({ options: [] });
        }

        let request = typeKitRequest(input);

        return fetch(request)
            .then(results => {
                return results.json()
            })
            .then(dataJSON => {
                return { options: dataJSON };
            })
            .catch((error) => {
                console.log(error);
            })
    }

    render() {
        return (
            <div className="project--font-families__select">
                <Select.AsyncCreatable
                    multi={true}
                    value={this.state.value}
                    onChange={this.onChange}
                    valueKey='name'
                    labelKey='name'
                    loadOptions={this.getFontFamilies}
                    backspaceRemoves={true}
                />
            </div>
        )
    }
}

export default TypeKitFonts;