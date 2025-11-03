import React, { useState, useEffect } from 'react'

import copy from '../assets/icons/copy.png'
import vk from '../assets/icons/vk.png'
import telegram from '../assets/icons/telegram.png'
import whatsapp from '../assets/icons/whatsapp.png'
import facebook from '../assets/icons/facebook.png'

export default function PopupShare({ onClose }) {
    return (
        <div className="alert" onClick={onClose}>
            <div className="share-popup">
                <img className="share-icon" src={copy} />
                <img className="share-icon" src={vk} />
                <img className="share-icon" src={telegram} />
                <img className="share-icon" src={whatsapp} />
                <img className="share-icon" src={facebook} />
            </div>
        </div>
    )
};