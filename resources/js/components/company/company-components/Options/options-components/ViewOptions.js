import React from 'react'

const ViewOptions = ({options, selectedOptionId, setOption}) => {
    return options.map(option => {
        return (
            <div key={option.id} className="view-option__item">
                <label>
                    <input
                        onChange={ e => setOption(e.target.value) }
                        type="radio"
                        name="view-option"
                        value={option.id}
                        checked={option.id == selectedOptionId}
                        className="mr-2"
                    />

                    <span>{option.text_for_company}</span>
                </label>
            </div>
        )
    })
}

export default ViewOptions
