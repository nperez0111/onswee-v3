import React, { Component, PropTypes } from 'react';
import getImageIcon from '../../Utils/PlayerIcon.js';

export default class PlayerPiece extends Component {
    static propTypes = {
        player: PropTypes.number.isRequired,
        isActive: PropTypes.bool.isRequired,
        imageSelected: PropTypes.number
    }
    render() {
        const { player, isActive, imageSelected } = this.props
        return (
            <div className={ `piece player${player} ${isActive ? 'active' : ''}` }>
				<img src={ getImageIcon( imageSelected||player ) } alt={`Player ${player}`}/>
			</div>
        )
    }
}
