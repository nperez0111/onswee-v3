import React, { PropTypes } from 'react';
import getImageIcon from '../../Utils/PlayerIcon.js';

const PlayerPiece = ({ player, isActive, imageSelected }) =>
    (<div className={ `piece player${player} ${isActive ? 'active' : ''}` }>
                <img src={ getImageIcon( imageSelected||player ) } alt={`Player ${player}`}/>
            </div>)


PlayerPiece.propTypes = {
    player: PropTypes.number.isRequired,
    isActive: PropTypes.bool.isRequired,
    imageSelected: PropTypes.number
}

export default PlayerPiece
